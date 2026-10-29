"use client";
// components/admin/LoginForm.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/admin-api";

export default function LoginForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      await login(String(fd.get("email") ?? ""), String(fd.get("password") ?? ""));
      router.replace("/admin/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in.");
      setBusy(false);
    }
  }

  const input =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-primary";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-ink">Admin Login</h1>
        <p className="mt-1 text-sm text-gray-500">Log in to manage your website.</p>

        <label className="mt-6 block text-sm text-gray-700">
          Email
          <input name="email" type="email" required autoComplete="username" className={input} />
        </label>
        <label className="mt-4 block text-sm text-gray-700">
          Password
          <input name="password" type="password" required autoComplete="current-password" className={input} />
        </label>

        <p aria-live="polite" className={`mt-4 text-sm text-red-600 ${error ? "" : "sr-only"}`}>
          {error}
        </p>

        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-60"
        >
          {busy ? "Logging in..." : "Log In"}
        </button>
      </form>
    </main>
  );
}