"use client";
// /admin (Dashboard)
import { useEffect, useState } from "react";
import Link from "next/link";
import { adminRequest } from "@/lib/admin-api";
import { configs, GROUP_LABELS, RESOURCE_KEYS } from "@/lib/admin-config";

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    adminRequest<Record<string, number>>("/stats").then(setCounts).catch(() => setCounts({}));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-gray-500">
        Manage your website content from here. Changes are updated on the website as soon as you save them.
      </p>

      {(["content", "areas"] as const).map((group) => (
        <section key={group} className="mt-10">
          <h2 className="text-lg font-semibold text-gray-700">{GROUP_LABELS[group]}</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {RESOURCE_KEYS.filter((k) => configs[k].group === group).map((k) => (
              <div key={k} className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">{configs[k].label}</p>
                <p className="mt-2 text-5xl font-light">{counts ? (counts[k] ?? 0) : "…"}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href={`/admin/${k}/`}
                    className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-200"
                  >
                    View / Edit
                  </Link>
                  <Link
                    href={`/admin/${k}/new/`}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-strong"
                  >
                    + {configs[k].newLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}