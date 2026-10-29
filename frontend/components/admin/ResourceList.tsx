"use client";
// Admin list (projects / posts / testimonials / countries / states / cities)
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { adminRequest } from "@/lib/admin-api";
import { configs, type ResourceKey } from "@/lib/admin-config";
import DeleteButton from "@/components/admin/DeleteButton";

type Row = { id: string } & Record<string, unknown>;

export default function ResourceList({ resource }: { resource: ResourceKey }) {
  const cfg = configs[resource];
  const [state, setState] = useState<{ resource: string; rows: Row[] | null; error: string }>({
    resource: "",
    rows: null,
    error: "",
  });

  const load = useCallback(() => {
    adminRequest<Row[]>(`/${resource}`)
      .then((rows) => setState({ resource, rows, error: "" }))
      .catch((e) =>
        setState({ resource, rows: null, error: e instanceof Error ? e.message : "Unable to load." })
      );
  }, [resource]);

  useEffect(() => load(), [load]);

  const ready = state.resource === resource;
  const rows = ready ? state.rows : null;
  const error = ready ? state.error : "";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{cfg.label}</h1>
          <p className="mt-1 text-gray-500">{rows ? `Total ${rows.length}` : "Loading..."}</p>
        </div>
        <Link
          href={`/admin/${resource}/new/`}
          className="rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
        >
          + {cfg.newLabel}
        </Link>
      </div>

      {error && <p className="mt-6 text-red-600">{error}</p>}

      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
        {rows && rows.length === 0 ? (
          <p className="p-10 text-center text-gray-500">
            Nothing here yet. Click &quot;+ {cfg.newLabel}&quot;.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {rows?.map((row) => {
              const title = String(row[cfg.titleField] ?? "");
              const sub = cfg.subtitleField ? String(row[cfg.subtitleField] ?? "") : "";
              const img = cfg.imageField ? String(row[cfg.imageField] ?? "") : "";
              const showBadge = cfg.badge
                ? cfg.badge.field === "inactive"
                  ? row.status === false
                  : Boolean(row[cfg.badge.field])
                : false;
              return (
                <li key={row.id} className="flex flex-wrap items-center gap-3 p-4 sm:flex-nowrap sm:gap-4 sm:px-6">
                  {cfg.imageField && (
                    <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {img && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={img} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                  )}
                  <div className="min-w-0 flex-1 basis-40">
                    <p className="truncate font-medium">{title}</p>
                    <p className="truncate text-sm text-gray-500">{sub}</p>
                  </div>
                  {showBadge && cfg.badge && (
                    <span className="rounded-full bg-primary/60 px-3 py-1 text-xs font-medium">
                      {cfg.badge.text}
                    </span>
                  )}
                  <div className="flex shrink-0 items-center gap-1">
                    <Link
                      href={`/admin/${resource}/edit/?id=${encodeURIComponent(String(row.id))}`}
                      className="rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-slate-100"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      resource={resource}
                      id={String(row.id)}
                      label={title}
                      warning={cfg.deleteWarning}
                      onDeleted={load}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}