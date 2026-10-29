"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Paperclip } from "lucide-react";
import { request } from "@/lib/api";

const MAX_MB = 5;
const ALLOWED = [".pdf", ".doc", ".docx"];

const base =
  "block w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-ink sm:text-sm";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm text-gray-700">
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}

export default function ApplyForm({ jobTitle, jobSlug }: { jobTitle: string; jobSlug: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setError("");
    if (!f) return setFileName("");
    const ext = "." + (f.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED.includes(ext)) {
      e.target.value = "";
      setFileName("");
      return setError("Please upload a PDF, DOC or DOCX file.");
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      e.target.value = "";
      setFileName("");
      return setError(`CV must be smaller than ${MAX_MB} MB.`);
    }
    setFileName(f.name);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("job_title", jobTitle);
    data.set("job_slug", jobSlug);
    try {
      await request("/careers/apply", { method: "POST", body: data });
      form.reset();
      setFileName("");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="mt-8 rounded-2xl bg-surface p-6 text-center">
        <CheckCircle2 size={36} className="mx-auto text-lime-600" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-medium text-ink">Application sent</h3>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for applying for {jobTitle}. We will review it and get back to you by email.
        </p>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate={false}>
      {/* honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <Label htmlFor="ap-name" required>Full name</Label>
        <input id="ap-name" name="name" required maxLength={120} autoComplete="name" className={base} placeholder="Your name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="ap-email" required>Email</Label>
          <input id="ap-email" name="email" type="email" required maxLength={120} autoComplete="email" className={base} placeholder="you@email.com" />
        </div>
        <div>
          <Label htmlFor="ap-phone" required>Phone</Label>
          <input id="ap-phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" className={base} placeholder="+91 ..." />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="ap-exp">Experience</Label>
          <input id="ap-exp" name="experience" maxLength={60} className={base} placeholder="e.g. 3 years" />
        </div>
        <div>
          <Label htmlFor="ap-link">Portfolio / LinkedIn</Label>
          <input id="ap-link" name="link" type="url" maxLength={250} className={base} placeholder="https://" />
        </div>
      </div>
      <div>
        <Label htmlFor="ap-msg">Why are you a good fit?</Label>
        <textarea id="ap-msg" name="message" rows={4} maxLength={3000} className={`${base} resize-none`} placeholder="A few lines about your work" />
      </div>
      <div>
        <Label htmlFor="ap-cv" required>CV (PDF, DOC, DOCX, max {MAX_MB} MB)</Label>
        <label
          htmlFor="ap-cv"
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-surface px-4 py-3 text-sm text-gray-600 transition-colors hover:border-ink"
        >
          <Paperclip size={16} aria-hidden="true" />
          <span className="truncate">{fileName || "Choose file"}</span>
        </label>
        <input id="ap-cv" name="cv" type="file" required accept=".pdf,.doc,.docx" onChange={onFile} className="sr-only" />
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-charcoal text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending...
          </>
        ) : (
          "Submit application"
        )}
      </button>
    </form>
  );
}
