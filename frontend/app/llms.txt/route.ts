// app/llms.txt/route.ts
// Builds /llms.txt at build time (static export), from the same data as the site.
import { fetchPosts } from "@/lib/posts";
import { services } from "@/lib/services";
import { jobs } from "@/lib/careers";
import { getCountries } from "@/lib/agency";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

const BASE = SITE.url;

export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${SITE.name}`, "");
  lines.push(
    `> ${SITE.name} is a digital agency based in Lucknow, India. We design and develop websites and run SEO, advertising and digital marketing for businesses in India and around the world.`,
    ""
  );
  lines.push(
    "We build fast, mobile-friendly websites and help businesses get found online through search, social media, paid ads and email. Every project starts with a free consultation and a clear quote.",
    ""
  );

  lines.push("## Services");
  for (const s of services) {
    lines.push(`- [${s.title}](${BASE}/services/${s.slug}/): ${s.tagline}`);
  }
  lines.push("");

  lines.push("## Company");
  lines.push(`- [About ${SITE.name}](${BASE}/about/): Who we are and how we work.`);
  lines.push(`- [Portfolio](${BASE}/portfolio/): Websites and projects we have delivered.`);
  lines.push(`- [Pricing](${BASE}/pricing/): Packages and what is included.`);
  lines.push(`- [Careers](${BASE}/careers/): Open roles at ${SITE.name}.`);
  for (const j of jobs) {
    lines.push(`- [${j.title}](${BASE}/careers/${j.slug}/): ${j.summary}`);
  }
  lines.push("");

  lines.push("## Resources");
  lines.push(`- [FAQ](${BASE}/faq/): Answers to common questions about our work.`);
  lines.push(`- [Blog](${BASE}/blog/): Practical guides on web design, SEO and digital marketing.`);
  try {
    const posts = await fetchPosts();
    for (const p of posts.filter((x) => x.slug && x.slug !== "_").slice(0, 20)) {
      lines.push(`- [${p.title}](${BASE}/blog/${p.slug}/)`);
    }
  } catch {
    // If the API is unreachable, the file is still built without blog posts.
  }
  lines.push("");

  lines.push("## Agency locations");
  lines.push(`- [All agency locations](${BASE}/agency/): Countries, states and cities we serve.`);
  try {
    const countries = await getCountries<{ slug: string; name: string }>();
    for (const c of countries) {
      if (!c.slug || c.slug === "_") continue;
      lines.push(`- [${c.name}](${BASE}/agency/${c.slug}/): Digital marketing and web services in ${c.name}.`);
    }
  } catch {
    // Same: skip on failure.
  }
  lines.push("");

  lines.push("## Contact");
  lines.push(`- [Contact us](${BASE}/contact/): Send an enquiry or request a free quote.`);
  lines.push(`- Email: ${SITE.email}`);
  lines.push(`- Phone: ${SITE.phone}`);
  lines.push(`- Location: ${SITE.address}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}