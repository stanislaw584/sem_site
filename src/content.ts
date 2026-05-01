import { marked } from "marked";

const modules = import.meta.glob("../content/ru/*.md", {
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

export const articles: Article[] = Object.entries(modules)
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
      html: marked.parse(parsed.content, { async: false }) as string,
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
    return a.title.localeCompare(b.title, "ru");
  });

export const publicArticles = articles.filter((article) => article.slug !== "index");

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function searchLocal(query: string) {
  const normalized = query.trim().toLocaleLowerCase("ru");
  if (!normalized) return [];

  return publicArticles
    .map((article) => {
      const haystack = `${article.title} ${article.summary} ${article.body}`.toLocaleLowerCase("ru");
      const titleHit = article.title.toLocaleLowerCase("ru").includes(normalized) ? 3 : 0;
      const summaryHit = article.summary.toLocaleLowerCase("ru").includes(normalized) ? 2 : 0;
      const bodyHit = haystack.includes(normalized) ? 1 : 0;
      return { article, score: titleHit + summaryHit + bodyHit };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.article);
}
