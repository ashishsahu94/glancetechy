"use client";

import { useState } from "react";
import { adminRequest } from "@/lib/admin-api";

export default function DeleteButton({
  resource,
  id,
  label,
  warning,
  onDeleted,
}: {
  resource: string;
  id: string;
  label: string;
  warning?: string;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState(false);

  async function remove() {
    const text = `"${label}" do you want to delete? This action cannot be undone.${warning ? `\n\n⚠ ${warning}` : ""}`;

    if (!window.confirm(text)) return;

    setBusy(true);

    try {
      await adminRequest(`/${resource}/${id}`, {
        method: "DELETE",
      });

      onDeleted();
    } catch {
      window.alert(
        "Unable to delete. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={remove}
      disabled={busy}
      className="rounded-lg px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      {busy ? "..." : "Delete"}
    </button>
  );
}