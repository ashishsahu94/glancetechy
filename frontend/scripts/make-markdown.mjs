// Runs after `next build` (postbuild, after flatten-segments).
// For every page in dist/ it writes a Markdown copy next to it:
//   dist/services/index.html  ->  dist/services/index.md
// Apache (public/.htaccess) serves that .md file when a client sends
//   Accept: text/markdown
// so AI agents get clean text instead of ~160 KB of HTML.
// Needs:  npm i -D node-html-markdown
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { NodeHtmlMarkdown } from "node-html-markdown";

const DIST = "dist";
const SITE = "https://glancetechy.com";
const nhm = new NodeHtmlMarkdown({ useInlineLinks: true, maxConsecutiveNewlines: 2 });

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name.startsWith("_next") || name.startsWith("__next") || name === "admin") continue;
      walk(full);
    } else if (name === "index.html") pages.push(full);
  }
})(DIST);

const pick = (html, re) => (html.match(re) || [])[1]?.trim() ?? "";
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

let made = 0;
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  // Skip the "_" fallback shell and noindex pages
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue;

  let main = pick(html, /<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!main) continue;
  main = main
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<img[^>]*>/gi, "");

  const title = decode(pick(html, /<title>([\s\S]*?)<\/title>/i));
  const desc = decode(pick(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i));
  const path = "/" + file.slice(DIST.length + 1).replace(/index\.html$/, "").replace(/\\/g, "/");

  const md =
    `# ${title}\n\n` +
    (desc ? `> ${desc}\n\n` : "") +
    `Source: ${SITE}${path}\n\n---\n\n` +
    nhm.translate(main).trim() +
    `\n\n---\n\nSite index for AI agents: ${SITE}/llms.txt\n`;

  writeFileSync(file.replace(/index\.html$/, "index.md"), md);
  made++;
}
console.log(`make-markdown: wrote ${made} Markdown page(s)`);
