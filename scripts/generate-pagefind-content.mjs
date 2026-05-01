import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { marked } from "marked";

const root = process.cwd();
const contentDir = path.join(root, "content", "ru");
const outputDir = path.join(root, "dist", "pagefind-content");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: raw };
  }

  const frontmatter = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).trimStart();
  const data = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    const value = rawValue.trim();
    if (value && !value.startsWith("-")) {
      data[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return { data, content };
}

await mkdir(outputDir, { recursive: true });

const files = (await readdir(contentDir)).filter((file) => file.endsWith(".md"));

for (const file of files) {
  if (file === "index.md") continue;

  const slug = file.replace(/\.md$/, "");
  const raw = await readFile(path.join(contentDir, file), "utf8");
  const parsed = parseFrontmatter(raw);
  const title = parsed.data.title || slug;
  const summary = parsed.data.summary || "";
  const html = marked.parse(parsed.content, { async: false });

  await writeFile(
    path.join(outputDir, `${slug}.html`),
    `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(summary)}" />
    <meta http-equiv="refresh" content="0; url=/${slug}" />
  </head>
  <body>
    <main data-pagefind-body>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(summary)}</p>
      ${html}
      <p><a href="/${slug}">Открыть страницу сайта</a></p>
    </main>
  </body>
</html>
`,
    "utf8",
  );
}

console.log(`Generated ${files.length - 1} Pagefind content files.`);
