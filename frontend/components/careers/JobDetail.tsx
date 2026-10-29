import Link from "next/link";
import { ArrowLeft, ArrowRight, Briefcase, Clock, MapPin, Check } from "lucide-react";
import { jobs, type Job } from "@/lib/careers";
import ApplyForm from "@/components/careers/ApplyForm";

function Block({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div data-reveal>
      <h2 className="text-xl font-medium tracking-tight text-charcoal-dark sm:text-2xl">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex gap-3 leading-relaxed text-gray-600">
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-night">
              <Check size={12} strokeWidth={2.5} aria-hidden="true" />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function JobDetail({ job }: { job: Job }) {
  const meta = [
    { icon: MapPin, label: job.location },
    { icon: Briefcase, label: job.type },
    { icon: Clock, label: job.experience },
  ];

  const others = jobs.filter((j) => j.slug !== job.slug);

  return (
    <main>
      <section className="p-2">
        <div className="rounded-[24px] bg-surface">
          <div className="mx-auto w-full max-w-[1430px] px-4 pb-12 pt-32 sm:pt-[170px] sm:pb-16">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-ink"
            >
              <ArrowLeft size={16} aria-hidden="true" /> All openings
            </Link>
            <h1 className="mt-6 max-w-3xl text-4xl font-light leading-[1.1] tracking-tight text-charcoal-dark sm:text-6xl">
              {job.title}
            </h1>
            <ul className="mt-6 flex flex-wrap gap-2">
              {meta.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm text-gray-700">
                  <Icon size={14} aria-hidden="true" /> {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-2 mb-2 pt-2 sm:px-4 sm:pb-8">
        <div className="mx-auto grid w-full max-w-[1200px] gap-4 lg:grid-cols-[1fr_440px] lg:items-start">
          {/* LEFT: details */}
          <div className="space-y-10 rounded-[26px] bg-white p-6 sm:p-10">
            <div data-reveal>
              <h2 className="text-xl font-medium tracking-tight text-charcoal-dark sm:text-2xl">About the role</h2>
              <p className="mt-4 leading-relaxed text-gray-600">{job.summary}</p>
            </div>
            <Block title="What you will do" items={job.responsibilities} />
            <Block title="What we are looking for" items={job.requirements} />
            <Block title="Nice to have" items={job.niceToHave} />
          </div>

          {/* RIGHT: apply form */}
          <aside id="apply" className="rounded-[26px] bg-white p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl font-light tracking-tight text-charcoal-dark">Apply for this role</h2>
            <p className="mt-2 text-sm text-gray-500">We will reply to you by email.</p>
            <ApplyForm jobTitle={job.title} jobSlug={job.slug} />
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="px-4 pb-16">
          <div className="mx-auto w-full max-w-[1200px]">
            <h2 data-reveal className="text-2xl font-light tracking-tight text-charcoal-dark sm:text-3xl">
              Other open roles
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/careers/${o.slug}`}
                    className="flex items-center gap-4 rounded-2xl border border-surface p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">{o.title}</span>
                      <span className="mt-1 block text-sm text-gray-500">
                        {o.location} · {o.type}
                      </span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 text-gray-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}