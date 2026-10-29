import Image from "next/image";
import Link from "next/link";
import {BookOpen, Check } from "lucide-react";

const points = [
  "Custom Website Design & Development",
  "SEO and Digital Marketing Backed by Data",
  "Clear, Affordable Pricing",
  "A Support Team That Actually Replies",
];

const metrics = [
  { label: "Performance", dot: "bg-teal-400" },
  { label: "Accessibility", dot: "bg-teal-300" },
  { label: "Best Practices", dot: "bg-emerald-400" },
  { label: "SEO", dot: "bg-orange-300" },
];

const SCORE = 98;
const R = 26;
const CIRC = 2 * Math.PI * R;

export default function WhyChooseUs() {
  return (
    <section className="px-2 py-16">
      <div className="mx-auto grid w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px] items-center gap-10 overflow-hidden rounded-3xl bg-surface p-8 lg:grid-cols-2 lg:p-14">
        {/* LEFT */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                <BookOpen size={14} />
              </span>
              Why Choose Us
            </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Why Businesses Choose GlanceTechy
          </h2>
          <p className="mt-2 max-w-md text-base text-gray-500">
            We bring together design excellence, advanced technology, and performance marketing <span className="text-black"> so your website actively grows your business.</span>
          </p>

          <ul className="mt-6 space-y-3.5 mb-10">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-white">
                  <Check size={13} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <Link href="/about" className="group relative flex h-[56px] w-[195px] items-center overflow-hidden rounded-2xl bg-charcoal p-1 text-sm font-medium text-white">
            {/* Moving Icon Box */}
            <span className="absolute left-1 top-1 flex h-12 w-12 items-center rounded-[14px] bg-primary transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:left-1 group-hover:right-auto group-hover:w-[calc(100%-8px)]">
                {/* Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-4 transition-all duration-500">
                <path d="M5 12H19M13 6L19 12L13 18" stroke="var(--color-night)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                {/* Text inside moving icon box */}
                <span className="absolute right-14 whitespace-nowrap translate-x-3 text-night opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 ">
                Learn More
                </span>
            </span>

            {/* Normal Text */}
            <span className="relative z-10 ml-[70px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">
                Learn More
            </span>
            </Link>
        </div>

        {/* RIGHT */}
        <div className="relative mx-auto h-[380px] w-full max-w-[560px] sm:h-[420px]">
          {/* Laptop image: apni image public/assets/macbook.png mein rakho */}
          <Image
            src="/assets/project/macbook.webp"
            alt="Website dashboard on a laptop"
            width={640}
            height={600}
            title="Website dashboard"
            className="absolute bottom-0 right-0 h-auto w-[100%] max-w-[740px]"
          />

          {/* Performance card */}
          <div className="animate-float absolute right-[80] top-0 z-10 w-72 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:right-35">
            <h3 className="text-sm font-semibold text-ink">Website Performance</h3>
            <div className="mt-3 flex items-center gap-5">
              <div className="relative h-16 w-16 shrink-0">
                <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
                  <circle cx="32" cy="32" r={R} fill="none" stroke="#e6f6f2" strokeWidth="5" />
                  <circle
                    cx="32"
                    cy="32"
                    r={R}
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={CIRC * (1 - SCORE / 100)}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-ink">
                  {SCORE}
                </span>
              </div>
              <ul className="space-y-1.5">
                {metrics.map(({ label, dot }) => (
                  <li key={label} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className={`h-2 w-2 rounded-full ${dot}`} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Handwritten note + arrow (top right) */}
          <div className="absolute -top-2 right-0 hidden text-right sm:block" aria-hidden="true">
            <p className="text-sm leading-tight text-gray-700" style={{ fontFamily: "Caveat, cursive" }}>
              More Traffic
              <br />
              More Sales
            </p>
            <svg width="70" height="50" viewBox="0 0 70 50" fill="none" className="-ml-6 mt-1 text-lime-500">
              <path d="M62 4 C 66 24, 40 38, 8 40 M8 40 L 18 32 M8 40 L 19 46" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Loop arrow pointing to laptop (left) */}
          <svg
            width="110"
            height="50"
            viewBox="0 0 110 50"
            fill="none"
            className="absolute bottom-50 left-0 hidden text-lime-500 md:block"
            aria-hidden="true"
          >
            <path d="M4 34 C 28 46, 46 30, 38 20 C 32 12, 22 22, 34 32 C 56 48, 84 40, 104 22 M104 22 L 92 22 M104 22 L 100 34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}