"use client";
// components/blog/BlogPagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

/** [1, "…", 4, 5, 6, "…", 12] style list, always short enough for mobile. */
function pageList(current: number, total: number): (number | "gap-l" | "gap-r")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "gap-l" | "gap-r")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("gap-l");
  for (let p = start; p <= end; p++) out.push(p);
  if (end < total - 1) out.push("gap-r");
  out.push(total);
  return out;
}

export default function BlogPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const base =
    "flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink";

  return (
    <nav aria-label="Blog pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${base} bg-white text-ink hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40`}
      >
        <ChevronLeft size={18} />
      </button>

      {pageList(page, totalPages).map((p) =>
        typeof p === "string" ? (
          <span key={p} aria-hidden="true" className="px-1 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            className={`${base} ${p === page ? "bg-charcoal text-white" : "bg-white text-ink hover:bg-slate-100"}`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${base} bg-white text-ink hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40`}
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
