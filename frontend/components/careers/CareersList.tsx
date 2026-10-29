import Link from "next/link";
import { ArrowUpRight, Flag, Globe, Sparkles } from "lucide-react";
import { jobs, perks } from "@/lib/careers";
import { SITE } from "@/lib/site";

const icons = { globe: Globe, flag: Flag, sparkles: Sparkles };

function mail(subject: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}

export default function CareersList() {
  return (
    <section className="mx-2 mb-2 rounded-[24px] bg-surface px-2 py-8 sm:px-4 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1100px]">
        {/* Openings + side card */}
        <div className="grid gap-4 rounded-[26px] bg-white p-2 lg:grid-cols-[1fr_360px] lg:gap-0">
          <ul className="space-y-1.5">
            {jobs.length === 0 && (
              <li className="rounded-2xl bg-surface p-8 text-gray-600">
                No open roles right now. Send us your CV and we will keep it for the next opening.
              </li>
            )}
            {jobs.map((job) => (
              <li key={job.slug} data-reveal>
                <Link
                  href={`/careers/${job.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-2xl bg-surface p-6 transition-colors duration-300 hover:bg-slate-200/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink sm:p-8"
                >
                  <div>
                    <h3 className="text-xl font-light tracking-tight text-charcoal-dark sm:text-2xl">{job.title}</h3>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {job.tags.map((t) => (
                        <li key={t} className="rounded-full bg-white px-3.5 py-1.5 text-xs text-gray-600">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-gray-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    aria-hidden="true"
                  />
                  <span className="sr-only">View details and apply</span>
                </Link>
              </li>
            ))}
          </ul>

          <aside data-reveal className="p-6 sm:p-8 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-3xl font-light tracking-tight text-charcoal-dark">Didn&apos;t find your role?</h2>
            <p className="mt-4 leading-relaxed text-gray-500">
              If you think you&apos;re a fit, we&apos;d still love to hear from you. Tell us how you could help us grow our
              clients&apos; businesses.
            </p>

            <a
              href={mail("Career enquiry")}
              className="group/btn relative mt-8 flex h-[52px] w-full items-center overflow-hidden rounded-2xl bg-surface p-1 text-sm font-medium text-ink"
            >
              <span className="absolute bottom-1 left-1 top-1 flex w-11 items-center rounded-[14px] bg-charcoal transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover/btn:w-[calc(100%-8px)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="absolute right-[13px]" aria-hidden="true">
                  <path d="M5 12H19M13 6L19 12L13 18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute right-12 translate-x-3 whitespace-nowrap text-white opacity-0 transition-all duration-500 group-hover/btn:translate-x-0 group-hover/btn:opacity-100">
                  Email us
                </span>
              </span>
              <span className="relative z-10 flex-1 pl-10 text-center transition-all duration-500 group-hover/btn:translate-x-6 group-hover/btn:opacity-0">
                Email us
              </span>
            </a>
            <p className="mt-4 text-xs text-gray-400">{SITE.email}</p>
          </aside>
        </div>

        {/* Perks */}
        <ul className="mt-4 grid gap-6 rounded-[26px] bg-white p-6 sm:grid-cols-3 sm:p-8">
          {perks.map((p) => {
            const Icon = icons[p.icon];
            return (
              <li key={p.title} data-reveal className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-night">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block font-medium text-ink">{p.title}</span>
                  <span className="block text-sm text-gray-500">{p.text}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-center text-sm text-gray-500">
          Want to know more about us first?{" "}
          <Link href="/about" className="underline underline-offset-4 hover:text-ink">
            About GlanceTechy
          </Link>
        </p>
      </div>
    </section>
  );
}
