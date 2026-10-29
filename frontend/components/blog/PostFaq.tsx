"use client";
// Per-post FAQ. Admin writes it in the "FAQ" field as:
//   Q: Question?
//   A: Answer.
// (blank line between pairs). Renders an accordion and FAQPage JSON-LD.
import { useId, useState } from "react";
import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: string };

export function parseFaqs(raw?: string | null): FaqItem[] {
  if (!raw) return [];
  const text = raw.replace(/\r\n?/g, "\n");
  const re = /(?:^|\n)[ \t]*Q[:.)-][ \t]*([\s\S]+?)\n[ \t]*A[:.)-][ \t]*([\s\S]*?)(?=\n[ \t]*Q[:.)-]|\s*(?![\s\S]))/gi;
  const out: FaqItem[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const q = m[1].replace(/\s+/g, " ").trim();
    const a = m[2].trim();
    if (q && a) out.push({ q, a });
  }
  return out;
}

export default function PostFaq({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  if (!faqs.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby={`${uid}-h`} className="mt-14 scroll-mt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <p className="text-sm font-medium uppercase tracking-wider text-primary-dark">FAQ</p>
      <h2 id={`${uid}-h`} className="mt-2 text-3xl font-semibold tracking-tight text-ink">
        Frequently asked questions
      </h2>

      <div className="mt-6 space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`rounded-2xl border transition-colors ${
                isOpen ? "border-primary/60 bg-white shadow-sm" : "border-slate-200 bg-soft"
              }`}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-p${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink sm:text-lg"
                >
                  {f.q}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-primary" : ""
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>
              </h3>
              <div
                id={`${uid}-p${i}`}
                role="region"
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="whitespace-pre-line px-5 pb-5 text-base leading-relaxed text-muted">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
