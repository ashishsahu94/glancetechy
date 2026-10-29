"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, CheckCircle2, ChevronDown, X } from "lucide-react";
import { apiPost } from "@/lib/api";
import { CONTACT_BUDGETS } from "@/lib/site";
import { services } from "@/lib/services";

/** Minimum characters for "Project detail" (change here). */
const MIN_DETAIL = 100;
const MAX_DETAIL = 2000; // backend keeps the first 3000 characters of the whole message

const INDUSTRIES = [
  "E-commerce & Retail",
  "Healthcare & Medical",
  "Education",
  "Real Estate",
  "Jewellery",
  "Finance & Insurance",
  "Travel & Hospitality",
  "Restaurants & Food",
  "Manufacturing",
  "IT & Software",
  "Non-profit",
  "Other",
];
const TIMING = ["As soon as possible", "Within 1 month", "1 - 3 months", "3 - 6 months", "Not sure yet"];
const BUDGET_TYPE = ["One-time budget for the entire project", "Monthly budget", "Not sure yet"];
const LOCATIONS = ["India", "United States", "United Kingdom", "UAE / Middle East", "Australia / New Zealand", "Other"];
const SERVICE_OPTIONS = [...services.map((s) => s.title), "Mobile App Development", "Custom Software / Product", "Something else"];

const STEPS = [
  ["Share detailed project information.", "Provide in-depth details so we can understand your goals."],
  ["We review your project.", "We check it to make sure we can deliver what you need."],
  ["We match the right team.", "The right specialists are picked for your project."],
  ["Receive a personalised quote.", "We contact you with a tailored plan and price."],
];

const input =
  "h-14 w-full rounded-xl bg-gray-100 px-5 text-[15px] text-ink outline-none ring-1 ring-transparent transition placeholder:text-gray-400 focus:bg-white focus:ring-gray-900";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-gray-800">
      {children}
    </label>
  );
}

function Select({ id, name, placeholder, options }: { id: string; name: string; placeholder: string; options: string[] }) {
  return (
    <div className="relative">
      <select id={id} name={name} required defaultValue="" className={`${input} appearance-none pr-12 invalid:text-gray-400`}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-700" />
    </div>
  );
}

