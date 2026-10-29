"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { services } from "@/lib/services";

type Item = { id: number; name: string; slug: string };
type Country = Item & { states?: Item[] };
type StateDetail = Item & { cities?: Item[] };

type Chip = { label: string; href: string };
type Tab = "service" | "country" | "state" | "city";

const TABS: { key: Tab; label: string }[] = [
  { key: "service", label: "By Service" },
  { key: "country", label: "By Country" },
  { key: "state", label: "By State" },
  { key: "city", label: "By City" },
];

export default function ExploreTabs() {
  const [tab, setTab] = useState<Tab>("service");
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [cities, setCities] = useState<Chip[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    apiGet<{ data?: Country[] }>("/agency")
      .then((r) => live && setCountries(r.data ?? []))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, []);

  // Cities are loaded only when that tab is opened (one request per state)
  useEffect(() => {
    if (tab !== "city" || cities || !countries) return;
    let live = true;
    const jobs = countries.flatMap((c) =>
      (c.states ?? []).map((s) =>
        apiGet<{ data?: StateDetail }>(`/agency/${c.slug}/${s.slug}`)
          .then((r) => (r.data?.cities ?? []).map((ct) => ({ label: ct.name, href: `/agency/${c.slug}/${s.slug}/${ct.slug}/` })))
          .catch(() => [] as Chip[])
      )
    );
    Promise.all(jobs).then((all) => {
      if (!live) return;
      setCities(all.flat().sort((a, b) => a.label.localeCompare(b.label)));
    });
    return () => {
      live = false;
    };
  }, [tab, cities, countries]);

  let chips: Chip[] | null = null;
  if (tab === "service") chips = services.map((s) => ({ label: s.title, href: `/services/${s.slug}/` }));
  else if (tab === "country") chips = countries && countries.map((c) => ({ label: c.name, href: `/agency/${c.slug}/` }));
  else if (tab === "state")
    chips = countries && countries.flatMap((c) => (c.states ?? []).map((s) => ({ label: s.name, href: `/agency/${c.slug}/${s.slug}/` })));
  else chips = cities;

  return (
    <div>
      <div role="tablist" aria-label="Explore by" className="mx-auto flex max-w-[640px] flex-wrap justify-center gap-1 border-b border-gray-200">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls="explore-panel"
            onClick={() => setTab(key)}
            className={`-mb-px rounded-t-xl border-b-2 px-4 py-2.5 text-[15px] transition ${
              tab === key ? "border-gray-900 bg-gray-100 font-medium text-ink" : "border-transparent text-gray-600 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div id="explore-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mx-auto mt-8 flex max-w-[900px] flex-wrap justify-center gap-2.5">
        {chips === null && !failed && <p className="text-sm text-gray-500">Loading...</p>}
        {chips === null && failed && (
          <p className="text-sm text-gray-500">
            Could not load locations right now. <Link href="/agency/" className="underline">View all locations</Link>
          </p>
        )}
        {chips?.length === 0 && <p className="text-sm text-gray-500">Nothing to show yet.</p>}
        {chips?.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            prefetch={false}
            className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
