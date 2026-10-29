// app/sitemap.ts - builds /sitemap.xml at build time (static export).
// Delete public/sitemap.xml if it exists: only ONE sitemap source should be used.
import type { MetadataRoute } from "next";
import { fetchPosts } from "@/lib/posts";
import { services } from "@/lib/services";
import { jobs } from "@/lib/careers";
import { getCountries, getCountry, getState } from "@/lib/agency";

export const dynamic = "force-static";

const BASE = "https://glancetechy.com";

type Freq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

// Build date: used for the home page, which changes with every release.
const BUILT = new Date();

// Last real update of each page. Change the date when you change that page.
const d = (iso: string) => new Date(`${iso}T12:00:00Z`);

const DATES = {
  about: d("2026-09-15"),
  services: d("2026-09-01"),
  pricing: d("2026-09-15"),
  careers: d("2026-08-01"),
  portfolio: d("2026-09-15"),
  faq: d("2026-09-15"),
  contact: d("2026-09-15"),
  serviceAreas: d("2026-07-01"),
};

type Slugged = { slug: string };
type CountryDetail = Slugged & { states?: Slugged[] };
type StateDetail = Slugged & { cities?: Slugged[] };

const entry = (
  path: string,
  lastModified: Date,
  changeFrequency: Freq,
  priority: number
): MetadataRoute.Sitemap[number] => ({ url: `${BASE}${path}`, lastModified, changeFrequency, priority });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ---- Blog posts (from the API) ----
  let blog: MetadataRoute.Sitemap = [];
  let newestPost: Date | undefined;
  try {
    const posts = await fetchPosts();
    blog = posts
      .filter((p) => p.slug && p.slug !== "_")
      .map((p) => {
        const raw = /^\d{4}-\d{2}-\d{2}/.test(p.date ?? "")
          ? `${p.date.slice(0, 10)}T10:00:00Z`
          : (p as { updated_at?: string }).updated_at ?? (p as { created_at?: string }).created_at;
        const parsed = raw ? new Date(raw) : undefined;
        const when = parsed && !isNaN(parsed.getTime()) ? parsed : BUILT;
        if (!newestPost || when > newestPost) newestPost = when;
        return entry(`/blog/${p.slug}/`, when, "monthly", 0.7);
      });
  } catch (error) {
    // The sitemap is still built, but say so loudly in the build log.
    console.warn("\n[sitemap] WARNING: blog posts could not be loaded, so they are NOT in sitemap.xml:", error);
  }

  // ---- Main pages ----
  const pages: MetadataRoute.Sitemap = [
    entry("/", BUILT, "weekly", 1.0),
    entry("/about/", DATES.about, "monthly", 0.8),
    entry("/services/", DATES.services, "monthly", 0.9),
    entry("/pricing/", DATES.pricing, "monthly", 0.8),
    entry("/careers/", DATES.careers, "weekly", 0.5),
    entry("/portfolio/", DATES.portfolio, "monthly", 0.8),
    entry("/blog/", newestPost ?? BUILT, "monthly", 0.7),
    entry("/faq/", DATES.faq, "monthly", 0.8),
    entry("/contact/", DATES.contact, "monthly", 0.8),
    entry("/marketplace/", DATES.contact, "monthly", 0.6),
    entry("/agency/", DATES.serviceAreas, "monthly", 0.6),

    // ---- Service pages ----
    ...services.map((s) => entry(`/services/${s.slug}/`, DATES.services, "monthly", 0.9)),

    // ---- Job pages ----
    ...jobs.map((j) => entry(`/careers/${j.slug}/`, DATES.careers, "weekly", 0.5)),
  ];

  // ---- Service areas: country / state / city (same data the pages are built from) ----
  const areas: MetadataRoute.Sitemap = [];
  try {
    const countries = await getCountries<Slugged>();
    for (const c of countries) {
      if (!c.slug || c.slug === "_") continue;
      areas.push(entry(`/agency/${c.slug}/`, DATES.serviceAreas, "monthly", 0.6));

      const country = await getCountry<CountryDetail>(c.slug);
      for (const s of country?.states ?? []) {
        if (!s.slug || s.slug === "_") continue;
        areas.push(entry(`/agency/${c.slug}/${s.slug}/`, DATES.serviceAreas, "monthly", 0.6));

        const state = await getState<StateDetail>(c.slug, s.slug);
        for (const city of state?.cities ?? []) {
          if (!city.slug || city.slug === "_") continue;
          areas.push(entry(`/agency/${c.slug}/${s.slug}/${city.slug}/`, DATES.serviceAreas, "monthly", 0.6));
        }
      }
    }
  } catch (error) {
    console.warn("\n[sitemap] WARNING: service areas could not be loaded, so they are NOT in sitemap.xml:", error);
  }

  console.log(`\n[sitemap] ${pages.length} pages, ${blog.length} blog posts, ${areas.length} agency URLs`);

  return [...pages, ...blog, ...areas];
}