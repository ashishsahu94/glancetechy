"use client";
// components/Values.tsx
// npm i lucide-react
// Zaroori: globals.css mein `.animate-reveal` keyframe (pehle wala reveal-up)
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Circle, Flag, Heart, ListChecks, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const BRAND = "Glancetechy";

const values: { icon: LucideIcon; hover: string; title: string; text: string }[] = [
  {
    icon: Heart,
    hover: "group-hover:scale-110 group-hover:fill-rose-100 group-hover:text-rose-500",
    title: "Honest from the start",
    text: "Clear pricing, realistic timelines and regular updates. You always know where your website or campaign stands, and there are no surprises at the end.",
  },
  {
    icon: Circle,
    hover: "group-hover:scale-110 group-hover:fill-accent group-hover:text-ink",
    title: "Keep it simple",
    text: "Websites and digital marketing can feel confusing. We explain things in plain words and break the work into small steps, so you always know what happens next.",
  },
  {
    icon: Flag,
    hover: "group-hover:-rotate-12 group-hover:text-ink",
    title: "Your project is our responsibility",
    text: "We take care of your project from start to finish. If something can be done better, we say so and fix it, instead of defending our first idea.",
  },
  {
    icon: Rocket,
    hover: "group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink",
    title: "Fast, but never rushed",
    text: "We get your website live quickly, but only after the basics are right: speed, mobile layout and SEO setup. That way it keeps working long after launch.",
  },
];

// Party-lights jaisa bokeh background (photo ki jagah). [x, y, r, opacity, delay(ms)]
const bokeh: [number, number, number, number, number][] = [
  [60, 70, 16, 0.9, 0],
  [150, 40, 10, 0.7, 600],
  [240, 90, 22, 0.55, 1200],
  [310, 50, 12, 0.8, 300],
  [90, 160, 26, 0.35, 900],
  [210, 170, 14, 0.7, 1500],
  [290, 200, 30, 0.3, 200],
  [40, 250, 12, 0.6, 1100],
  [140, 250, 20, 0.4, 400],
  [250, 280, 10, 0.8, 1300],
  [320, 320, 18, 0.45, 700],
  [80, 340, 14, 0.5, 1000],
];

export default function Values() {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

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

  return (
    <section ref={ref} id="values" className="py-16 px-2">
      <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]">
        {/* Header */}
        <div className={`text-center ${reveal}`}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
              <ListChecks size={14} />
            </span>
            Our values
          </span>
          <h2 className="mx-auto mt-5 max-w-[600px] text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.15] tracking-tight text-charcoal-dark">
            How We Work With
            <span
              className={`inline-block rounded-2xl bg-charcoal px-4 pb-1 font-normal italic text-white transition duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                shown ? "rotate-0 scale-100 opacity-100" : "-rotate-6 scale-75 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Every Client
            </span>
            at {BRAND}
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, hover, title, text }, i) => (
            <div
              key={title}
              className={`${reveal} group flex min-h-[300px] flex-col justify-between border border-line rounded-3xl bg-white p-9 transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none lg:min-h-[310px] ${
                i === 0 || i === 1 ? "lg:col-span-1" : ""
              }`}
              style={{ animationDelay: `${150 + i * 120}ms` }}
            >
              <Icon
                size={34}
                strokeWidth={1.2}
                className={`text-gray-300 transition duration-300 motion-reduce:transition-none ${hover}`}
              />
              <div>
                <h3 className="text-2xl font-light tracking-tight text-charcoal-dark">{title}</h3>
                <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-gray-600">{text}</p>
              </div>
            </div>
          ))}

          {/* Tall CTA card */}
          <div
            className={`${reveal} relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-b from-[#2a2220] to-muted p-7 sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1`}
            style={{ animationDelay: "300ms" }}
          >
            {/* Bokeh lights: photo ho to <Image fill className="object-cover" /> se replace karo */}
            <svg
              viewBox="0 0 360 400"
              preserveAspectRatio="xMidYMin slice"
              className="absolute inset-x-0 top-0 h-[75%] w-full"
              aria-hidden="true"
            >
              <defs>
                <filter id="bk" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
              <g fill="#fcd34d" filter="url(#bk)">
                {bokeh.map(([x, y, r, o, d]) => (
                  <circle
                    key={`${x}-${y}`}
                    cx={x}
                    cy={y}
                    r={r}
                    opacity={o}
                    className="animate-pulse motion-reduce:animate-none"
                    style={{ animationDelay: `${d}ms`, animationDuration: "3.2s" }}
                  />
                ))}
              </g>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-muted via-transparent to-transparent" />

            {/* Asterisk: dheere ghoomta hai */}
            <svg
              viewBox="0 0 24 24"
              className="absolute left-7 top-7 h-6 w-6 animate-[spin_14s_linear_infinite] text-accent motion-reduce:animate-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" />
            </svg>

            <div className="relative">
              <h3 className="text-2xl font-normal text-white">Ready to work with us?</h3>
              <p className="mt-3 mb-5 max-w-[30ch] text-sm leading-relaxed text-white/85">
                Tell us about your website or marketing project and get a free quote within one working day.
              </p>

                <Link href="/contact" className="group relative flex h-[56px] w-full items-center overflow-hidden rounded-2xl bg-charcoal p-1 text-sm font-medium text-white">
                {/* Moving Icon Box */}
                <span
                    className="
                    absolute left-1 top-1
                    flex h-12 w-12
                    items-center justify-center
                    rounded-[14px]
                    bg-primary
                    transition-all duration-500
                    ease-[cubic-bezier(.4,0,.2,1)]
                    group-hover:left-1
                    group-hover:right-auto
                    group-hover:w-[calc(100%-8px)]
                    "
                >
                    {/* Icon */}
                    <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 transition-all duration-500"
                    >
                    <path
                        d="M5 12H19M13 6L19 12L13 18"
                        stroke="var(--color-night)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>

                    {/* Hover Text */}
                    <span
                    className="
                        absolute inset-0
                        flex items-center justify-center
                        whitespace-nowrap
                        text-night
                        translate-x-3
                        opacity-0
                        transition-all duration-500
                        group-hover:translate-x-0
                        group-hover:opacity-100
                    "
                    >
                    Get Free Quote
                    </span>
                </span>

                {/* Normal Text */}
                <span
                    className="
                    relative z-10 w-full
                    text-center
                    transition-all duration-500
                    group-hover:translate-x-6
                    group-hover:opacity-0
                    "
                >
                    Get Free Quote
                </span>
                </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}