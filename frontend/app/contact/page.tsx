"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Phone } from "lucide-react";
import type { ReactNode } from "react";
import ResourceCards from "@/components/home/Resourcecards";
import {
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";
import { apiPost } from "@/lib/api";
import { CONTACT_SERVICES, SITE } from "@/lib/site";




const DARK = "var(--color-charcoal)";

type Status = "idle" | "loading" | "success" | "error";

// Placeholder logos (asli client logos se replace kar do)
const logos: { name: string; mark: ReactNode }[] = [
  {
    name: "Layers",
    mark: (
      <svg viewBox="0 0 48 40" className="h-9 w-auto" fill="currentColor" aria-hidden="true">
        <polygon points="24,0 48,12 24,24 0,12" />
        <polygon points="0,18 24,30 48,18 48,24 24,36 0,24" opacity=".7" />
      </svg>
    ),
  },
  {
    name: "Orbit",
    mark: (
      <svg viewBox="0 0 48 40" className="h-9 w-auto" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <rect x="2" y="3" width="44" height="34" rx="17" />
        <rect x="9" y="10" width="30" height="20" rx="10" />
        <rect x="16" y="16" width="16" height="8" rx="4" />
      </svg>
    ),
  },
  {
    name: "N",
    mark: (
      <svg viewBox="0 0 40 40" className="h-9 w-auto" fill="currentColor" aria-hidden="true">
        <path d="M0 0h14l12 16V0h14v40H26L14 24v16H0z" />
      </svg>
    ),
  },
  {
    name: "Globe",
    mark: (
      <svg viewBox="0 0 40 40" className="h-9 w-auto" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <circle cx="20" cy="20" r="17" />
        <ellipse cx="20" cy="20" rx="7" ry="17" />
        <line x1="3" y1="20" x2="37" y2="20" />
      </svg>
    ),
  },
  {
    name: "Shapes",
    mark: (
      <svg viewBox="0 0 40 40" className="h-9 w-auto" fill="currentColor" aria-hidden="true">
        <rect x="2" y="2" width="16" height="22" rx="8" />
        <rect x="22" y="2" width="16" height="16" rx="8" opacity=".6" />
        <rect x="22" y="22" width="16" height="16" rx="8" />
        <rect x="2" y="28" width="16" height="10" rx="5" opacity=".6" />
      </svg>
    ),
  },
];

// Filled input box (grey, turns white with a dark ring on focus)
const BOX =
  "block w-full rounded-xl bg-gray-100 px-5 text-base text-ink outline-none ring-1 ring-transparent transition placeholder:text-gray-400 focus:bg-white focus:ring-gray-900 sm:text-[15px]";

const DIAL_CODES = [
  ["IN", "+91"], ["US", "+1"], ["GB", "+44"], ["CA", "+1"], ["AU", "+61"], ["AE", "+971"], ["SA", "+966"],
  ["QA", "+974"], ["SG", "+65"], ["MY", "+60"], ["DE", "+49"], ["FR", "+33"], ["NP", "+977"], ["BD", "+880"], ["LK", "+94"],
] as const;

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  rows?: number;
  required?: boolean;
  options?: string[];
  className?: string;
};

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  rows,
  required = false,
  options,
  className = "",
}: FieldProps) {
  // text-base on mobile: iOS zooms into inputs smaller than 16px
  const base = `${BOX} ${rows ? "resize-y py-4" : "h-14"}`;

  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-800">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        {options ? (
          <>
            <select
              id={name}
              name={name}
              required={required}
              defaultValue=""
              className={`${base} cursor-pointer appearance-none pr-12 invalid:text-gray-400`}
            >
              <option value="" disabled>
                {placeholder ?? "Select"}
              </option>
              {options.map((o) => (
                <option key={o} value={o} className="text-ink">
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-700"
            />
          </>
        ) : rows ? (
          <textarea id={name} name={name} rows={rows} required={required} placeholder={placeholder} className={base} />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={base}
          />
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = shown ? "animate-reveal" : "opacity-0";
const loading = status === "loading";
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const phone = (f.phone ?? "").trim();
    const data = {
      name: `${f.first_name ?? ""} ${f.last_name ?? ""}`.trim(),
      email: f.email,
      phone: phone ? `${f.dial} ${phone}` : "",
      company: [f.company, f.site].map((v) => (v ?? "").trim()).filter(Boolean).join(" - "),
      service: f.service,
      message: f.message,
      website: f.website ?? "", // honeypot: must stay empty
    };

    try {
      await apiPost("/contact", data);
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <>
    <section ref={ref} id="contact" className="p-2 mb-8">
      <div className="rounded-[24px] bg-surface">
        <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px] px-4">
          <div className="lg:pt-[180px] pt-[120px]">
            <div className={`rounded-[28px] w-full xl:max-w-full ml-auto ${reveal}`} style={{ backgroundColor: DARK, animationDelay: "150ms" }}>
              <div className="gap-3 px-4 py-8">
                <h1 className="text-3xl xl:text-4xl mb-3 font-light tracking-tight text-white">Contact Us</h1>
                <p className="text-sm leading-relaxed text-white/80">
                  Have a question about DAN or want to work together? Drop us a line below, and our team will get back to you shortly.
                </p>
              </div>

              <div className="mx-2 mb-2 rounded-3xl bg-white py-6 px-4 xl:px-9">
                {status === "success" ? (
                  <div className="flex min-h-[420px] animate-reveal flex-col items-center justify-center text-center" role="status">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-ink">
                      <Check size={26} strokeWidth={2.5} />
                    </span>
                    <h4 className="mt-6 text-2xl font-medium text-ink">Thanks, we got your message</h4>
                    <p className="mt-2 max-w-xs text-sm text-gray-500">
                      Our team will get back to you within one working day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm text-gray-600 underline underline-offset-4 transition-colors hover:text-ink"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-7">
                    <div>
                      <label htmlFor="first_name" className="mb-2 block text-sm font-medium text-gray-800">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input id="first_name" name="first_name" required placeholder="First Name" autoComplete="given-name" className={`${BOX} h-14`} />
                        <input id="last_name" name="last_name" placeholder="Last Name" aria-label="Last name" autoComplete="family-name" className={`${BOX} h-14`} />
                      </div>
                    </div>

                    <div className="grid gap-x-4 gap-y-6">
                      <Field label="Email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-800">Phone</label>
                        <div className="flex gap-2">
                          <div className="relative w-[112px] shrink-0">
                            <select name="dial" aria-label="Country code" defaultValue="+91" className={`${BOX} h-14 cursor-pointer appearance-none pl-4 pr-8`}>
                              {DIAL_CODES.map(([iso, code]) => (
                                <option key={iso} value={code}>
                                  {iso} {code}
                                </option>
                              ))}
                            </select>
                            <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700" />
                          </div>
                          <input id="phone" name="phone" type="tel" inputMode="tel" placeholder="98765 43210" autoComplete="tel-national" className={`${BOX} h-14 min-w-0 flex-1`} />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
                      <Field label="Company Name" name="company" required placeholder="Your company" autoComplete="organization" />
                      <Field label="Website" name="site" placeholder="https://" autoComplete="url" />
                    </div>

                    <Field label="Subject" name="service" required options={CONTACT_SERVICES} placeholder="— Select Choice —" />
                    <Field label="Message" name="message" rows={5} required placeholder="Tell us about your project." />

                    {/* Honeypot: bots bharte hain, insaan nahi */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                    <p aria-live="polite" className={`text-sm text-red-600 ${status === "error" ? "" : "sr-only"}`}>
                      {status === "error" ? error : ""}
                    </p>

                

                    <button type="submit" disabled={loading} className="group relative flex h-14 w-full items-center overflow-hidden rounded-2xl bg-charcoal p-1 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal disabled:cursor-wait">
                      {/* Lime box: hover, focus ya loading pe poori width mein phail jaata hai */}
                      <span
                        aria-hidden="true"
                        className={`absolute left-1 top-1 h-12 overflow-hidden rounded-[14px] bg-primary transition-[width] duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:w-[calc(100%-8px)] group-focus-visible:w-[calc(100%-8px)] motion-reduce:transition-none ${
                          loading ? "w-[calc(100%-8px)]" : "w-12"
                        }`}
                      >
                        {/* Text jo box ke andar dikhta hai */}
                        <span
                          className={`absolute inset-y-0 left-0 right-12 flex items-center justify-center whitespace-nowrap text-night transition duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none ${
                            loading ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                          }`}
                        >
                          {loading ? "Sending..." : "Send message"}
                        </span>

                        {/* Arrow ya spinner: hamesha right end ke 48px square mein */}
                        <span className="absolute inset-y-0 right-0 flex w-12 items-center justify-center">
                          {loading ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-night border-t-transparent" />
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12H19M13 6L19 12L13 18" stroke="var(--color-night)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                      </span>

                      {/* Normal text: beech mein, hover pe fade hokar nikal jaata hai */}
                      <span
                        className={`pointer-events-none absolute inset-0 flex items-center justify-center pl-12 transition duration-500 group-hover:translate-x-6 group-hover:opacity-0 group-focus-visible:translate-x-6 group-focus-visible:opacity-0 motion-reduce:transition-none ${
                          loading ? "opacity-0" : ""
                        }`}
                      >
                        {loading ? "Sending..." : "Send message"}
                      </span>
                    </button>

                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        <ResourceCards />
      </div>
    </section>
</>
  );
}