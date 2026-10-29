import Link from "next/link";
import type { LegalDoc } from "@/lib/legal";

const OTHER = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

/** Shared layout for Terms / Privacy / Cookie / Disclaimer pages. */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <section className="p-2">
      <div className="rounded-[24px] bg-surface px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-[180px]">
        <div className="mx-auto w-full max-w-3xl">
          <header className="animate-reveal">
            <p className="text-sm text-gray-500">Last updated: {doc.updated}</p>
            <h1 className="mt-3 text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl">
              {doc.title}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">{doc.intro}</p>
          </header>

          <nav aria-label="Legal pages" className="mt-8 flex flex-wrap gap-2 animate-reveal [animation-delay:100ms]">
            {OTHER.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={l.href === `/${doc.slug}` ? "page" : undefined}
                className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-ink hover:text-white aria-[current=page]:bg-ink aria-[current=page]:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 rounded-3xl bg-white p-6 sm:p-10">
            {doc.sections.map((s) => (
              <section key={s.title} data-reveal="fade" className="border-b border-surface py-7 first:pt-0 last:border-0 last:pb-0">
                <h2 className="text-xl font-medium text-ink sm:text-2xl">{s.title}</h2>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-gray-600 sm:text-base">
                  {s.body.map((b, i) =>
                    typeof b === "string" ? (
                      <p key={i}>{b}</p>
                    ) : (
                      <ul key={i} className="list-disc space-y-2 pl-5 marker:text-primary-dark">
                        {b.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
