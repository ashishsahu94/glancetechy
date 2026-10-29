"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Plus } from "lucide-react";
import FAQHEADER from "./faqheader";
import { usePathname } from "next/navigation";



const categories = [
  {
    name: "General",
    items: [
      {
        q: "What services do you offer?",
        a: "We design and build websites and run digital marketing: SEO, social media, paid ads, email marketing and content writing. You can hire us for one service or a full package.",
      },
      {
        q: "How long does it take to build a website?",
        a: "Most business websites take 2 to 4 weeks, depending on the number of pages and features. We share a clear timeline before we start.",
      },
      {
        q: "Do you work with small businesses and startups?",
        a: "Yes. Most of our clients are small businesses and startups, and we shape every plan around your budget and goals.",
      },
    ],
  },
  {
    name: "Websites",
    items: [
      {
        q: "Will my website work on mobile?",
        a: "Yes. Every website we build is responsive and tested on phones, tablets and desktops.",
      },
      {
        q: "Can I update the website myself?",
        a: "Yes. We set up a simple editor so you can change text and images, and we show you how in a short walkthrough.",
      },
      {
        q: "Do you provide hosting and maintenance?",
        a: "We can host your site and handle updates, backups and security, or hand everything over to you. It is your choice.",
      },
    ],
  },
  {
    name: "Marketing & SEO",
    items: [
      {
        q: "How long does SEO take to show results?",
        a: "SEO is a steady process. Most sites start to see clear movement in 3 to 6 months, and we share progress with you every month.",
      },
      {
        q: "Will I get reports?",
        a: "Yes. You get a simple monthly report with traffic, leads and what we plan to do next, in plain language.",
      },
      {
        q: "Do you manage my ad budget?",
        a: "We plan and run your campaigns, but the ad accounts and budget stay in your name, so you are always in control.",
      },
    ],
  },
  {
    name: "Pricing & Support",
    items: [
      {
        q: "How much does a project cost?",
        a: "It depends on the scope. Book a free call, tell us what you need, and we will send a clear quote with no hidden fees.",
      },
      {
        q: "Are there long-term contracts?",
        a: "No lock-in for marketing services. You can pause or stop with a short notice.",
      },
      {
        q: "What support do you offer after launch?",
        a: "Every project includes free support after launch, and you can add a monthly care plan for ongoing help.",
      },
    ],
  },
];

function Person() {
  return (
    <svg viewBox="0 0 300 320" className="h-full w-auto" aria-hidden="true">
      <circle cx="150" cy="160" r="135" fill="#ecfccb" />
      <path d="M30 320 Q40 235 150 225 Q260 235 270 320 Z" fill="#334a7a" />
      <rect x="132" y="190" width="36" height="45" rx="14" fill="#e8b48f" />
      <circle cx="150" cy="120" r="70" fill="#2b1a14" />
      <circle cx="96" cy="142" r="30" fill="#2b1a14" />
      <circle cx="204" cy="142" r="30" fill="#2b1a14" />
      <ellipse cx="150" cy="136" rx="48" ry="56" fill="#f1c4a1" />
      <path d="M100 120 Q110 72 150 74 Q196 76 200 120 Q170 94 100 120Z" fill="#2b1a14" />
      <circle cx="132" cy="134" r="4" fill="#2b1a14" />
      <circle cx="168" cy="134" r="4" fill="#2b1a14" />
      <path d="M130 160 Q150 178 170 160" fill="none" stroke="#b45a47" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}


export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [cat, setCat] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

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

  const items = categories[cat].items;

  const pathname = usePathname();
  const isFAQPage = pathname?.replace(/\/+$/, "") === "/faq";
  return (
    <section  id="faq" className="py-16">
      <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]">
          {!isFAQPage && <FAQHEADER />}
        {/* Body */}
        <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-[288px_minmax(0,1fr)] lg:gap-2">
          {/* LEFT: sticky tabs */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              role="tablist"
              aria-label="FAQ categories"
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              {categories.map((c, i) => {
                const active = i === cat;
                return (
                  <button
                    key={c.name}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setCat(i);
                      setOpen(0);
                    }}
                    className={`shrink-0 whitespace-nowrap rounded-xl px-6 py-4 text-left text-lg transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink lg:py-5 ${
                      active
                        ? "bg-surface text-gray-800"
                        : "text-gray-400 hover:text-gray-700 max-lg:bg-white/50"
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: accordion + CTA */}
          <div className="flex flex-col gap-1.5">
            {/* key badalne se items dobara animate hote hain */}
            <div key={cat} className="flex flex-col gap-1.5" role="tabpanel">
              {items.map((item, i) => {
                const isOpen = open === i;
                const id = `faq-${cat}-${i}`;
                return (
                  <div
                    key={item.q}
                    className="animate-reveal rounded-2xl bg-surface"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`${id}-btn`}
                        aria-expanded={isOpen}
                        aria-controls={`${id}-panel`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-6 rounded-2xl px-7 py-7 text-left text-xl font-light text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink sm:px-9 sm:text-2xl"
                      >
                        {item.q}
                        <Plus
                          size={24}
                          strokeWidth={1.4}
                          className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                            isOpen ? "rotate-45 text-gray-700" : "text-gray-400"
                          }`}
                        />
                      </button>
                    </h3>
                    <div
                      id={`${id}-panel`}
                      role="region"
                      aria-labelledby={`${id}-btn`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[60ch] px-7 pb-8 text-lg leading-relaxed text-gray-600 sm:px-9">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA card */}
            <div className="relative mt-1.5 min-h-[320px] overflow-hidden rounded-2xl bg-surface p-7 sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 py-1 pl-1 pr-4 text-sm text-gray-700">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                  <MessageCircle size={14} />
                </span>
                Let&apos;s connect
              </span>
              <h3 className="mt-10 max-w-sm text-2xl font-light text-ink">
                Still have questions? We&apos;re here to help.
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600">
                Not sure which plan fits your business? Tell us about your goals and our team will guide you, free of
                cost.
              </p>
              <Link
                href="/#contact"
                className="group mt-6 inline-flex items-center gap-4 rounded-2xl bg-muted p-1.5 pr-6 text-sm font-medium text-white transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-ink">
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                </span>
                Contact us
              </Link>

              {/* Photo ho to <Image> se replace kar do */}
              <div className="absolute bottom-0 right-4 hidden h-[88%] sm:block lg:right-10">
                <Person />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}