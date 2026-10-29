"use client";
import { useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import BlogCategories, { type CategoryItem } from "@/components/blog/BlogCategories";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogPagination from "@/components/blog/BlogPagination";
import { useApiList } from "@/hooks/useApi";
import { scrollToTarget } from "@/lib/scroll";
import type { Post } from "@/lib/types";

/** Articles shown per page (3 columns x 3 rows on desktop). */
const PER_PAGE = 9;
const ALL = "all";

const keyOf = (c: string) => c.trim().toLowerCase();

function readUrl(): { page: number; category: string; q: string } {
  if (typeof window === "undefined") return { page: 1, category: ALL, q: "" };
  const q = new URLSearchParams(window.location.search);
  const n = parseInt(q.get("page") ?? "1", 10);
  return {
    page: Number.isFinite(n) && n > 0 ? n : 1,
    category: keyOf(q.get("category") ?? "") || ALL,
    q: (q.get("q") ?? "").slice(0, 80),
  };
}

export default function BlogList() {
  const { data, error, loading } = useApiList<Post>("/posts?limit=100");
  const [initial] = useState(readUrl);
  const [requested, setRequested] = useState(initial.page);
  const [requestedCat, setRequestedCat] = useState(initial.category);
  const [query, setQuery] = useState(initial.q);
  const topRef = useRef<HTMLDivElement>(null);

  // Category chips are built from the posts themselves, so new admin categories appear automatically.
  const categories = useMemo<CategoryItem[]>(() => {
    const map = new Map<string, CategoryItem>();
    for (const p of data ?? []) {
      const label = (p.category ?? "").trim();
      if (!label) continue;
      const key = keyOf(label);
      const item = map.get(key);
      if (item) item.count++;
      else map.set(key, { key, label, count: 1 });
    }
    const list = [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
    return [{ key: ALL, label: "All", count: data?.length ?? 0 }, ...list];
  }, [data]);

  if (loading)
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading articles">
        {[0, 1, 2].map((i) => (
          <div key={i} className="overflow-hidden rounded-3xl bg-white p-2">
            <div className="skeleton aspect-[16/10] rounded-2xl" />
            <div className="space-y-3 p-5">
              <div className="skeleton h-3 w-1/3 rounded-full" />
              <div className="skeleton h-5 w-5/6 rounded-full" />
              <div className="skeleton h-3 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  if (error) return <p className="py-20 text-center text-red-600">{error}</p>;
  if (!data?.length) return <p className="py-20 text-center text-gray-500">New articles are coming soon.</p>;

  // An unknown ?category=xyz falls back to "All".
  const category = categories.some((c) => c.key === requestedCat) ? requestedCat : ALL;
  const term = query.trim().toLowerCase();
  const filtered = data.filter((p) => {
    if (category !== ALL && keyOf(p.category ?? "") !== category) return false;
    if (!term) return true;
    return `${p.title} ${p.excerpt ?? ""} ${p.category ?? ""}`.toLowerCase().includes(term);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(requested, totalPages); // a stale ?page=99 falls back to the last page
  const posts = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function syncUrl(p: number, cat: string, q: string = query) {
    const url = new URL(window.location.href);
    if (p === 1) url.searchParams.delete("page");
    else url.searchParams.set("page", String(p));
    if (cat === ALL) url.searchParams.delete("category");
    else url.searchParams.set("category", cat);
    if (q.trim()) url.searchParams.set("q", q.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }

  function scrollToTop() {
    if (topRef.current) scrollToTarget(topRef.current, -112);
  }

  function goPage(p: number) {
    setRequested(p);
    syncUrl(p, category);
    scrollToTop();
  }

  function goCategory(cat: string) {
    setRequestedCat(cat);
    setRequested(1); // every category starts on its first page
    syncUrl(1, cat);
  }

  function onSearch(value: string) {
    setQuery(value);
    setRequested(1); // every search starts on its first page
    syncUrl(1, category, value);
  }

  function clearAll() {
    setQuery("");
    setRequestedCat(ALL);
    setRequested(1);
    syncUrl(1, ALL, "");
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Search */}
      <form role="search" onSubmit={(e) => e.preventDefault()} className="mx-auto mb-6 w-full max-w-xl">
        <label htmlFor="blog-search" className="sr-only">Search articles</label>
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            maxLength={80}
            placeholder="Search articles..."
            autoComplete="off"
            className="h-14 w-full rounded-full border border-transparent bg-white pl-12 pr-12 text-base text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-ink [&::-webkit-search-cancel-button]:hidden sm:text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => onSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-slate-100 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </form>

      <BlogCategories items={categories} active={category} onChange={goCategory} />

      {(term || category !== ALL) && (
        <p role="status" aria-live="polite" className="mt-6 text-center text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"} found
          {term ? <> for &ldquo;{query.trim()}&rdquo;</> : null}
        </p>
      )}

      <div className="mt-8">
        {posts.length ? (
          <BlogGrid key={`${category}-${term}-${page}`} posts={posts} />
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-600">No articles found. Try another word or category.</p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-5 inline-flex h-11 items-center rounded-full bg-charcoal px-6 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Clear search &amp; filters
            </button>
          </div>
        )}
      </div>

      <BlogPagination page={page} totalPages={totalPages} onChange={goPage} />
    </div>
  );
}
