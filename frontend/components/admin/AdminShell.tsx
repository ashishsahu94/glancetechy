"use client";
// components/admin/AdminShell.tsx (sidebar + logout)
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout as apiLogout } from "@/lib/admin-api";
import { configs, GROUP_LABELS, RESOURCE_KEYS } from "@/lib/admin-config";

type NavItem = { href: string; label: string };

const groups: { title?: string; items: NavItem[] }[] = [
  { items: [{ href: "/admin", label: "Dashboard" }] },
  ...(["content", "areas"] as const).map((g) => ({
    title: GROUP_LABELS[g],
    items: RESOURCE_KEYS.filter((k) => configs[k].group === g).map((k) => ({
      href: `/admin/${k}`,
      label: configs[k].label,
    })),
  })),
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const active = (href: string) => {
    const p = pathname.replace(/\/$/, "");
    return href === "/admin" ? p === "/admin" : p.startsWith(href);
  };

  async function logout() {
    await apiLogout().catch(() => undefined);
    router.replace("/admin/login/");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-ink lg:flex">
      <aside className="flex flex-col border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-lg font-semibold">Admin Panel</p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 underline-offset-4 hover:text-ink hover:underline"
          >
            View Website
          </a>
        </div>

        <nav className="flex gap-4 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:gap-5 lg:pb-0">
          {groups.map((g, i) => (
            <div key={i} className="flex shrink-0 items-center gap-1 lg:flex-col lg:items-stretch">
              {g.title && (
                <p className="hidden px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 lg:block">
                  {g.title}
                </p>
              )}
              {g.items.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active(n.href) ? "page" : undefined}
                  className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active(n.href) ? "bg-ink text-white" : "text-gray-600 hover:bg-slate-100 hover:text-ink"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="hidden p-3 lg:block">
          <button
            onClick={logout}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-slate-100 hover:text-ink"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        <div className="mb-6 flex justify-end lg:hidden">
          <button
            onClick={logout}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-gray-600"
          >
            Logout
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}