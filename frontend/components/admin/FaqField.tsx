"use client";
// Admin: add / remove FAQ rows for a blog post.
// Stored as one string ("Q: ...\nA: ...\n\nQ: ...") so the backend needs no changes.
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { parseFaqs, type FaqItem } from "../blog/PostFaq";

const box =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-accent";

const serialize = (rows: FaqItem[]) =>
  rows
    .filter((r) => r.q.trim() && r.a.trim())
    .map((r) => `Q: ${r.q.replace(/\s*\n\s*/g, " ").trim()}\nA: ${r.a.trim()}`)
    .join("\n\n");

export default function FaqField({
  value,
  onChange,
  max = 6000,
}: {
  value: string;
  onChange: (v: string) => void;
  max?: number;
}) {
  const [rows, setRows] = useState<FaqItem[]>(() => parseFaqs(value));

  const update = (next: FaqItem[]) => {
    setRows(next);
    onChange(serialize(next));
  };
  const patch = (i: number, p: Partial<FaqItem>) =>
    update(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));

  const used = serialize(rows).length;

  return (
    <div className="mt-1.5 space-y-3">
      {rows.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-gray-500">
          No FAQ yet. Click "Add FAQ" to add a question for this article.
        </p>
      )}

      {rows.map((r, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-surface p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              FAQ {i + 1}
            </span>
            <button
              type="button"
              onClick={() => update(rows.filter((_, j) => j !== i))}
              className="flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
          <input
            value={r.q}
            onChange={(e) => patch(i, { q: e.target.value })}
            placeholder="Question, e.g. How long does SEO take?"
            className={box}
          />
          <textarea
            value={r.a}
            onChange={(e) => patch(i, { a: e.target.value })}
            rows={3}
            placeholder="Answer"
            className={`${box} mt-2`}
          />
        </div>
      ))}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => update([...rows, { q: "", a: "" }])}
          disabled={used >= max}
          className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40"
        >
          <Plus size={16} /> Add FAQ
        </button>
        <span className="text-xs text-gray-400">{used}/{max}</span>
      </div>
    </div>
  );
}
