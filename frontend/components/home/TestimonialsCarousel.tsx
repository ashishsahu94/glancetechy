"use client";
// components/TestimonialsCarousel.tsx  (purane Testimonials.tsx ka client hissa, ab props se data leta hai)
// npm i lucide-react | globals.css mein `.animate-reveal` keyframe chahiye
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BookOpen, ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

const palette = [
  "bg-violet-100 text-violet-700",
  "bg-lime-100 text-lime-800",
  "bg-sky-100 text-sky-700",
];

/**
 * Where the review comes from (admin field "Review Source").
 * Put the official logo of each platform in  public/assets/reviews/<key>.svg
 * (or .png - change LOGO_EXT). Until a logo file exists, a brand-coloured
 * letter badge is shown instead, so nothing breaks.
 */
const LOGO_DIR = "/assets/reviews";
const LOGO_EXT = "svg";

/** Where "Read more" goes for Google reviews that have no own link.
 *  Replace with your Google Business Profile reviews link. */
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=GlanceTechy+Lucknow";

const reviewLink = (t: Testimonial): string | undefined =>
  t.source_url?.trim() || (t.source?.toLowerCase() === "google" ? GOOGLE_REVIEWS_URL : undefined);

const SOURCES: Record<string, { label: string; letter: string; color: string; readMore?: string }> = {
  google:     { label: "Google Review",  letter: "G",  color: "#4285F4", readMore: "Read more on Google" },
  freelancer: { label: "Freelancer.com", letter: "F",  color: "#29B2FE" },
  upwork:     { label: "Upwork",         letter: "U",  color: "#14A800" },
  fiverr:     { label: "Fiverr",         letter: "Fi", color: "#1DBF73" },
  clutch:     { label: "Clutch",         letter: "C",  color: "#EF4335" },
  linkedin:   { label: "LinkedIn",       letter: "in", color: "#0A66C2" },
  facebook:   { label: "Facebook",       letter: "f",  color: "#1877F2" },
  whatsapp:   { label: "WhatsApp",       letter: "W",  color: "#25D366" },
  direct:     { label: "Direct client",  letter: "D",  color: "#475569" },
};

