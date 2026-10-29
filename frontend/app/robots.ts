import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://glancetechy.com";
const DISALLOW = ["/admin", "/backend"];

// Search engines and AI crawlers, in the order they appear in robots.txt.
// Each one is allowed on the whole site except the admin and backend folders.
const BOTS = [
  "*",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: BOTS.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: DISALLOW,
    })),
    sitemap: `${SITE}/sitemap.xml`,
  };
}