"use client";

import { useEffect, useRef, useState } from "react";
import { ListChecks } from "lucide-react";
import Values from "@/components/home/Values";

const AUTHOR = { name: "Ashish Sahu", role: "Founder" };
const stats = [
  { to: 120, suffix: "+", label: "Projects delivered" },
  { to: 50, suffix: "+", label: "Happy clients" },
  { to: 10, suffix: "+", label: "Years of experience" },
]; 


const initials = (n?: string | null) => {
  if (!n) return "GT";

  return n
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

function CountUp({ to, suffix = "", run }: { to: number; suffix?: string; run: boolean }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setV(to));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1500, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);

  return (
    <>
      {v.toLocaleString("en-US")}
      {suffix}
    </>
  );
}

export default function Mission() {
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = shown ? "animate-reveal" : "opacity-0";

  return (
    <>
      <section ref={ref} id="about" className="p-2">
        <div className="bg-surface rounded-[24px]">
          <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px] px-4">
            <div className="grid w-full pt-32 sm:pt-[180px] pb-[80px] gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              {/* LEFT */}
              <div className="flex flex-col justify-between gap-14">
               <div className={reveal}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                      <ListChecks size={14} />
                    </span>
                    Our mission
                  </span>
                  <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink">
                    Websites That Bring You Customers, Not Just Compliments
                  </h1>
                  <p className="mt-6 text-lg text-gray-500">
                    We are a Lucknow-based team that builds fast, easy-to-use websites and backs them with SEO and digital marketing. Our goal is simple: when someone searches for what you do, they find you, and they get in touch.
                  </p>
                </div>

                <dl>
                  {stats.map((s, i) => (
                    <div key={s.label} className={`${reveal} ${i > 0 ? "border-t border-slate-300/60" : ""} py-6 first:pt-0`} style={{ animationDelay: `${200 + i * 150}ms` }}>
                      <dd className="text-5xl font-light tracking-tight text-ink">
                        <CountUp to={s.to} suffix={s.suffix} run={shown} />
                      </dd>
                      <dt className="mt-1 text-gray-500">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              {/* RIGHT: note card */}
              <div className={`${reveal} flex flex-col rounded-[28px] bg-white p-8 sm:p-8 lg:p-8 xl:p-14`} style={{ animationDelay: "150ms" }}>
                <div className="space-y-8 font-light leading-[1.55] text-gray-600 text-[1rem] md:text-[1.2rem] lg:text-[1.4rem]">
                  <p>GlanceTechy began in Lucknow in 2022. Our founder, Ashish Sahu, kept seeing the same story with local business owners: they paid for a website that looked great on launch day, and then nothing happened. No calls, no enquiries, and nobody who could explain why.</p>
                  <p>The marketing side was no better. There were reports full of numbers that nobody could connect to real sales, and agencies that went quiet whenever a result was missing. Ashish believed a business owner deserves a straight answer, in plain words, about where their money is going.</p>
                  <p>So we built GlanceTechy around one idea: web design, development, SEO and digital marketing should work together, not as separate bills from separate people. A fast, well-built website gives your marketing a solid place to send people, and good marketing gives your website people worth talking to.</p>
                  <p>We started with businesses in Lucknow and across India, and today we also work with clients around the world. The projects have grown, but the way we work has not changed. We show you what is working, what is not, and what we will do next, in words you don&apos;t need a dictionary for.</p>
                  <p>If you want a website and marketing that bring you more enquiries, calls and sales, we would be glad to hear about your business.</p>
                </div>

                <div className="mt-12 flex items-center justify-between gap-6 border-t border-slate-200 pt-8">
                  <div className="flex items-center gap-4">
                    {/* Photo ho to <Image className="h-16 w-16 rounded-full object-cover" /> lagao */}
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e26d5c] text-lg font-medium text-white">
                      {initials(AUTHOR.name)}
                    </span>
                    <div>
                      <p className="font-medium text-gray-700">{AUTHOR.name}</p>
                      <p className="text-sm text-gray-500">{AUTHOR.role}</p>
                    </div>
                  </div>

                  {/* Signature: screen pe aate hi "likha" jaata hai */}
                  <svg viewBox="0 0 140 60" fill="none" className="w-28 text-charcoal-dark sm:w-36" aria-hidden="true">
                    <path pathLength={1} d="M2 38 H70 M62 50 C 80 30, 96 10, 104 8 C 108 14, 96 40, 92 44 C 100 36, 112 30, 118 36 C 122 40, 116 44, 138 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1, strokeDashoffset: shown ? 0 : 1, transition: "stroke-dashoffset 1.6s ease-out 900ms",}}/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Values />           
    </>
  );
}