function SourceBadge({ source }: { source?: string }) {
  const [noLogo, setNoLogo] = useState(false);
  const key = source?.toLowerCase() ?? "";
  const s = SOURCES[key];
  if (!s) return null;

  return (
    <span
      className="inline-flex h-8 items-center gap-2 rounded-full border bg-white pl-2 pr-3 text-[11px] font-semibold"
      style={{ borderColor: `${s.color}55`, color: s.color }}
      title={`Review from ${s.label}`}
    >
      {noLogo ? (
        <span
          aria-hidden="true"
          className="flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none text-white"
          style={{ backgroundColor: s.color }}
        >
          {s.letter}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${LOGO_DIR}/${key}.${LOGO_EXT}`}
          alt={`${s.label} logo`}
          title={s.label}
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
          onError={() => setNoLogo(true)}
        />
      )}
      {s.label}
    </span>
  );
}

/** Long reviews are cut to 6 lines with a Read more / Show less button.
 *  The full text always stays in the HTML, so nothing is lost for SEO. */
const CLAMP_AFTER = 230; // characters
function ReviewQuote({
  text,
  hidden,
  href,
  linkLabel,
  onToggle,
}: {
  text: string;
  hidden: boolean;
  href?: string;
  linkLabel: string;
  onToggle: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const long = text.length > CLAMP_AFTER;
  return (
    <>
      <blockquote
        className={`mt-6 text-[17px] leading-relaxed text-ink ${long && !open ? "line-clamp-6" : ""}`}
      >
        {text}
      </blockquote>
      {long && href && (
        // A link to the original review exists: send the visitor there.
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : 0}
          className="relative mt-3 inline-block cursor-pointer text-sm font-semibold text-primary-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {linkLabel} <span aria-hidden="true">&#8599;</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {long && !href && (
        <button
          type="button"
          tabIndex={hidden ? -1 : 0}
          aria-expanded={open}
          onClick={() => {
            setOpen(!open);
            onToggle(!open);
          }}
          className="mt-3 cursor-pointer text-sm font-semibold text-primary-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </>
  );
}

const GAP = 24; // gap-6
const INSTANT = "instant" as ScrollBehavior;

const initials = (name?: string | null) => {
  if (!name) return "GT";

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export default function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const N = items.length;
  // Itni copies ki desktop pe bhi scroll ho sake (kam testimonials mein bhi)
  const copies = N ? Math.max(2, Math.ceil((N + 3) / N)) : 0;
  const list = Array.from({ length: copies }).flatMap(() => items);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const lockRef = useRef(false);
  const openRef = useRef(0); // how many reviews are expanded (autoplay waits)
  const [shown, setShown] = useState(false);

  const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const measure = () => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card || !N) return null;
    const step = card.offsetWidth + GAP;
    return { el, step, period: step * N };
  };

  // Infinite loop: set ke aakhir pe bina dikhe wapas shuru pe jump
  const onScroll = () => {
    const m = measure();
    if (!m || lockRef.current) return;
    if (m.el.scrollLeft >= m.period - 2) {
      m.el.scrollTo({ left: m.el.scrollLeft - m.period, behavior: INSTANT });
    }
  };

  const go = (dir: 1 | -1) => {
    const m = measure();
    if (!m) return;
    const { el, step, period } = m;
    if (dir === -1 && el.scrollLeft < 4) {
      lockRef.current = true;
      el.scrollTo({ left: period, behavior: INSTANT });
      setTimeout(() => (lockRef.current = false), 800);
    }
    el.scrollBy({ left: dir * step, behavior: prefersReduced() ? "auto" : "smooth" });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto slide: har 4 sec mein agla card
  useEffect(() => {
    if (!shown || prefersReduced()) return;
    const id = setInterval(() => {
      if (pausedRef.current || openRef.current > 0 || document.hidden) return;
      go(1);
    }, 4000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, N]);

  if (!N) return null;

  const reveal = shown ? "animate-reveal" : "opacity-0";
  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-[12px] border border-gray-200 bg-charcoal text-white transition cursor-pointer hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <section
      ref={sectionRef}
      className="px-2 py-10"
      aria-label="Client testimonials"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = true)}
      onBlur={() => (pausedRef.current = false)}
      onTouchStart={() => (pausedRef.current = true)}
      onTouchEnd={() => (pausedRef.current = false)}
    >
      <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]">
        <div className="flex items-end justify-between gap-6">
          <div className={reveal}>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-200/70 px-3 py-1.5 text-sm text-gray-700">
              <BookOpen size={15} />
              Client Reviews
            </span>
            <h3 className="mt-5 max-w-[700px] text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Our Client Success Stories
            </h3>
            <p className="mt-3 max-w-[700px] text-base text-gray-600">From growing businesses to established brands, GlanceTechy helps companies build better websites, embrace AI, and strengthen their online presence. Discover how our digital solutions turn ideas into meaningful business growth.</p>
          </div>

          <div className={`flex gap-3 ${reveal}`} style={{ animationDelay: "100ms" }}>
            <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className={arrow}>
              <ArrowLeft size={18} />
            </button>
            <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className={arrow}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          tabIndex={0}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto p-2 pb-6 [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink [&::-webkit-scrollbar]:hidden"
        >
          {list.map((t, i) => (
            <figure key={`${t.id}-${i}`} aria-hidden={i >= N} style={{ animationDelay: `${200 + (i % N) * 150}ms` }} className={`${reveal} flex w-[85%] shrink-0 snap-start flex-col justify-between rounded-3xl border border-slate-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] motion-reduce:transition-none`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-ink">
                    <Quote size={20} className="text-white" />
                  </span>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={16} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <SourceBadge source={t.source} />
                  </div>
                </div>
                <ReviewQuote
                  text={t.quote}
                  hidden={i >= N}
                  href={reviewLink(t)}
                  linkLabel={SOURCES[t.source?.toLowerCase() ?? ""]?.readMore ?? "Read full review"}
                  onToggle={(o) => (openRef.current = Math.max(0, openRef.current + (o ? 1 : -1)))}
                />
              </div>

              <figcaption className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-5">
                {t.avatar ? (
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={t.avatar}
                      alt={`Photo of ${t.name}${t.role ? `, ${t.role}` : ""}, GlanceTechy client`}
                      title={t.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </span>
                ) : (
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${palette[(i % N) % palette.length]}`}>
                    {initials(t.name)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}