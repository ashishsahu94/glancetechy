"use client";
// components/blog/BlogCategories.tsx - filter chips shown above the blog grid.

export type CategoryItem = { key: string; label: string; count: number };

export default function BlogCategories({
  items,
  active,
  onChange,
}: {
  items: CategoryItem[];
  active: string;
  onChange: (key: string) => void;
}) {
  if (items.length <= 2) return null; // "All" plus a single category is pointless

  return (
    <nav
      aria-label="Blog categories"
      className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0"
    >
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
        {items.map((c) => {
          const isActive = c.key === active;
          return (
            <li key={c.key}>
              <button
                type="button"
                onClick={() => onChange(c.key)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink ${
                  isActive ? "bg-charcoal text-white" : "bg-white text-gray-700 hover:bg-slate-100"
                }`}
              >
                {c.label}
                <span className={`text-xs ${isActive ? "text-white/70" : "text-gray-400"}`}>{c.count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
