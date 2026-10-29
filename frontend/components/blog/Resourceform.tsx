"use client";
// components/admin/ResourceForm.tsx (for both add + edit, generated from config)
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { configs, type Field, type ResourceKey } from "@/lib/admin-config";
import { adminRequest } from "@/lib/admin-api";
import { ApiError } from "@/lib/api";
import RichTextEditor from "./Richtexteditor ";
import ImageField from "../admin/ImageField";

type Values = Record<string, string | boolean>;

const input =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-accent";

export default function ResourceForm({
  resource,
  item,
}: {
  resource: ResourceKey;
  item?: Record<string, unknown>;
}) {
  const cfg = configs[resource];
  const router = useRouter();

  const [values, setValues] = useState<Values>(() => {
    const v: Values = {};
    for (const f of cfg.fields) {
      const raw = item?.[f.name] ?? cfg.defaults[f.name];
      if (f.type === "boolean") v[f.name] = Boolean(raw);
      else if (f.type === "paragraphs") v[f.name] = Array.isArray(raw) ? raw.join("\n\n") : typeof raw === "string" ? raw : "";
      else if (f.type === "date" && !raw) v[f.name] = new Date().toISOString().slice(0, 10);
      else v[f.name] = raw == null ? "" : String(raw);
    }
    return v;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  // dropdown options for "relation" fields (country → state → city)
  const [relations, setRelations] = useState<Record<string, { value: string; label: string }[] | null>>({});

  useEffect(() => {
    let alive = true;
    for (const f of cfg.fields) {
      if (f.type !== "relation" || !f.relation) continue;
      adminRequest<{ id: string | number; label?: string; name: string }[]>(`/${f.relation}`)
        .then((rows) => {
          if (!alive) return;
          const options = rows.map((r) => ({ value: String(r.id), label: r.label ?? r.name }));
          setRelations((p) => ({ ...p, [f.name]: options }));
        })
        .catch(() => alive && setRelations((p) => ({ ...p, [f.name]: [] })));
    }
    return () => {
      alive = false;
    };
  }, [cfg]);

  const set = (name: string, v: string | boolean) => setValues((p) => ({ ...p, [name]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    setMessage("");
    try {
      await adminRequest(item ? `/${resource}/${item.id}` : `/${resource}`, {
        method: item ? "PUT" : "POST",
        body: JSON.stringify(values),
      });
      router.push(`/admin/${resource}/`);
    } catch (err) {
      if (err instanceof ApiError) setErrors(err.errors);
      setMessage(err instanceof Error ? err.message : "Unable to save.");
      setBusy(false);
    }
  }

  function renderField(f: Field) {
    const v = values[f.name];
    const common = { id: f.name, name: f.name };
    switch (f.type) {
      case "textarea":
        return <textarea {...common} rows={4} value={String(v)} onChange={(e) => set(f.name, e.target.value)} className={input} />;
      case "paragraphs":
        return <RichTextEditor
      value={String(v ?? "")}
      onChange={(html: string) =>
        set(f.name, html)
      }
      placeholder="Write your article content..."
    />;
      case "relation": {
        const options = relations[f.name];
        if (!options) return <p className="mt-1.5 text-sm text-gray-500">Loading...</p>;
        if (options.length === 0 && f.relation)
          return (
            <p className="mt-1.5 text-sm text-red-600">
              First create a {configs[f.relation].singular},{" "}
              <Link href={`/admin/${f.relation}/new/`} className="underline">
                click here
              </Link>
              .
            </p>
          );
        return (
          <select {...common} required={f.required} value={String(v)} onChange={(e) => set(f.name, e.target.value)} className={input}>
            <option value="">— Select —</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        );
      }
      case "number":
        return <input {...common} type="number" min={0} inputMode="numeric" value={String(v)} onChange={(e) => set(f.name, e.target.value)} className={input} />;
      case "select":
        return (
          <select {...common} value={String(v)} onChange={(e) => set(f.name, e.target.value)} className={input}>
            {f.options?.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        );
      case "boolean":
        return (
          <label className="mt-1.5 flex items-center gap-3 text-sm">
            <input type="checkbox" checked={Boolean(v)} onChange={(e) => set(f.name, e.target.checked)} className="h-5 w-5 accent-ink" />
            Yes
          </label>
        );
      case "color":
        return (
          <div className="mt-1.5 flex items-center gap-3">
            <input type="color" value={String(v) || "#000000"} onChange={(e) => set(f.name, e.target.value)} className="h-11 w-16 cursor-pointer rounded-lg border border-slate-200 bg-white p-1" />
            <span className="text-sm text-gray-500">{String(v)}</span>
          </div>
        );
      case "image":
        return <ImageField value={String(v)} onChange={(url) => set(f.name, url)} onBusy={setUploading} />;
      case "date":
        return <input {...common} type="date" value={String(v)} onChange={(e) => set(f.name, e.target.value)} className={input} />;
      case "url":
        return <input {...common} type="url" value={String(v)} placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} className={input} />;
      default:
        return <input {...common} type="text" value={String(v)} placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} className={input} />;
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      {cfg.fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="text-sm font-medium text-ink">
            {f.label}
            {f.required && <span className="text-red-500"> *</span>}
          </label>
          {renderField(f)}
          {f.help && <p className="mt-1.5 text-xs text-gray-500">{f.help}</p>}
          {errors[f.name] && <p className="mt-1.5 text-sm text-red-600">{errors[f.name]}</p>}
        </div>
      ))}

      <p aria-live="polite" className={`text-sm text-red-600 ${message ? "" : "sr-only"}`}>{message}</p>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={busy || uploading}
          className="rounded-xl bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Saving..." : uploading ? "Uploading image..." : "Save"}
        </button>
        <Link href={`/admin/${resource}/`} className="rounded-xl px-5 py-3 text-sm text-gray-600 transition-colors hover:bg-slate-100">
          Cancel
        </Link>
      </div>
    </form>
  );
}