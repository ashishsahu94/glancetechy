"use client";
// components/admin/ImageField.tsx (upload + preview)
import { useState } from "react";
import { adminRequest } from "@/lib/admin-api";

export default function ImageField({
  value,
  onChange,
  onBusy,
}: {
  value: string;
  onChange: (url: string) => void;
  onBusy: (busy: boolean) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    setUploading(true);
    onBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const json = await adminRequest<{ url: string }>("/upload", { method: "POST", body: fd });
      onChange(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to upload.");
    } finally {
      setUploading(false);
      onBusy(false);
    }
  }

  return (
    <div className="mt-1.5 flex items-center gap-4">
      <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-surface text-xs text-gray-400">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          "No image"
        )}
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          <label className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50">
            {uploading ? "Uploading..." : value ? "Change Image" : "Choose Image"}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={pick} disabled={uploading} className="sr-only" />
          </label>
          {value && (
            <button type="button" onClick={() => onChange("")} className="rounded-xl px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50">
              Remove
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}