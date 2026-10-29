// scripts/check-api.mjs - runs automatically before `npm run build` (prebuild).
// Only WARNS: it never stops the build. It shows exactly which API URL fails
// and why, so a 404 at build time can be traced in seconds.
import { readFileSync, existsSync } from "node:fs";

function readEnv(file) {
  if (!existsSync(file)) return {};
  return Object.fromEntries(
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#") && l.includes("="))
      .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)])
  );
}

const env = { ...readEnv(".env.production"), ...process.env };
const base = (env.NEXT_PUBLIC_API_URL || "https://glancetechy.com/backend/public/index.php/api").replace(/\/$/, "");

if (base.startsWith("/")) {
  console.log(`[check-api] NEXT_PUBLIC_API_URL is "${base}" (dev proxy) - skipped.`);
  process.exit(0);
}

const paths = ["/posts?limit=100", "/projects", "/testimonials", "/agency"];
let bad = 0;

for (const p of paths) {
  const url = base + p;
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    const text = await res.text();
    let isJson = true;
    try { JSON.parse(text); } catch { isJson = false; }

    if (res.ok && isJson) {
      console.log(`[check-api] OK   ${res.status} ${url}`);
    } else {
      bad++;
      const why = !isJson
        ? "answer is not JSON -> web server/hosting problem, request never reached Laravel"
        : "Laravel answered with an error";
      console.warn(`[check-api] FAIL ${res.status} ${url}\n            ${why}\n            ${text.slice(0, 120).replace(/\s+/g, " ")}`);
    }
  } catch (e) {
    bad++;
    console.warn(`[check-api] FAIL ${url}\n            ${e.message}`);
  }
}

if (bad) {
  console.warn(
    `\n[check-api] ${bad} endpoint(s) failing. Pages that need them will be built EMPTY.\n` +
      `            Fix the backend (see README-FIX.md) and run the build again before uploading dist/.\n`
  );
}
