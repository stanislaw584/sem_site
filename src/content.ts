import { marked } from "marked";
import type { Lang } from "./i18n";

const modulesRu = import.meta.glob("../content/ru/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const modulesEn = import.meta.glob("../content/en/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const modulesZh = import.meta.glob("../content/zh/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export type ArticleMeta = {
  id: string;
  title: string;
  summary: string;
  category?: string;
  source?: string;
  lastReviewed?: string;
  related?: string[];
};

export type Article = ArticleMeta & {
  slug: string;
  html: string;
  body: string;
};

const categoryOrder = [
  "start",
  "study",
  "exams",
  "contacts",
  "opportunities",
  "rules",
  "about",
  "glossary",
];

function parseFrontmatter(raw: string) {
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: raw };
  }

  const frontmatter = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).trimStart();
  const data: Record<string, unknown> = {};
  const lines = frontmatter.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    const value = rawValue.trim();

    if (value === "") {
      const list: string[] = [];
      while (lines[index + 1]?.trimStart().startsWith("- ")) {
        index += 1;
        list.push(lines[index].trimStart().slice(2).trim());
      }
      data[key] = list;
      continue;
    }

    data[key] = value.replace(/^["']|["']$/g, "");
  }

  return { data, content };
}

function fileToSlug(path: string) {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? path;
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()|:-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wrapSections(html: string) {
  const sections = html.split(/(<h2>.*?<\/h2>)/g);

  if (sections.length < 3) {
    return html;
  }

  let wrapped = sections[0];
  let sectionNumber = 0;

  for (let index = 1; index < sections.length; index += 2) {
    const heading = sections[index];
    const content = sections[index + 1] ?? "";
    const title = heading.replace(/^<h2>|<\/h2>$/g, "");
    const PREVIEW_LIMIT = 150;
    const rawText =
      content
        .replace(/<table[\s\S]*?<\/table>/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    let preview = rawText;
    let truncated = false;
    if (rawText.length > PREVIEW_LIMIT) {
      const wordBoundary = rawText.lastIndexOf(" ", PREVIEW_LIMIT);
      preview = rawText.slice(0, wordBoundary > 0 ? wordBoundary : PREVIEW_LIMIT);
      truncated = true;
    }
    const open = sectionNumber === 0 ? " open" : "";

    wrapped += `<details class="article-section"${open}><summary>${title}</summary><div class="article-section-body">${preview ? `<p class="section-context">${preview}${truncated ? "..." : ""}</p>` : ""}${content}</div></details>`;
    sectionNumber += 1;
  }

  return wrapped;
}

function buildArticles(mods: Record<string, unknown>): Article[] {
  return Object.entries(mods)
    .map(([path, raw]) => {
      const parsed = parseFrontmatter(String(raw));
      const slug = fileToSlug(path);
      const meta = parsed.data as ArticleMeta;

      return {
        ...meta,
        id: meta.id || slug,
        title: meta.title || slug,
        summary: meta.summary || "",
        slug,
        html: wrapSections(marked.parse(parsed.content, { async: false }) as string),
        body: stripMarkdown(parsed.content),
      };
    })
    .sort((a, b) => {
      if (a.slug === "index") return -1;
      if (b.slug === "index") return 1;

      const byCategory =
        categoryOrder.indexOf(a.category || "") -
        categoryOrder.indexOf(b.category || "");

      if (byCategory !== 0) return byCategory;
      return a.title.localeCompare(b.title);
    });
}

const articlesByLang: Record<Lang, Article[]> = {
  ru: buildArticles(modulesRu),
  en: buildArticles(modulesEn),
  zh: buildArticles(modulesZh),
};

export function getArticles(lang: Lang): Article[] {
  const list = articlesByLang[lang];
  return list.length > 0 ? list : articlesByLang.ru;
}

export function getPublicArticles(lang: Lang): Article[] {
  return getArticles(lang).filter((a) => a.slug !== "index");
}

export function getArticle(slug: string, lang: Lang): Article | undefined {
  const list = articlesByLang[lang];
  const found = list.find((a) => a.slug === slug);
  if (found) return found;
  return articlesByLang.ru.find((a) => a.slug === slug);
}

export function searchLocal(query: string, lang: Lang) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return [];

  return getPublicArticles(lang)
    .map((article) => {
      const haystack = `${article.title} ${article.summary} ${article.body}`.toLocaleLowerCase();
      const titleHit = article.title.toLocaleLowerCase().includes(normalized) ? 3 : 0;
      const summaryHit = article.summary.toLocaleLowerCase().includes(normalized) ? 2 : 0;
      const bodyHit = haystack.includes(normalized) ? 1 : 0;
      return { article, score: titleHit + summaryHit + bodyHit };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.article);
}

// Legacy exports for backward compatibility during migration
export const articles = articlesByLang.ru;
export const publicArticles = articles.filter((a) => a.slug !== "index");