export default function ProjectQuoteModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Lock page scroll, close on Escape, focus the first field
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLInputElement>("input")?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, mounted]);

  function toggle(s: string) {
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    if (!picked.length) {
      setError("Please choose at least one service.");
      setStatus("error");
      return;
    }
    if (detail.trim().length < MIN_DETAIL) {
      setError(`Please describe your project in at least ${MIN_DETAIL} characters.`);
      setStatus("error");
      return;
    }

    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setStatus("loading");
    setError("");

    // Uses the existing /contact endpoint: everything extra goes into the message.
    const message = [
      `PROJECT QUOTE REQUEST`,
      `Project title: ${f.project_title}`,
      `Job title: ${f.job_title}`,
      `Company website: ${f.company_website}`,
      `Industry: ${f.industry}`,
      `Timing: ${f.timing}`,
      `Budget type: ${f.budget_type}`,
      `Location: ${f.location}`,
      `Services: ${picked.join(", ")}`,
      ``,
      `Project detail:`,
      detail.trim(),
    ].join("\n");

    try {
      await apiPost("/contact", {
        name: `${f.first_name} ${f.last_name}`.trim(),
        email: f.email,
        phone: f.phone,
        company: `${f.company}${f.company_website ? ` (${f.company_website})` : ""}`,
        service: `Project quote: ${picked[0]}${picked.length > 1 ? ` +${picked.length - 1}` : ""}`,
        budget: f.budget,
        message,
        website: "", // honeypot (must stay empty)
      });
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div role="dialog" aria-modal="true" aria-labelledby="quote-title" className="fixed inset-0 z-[100] overflow-y-auto bg-white">
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white px-4 shadow-[0_4px_16px_-8px_rgba(0,0,0,.18)] sm:px-10">
        <button type="button" onClick={onClose} className="flex items-center gap-3 text-sm text-gray-800 hover:text-black">
          <ArrowLeft size={20} aria-hidden="true" />
          Back to Page
        </button>
        <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-black">
          <X size={24} />
        </button>
      </div>

      <div ref={panel} className="mx-auto grid w-full max-w-[1080px] gap-10 px-4 py-10 sm:px-8 lg:grid-cols-[1fr_340px] lg:gap-14">
        <div>
          {status === "success" ? (
            <div className="rounded-3xl bg-emerald-50 p-8 sm:p-12">
              <CheckCircle2 size={44} className="text-emerald-600" aria-hidden="true" />
              <h2 id="quote-title" className="mt-5 text-3xl font-semibold tracking-tight text-ink">
                Thank you, we got your project
              </h2>
              <p className="mt-3 text-gray-600">
                Our team will review the details and contact you shortly with a tailored quote. Check your email for our reply.
              </p>
              <button type="button" onClick={onClose} className="mt-8 rounded-xl bg-charcoal px-6 py-3 text-sm font-medium text-white hover:bg-charcoal-dark">
                Back to Page
              </button>
            </div>
          ) : (
            <>
              <h2 id="quote-title" className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Get a Project Quote
              </h2>
              <p className="mt-5 max-w-[620px] text-base leading-relaxed text-gray-600">
                Fill in the form below and tell us about your project. Add as many details as you like. The more we know, the better the quote.
              </p>

              <form onSubmit={onSubmit} className="mt-10 grid gap-x-4 gap-y-6 sm:grid-cols-2" noValidate={false}>
                <div className="sm:col-span-2">
                  <Label htmlFor="first_name">Name *</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input id="first_name" name="first_name" required placeholder="First Name" autoComplete="given-name" className={input} />
                    <input id="last_name" name="last_name" required placeholder="Last Name" aria-label="Last name" autoComplete="family-name" className={input} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="job_title">Job Title *</Label>
                  <input id="job_title" name="job_title" required autoComplete="organization-title" className={input} />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={input} />
                </div>

                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <input id="company" name="company" required autoComplete="organization" className={input} />
                </div>
                <div>
                  <Label htmlFor="company_website">Company Website</Label>
                  <input id="company_website" name="company_website" placeholder="https://" className={input} />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <input id="phone" name="phone" type="tel" required pattern="[0-9+()\-\s]{6,40}" title="Digits, spaces, + and - only" placeholder="+91 98765 43210" autoComplete="tel" className={input} />
                </div>
                <div>
                  <Label htmlFor="industry">Company Industry *</Label>
                  <Select id="industry" name="industry" placeholder="Select your company's industry" options={INDUSTRIES} />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="project_title">Project Title *</Label>
                  <input id="project_title" name="project_title" required className={input} />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="detail">Project Detail *</Label>
                  <textarea
                    id="detail"
                    required
                    rows={7}
                    maxLength={MAX_DETAIL}
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    className="w-full rounded-xl bg-gray-100 p-5 text-[15px] text-ink outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-gray-900"
                  />
                  <p className={`mt-1.5 text-xs ${detail.trim().length >= MIN_DETAIL ? "text-emerald-600" : "text-gray-400"}`}>
                    Minimum {MIN_DETAIL} characters ({detail.trim().length}/{MIN_DETAIL})
                  </p>
                </div>

                <div>
                  <Label htmlFor="timing">Project Timing *</Label>
                  <Select id="timing" name="timing" placeholder="Select project duration" options={TIMING} />
                </div>
                <div>
                  <Label htmlFor="budget">Project Budget *</Label>
                  <Select id="budget" name="budget" placeholder="Select your project budget" options={CONTACT_BUDGETS} />
                </div>

                <div>
                  <Label htmlFor="budget_type">Budget Detail *</Label>
                  <Select id="budget_type" name="budget_type" placeholder="Is your budget one-time or monthly?" options={BUDGET_TYPE} />
                </div>
                <div>
                  <Label htmlFor="location">Your Location *</Label>
                  <Select id="location" name="location" placeholder="Select choice" options={LOCATIONS} />
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="mb-3 text-sm font-medium text-gray-800">Required Services *</legend>
                  <div className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {SERVICE_OPTIONS.map((s) => (
                      <label key={s} className="flex cursor-pointer items-center gap-3 text-[15px] text-gray-700">
                        <input
                          type="checkbox"
                          checked={picked.includes(s)}
                          onChange={() => toggle(s)}
                          className="h-5 w-5 shrink-0 cursor-pointer rounded border-gray-300 accent-gray-900"
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="sm:col-span-2">
                  <p className="mb-2 text-sm font-medium text-gray-800">Consent *</p>
                  <label className="flex cursor-pointer items-start gap-3 text-[15px] text-gray-700">
                    <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-gray-300 accent-gray-900" />
                    I agree that GlanceTechy may contact me about my project and send me a quote.
                  </label>
                </div>

                {status === "error" && (
                  <p role="alert" className="sm:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex justify-end sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-xl bg-charcoal px-10 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_10px_30px_-10px_rgba(43,228,172,.6)] transition hover:bg-charcoal-dark disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* How it works */}
        <aside className="h-fit self-start rounded-3xl bg-sky-50 p-6 lg:sticky lg:top-24">
          <h3 className="text-2xl font-medium text-ink">How it Works</h3>
          <ol className="mt-5 space-y-5">
            {STEPS.map(([title, text], i) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-ink shadow-sm">{i + 1}</span>
                <p className="text-sm leading-relaxed text-gray-600">
                  <strong className="font-semibold text-ink">{title}</strong> {text}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-relaxed text-gray-600">It is your project, your choice. We will share a clear plan and price, and you decide if we are the right fit.</p>
        </aside>
      </div>
    </div>,
    document.body
  );
}
