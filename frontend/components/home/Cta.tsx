"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ShareProjectButton from "../marketplace/ShareProjectButton";

export default function CTA() {
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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Line "draw" hoti hai: pathLength=1 ke saath dash 1 se 0
  const draw = (delay: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: shown ? 0 : 1,
    transition: `stroke-dashoffset 1.2s ease-out ${delay}ms`,
  });

  return (
    <section ref={ref} className="px-2 pb-12">
      <div
        className={`${
          shown ? "animate-reveal" : "opacity-0"
        } relative mx-auto grid w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px] items-center gap-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1e38] via-[#13142a] to-[#0b0c1a] p-8 sm:p-12 md:grid-cols-[1.15fr_1fr] md:py-14`}
      >
        {/* Soft glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        />

        {/* Text */}
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Ready to take your business forward?
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Let's Build Your Next{" "}
            <span className="text-primary">
              Digital Solution
            </span>
          </h2>
          <p className="mt-4 mb-7 max-w-[560px] leading-relaxed text-white/70 sm:text-base">
            Get in touch with GlanceTechy to discuss your project and discover how the right combination of technology and strategy can support your next stage of growth.
          </p>

          <ShareProjectButton />

        </div>

        {/* Illustration */}
        <div className="relative hidden h-[300px] md:block" aria-hidden="true">
          {/* Concentric circles */}
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025]" />
          <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035]" />
          <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/15" />

          {/* Decorations */}
          <span className="absolute left-[12%] top-[6%] h-5 w-5 rounded-full border-[3px] border-amber-400" />
          <svg viewBox="0 0 24 24" className="absolute left-[6%] top-[42%] h-6 w-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 3v18M3 12h18" />
          </svg>
          <svg viewBox="0 0 40 12" className="absolute right-[4%] top-[34%] h-3 w-10 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8c4-8 8-8 12 0s8 8 12 0 8-8 12 0" />
          </svg>
          <span className="absolute bottom-[10%] right-[12%] h-2.5 w-2.5 rounded-full bg-primary" />

          {/* Main dashboard card */}
          <div className="animate-float absolute left-1/2 top-1/2 w-[250px] -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-2xl bg-white p-4 shadow-2xl shadow-black/40">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium text-slate-500">Revenue</p>
                  <p className="text-2xl font-semibold tracking-tight text-slate-900">+60%</p>
                  <p className="text-[10px] text-slate-400">vs. last month</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                  ▲ Growth
                </span>
              </div>

              <svg viewBox="0 0 220 70" className="mt-3 h-[70px] w-full" fill="none">
                <defs>
                  <linearGradient id="cta-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2be4ac" stopOpacity=".28" />
                    <stop offset="1" stopColor="#2be4ac" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 56 C 20 52, 30 36, 50 40 S 82 58, 104 38 S 140 28, 160 24 S 200 8, 220 6 L220 70 L0 70 Z"
                  fill="url(#cta-area)"
                  style={{ opacity: shown ? 1 : 0, transition: "opacity .8s ease .8s" }}
                />
                <path
                  pathLength={1}
                  d="M0 56 C 20 52, 30 36, 50 40 S 82 58, 104 38 S 140 28, 160 24 S 200 8, 220 6"
                  stroke="#14b88a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={draw(400)}
                />
                <circle cx="220" cy="6" r="4.5" fill="#14b88a" style={{ opacity: shown ? 1 : 0, transition: "opacity .3s ease 1.5s" }} />
              </svg>
            </div>
          </div>

          {/* Floating chip: leads */}
          <div className="animate-float absolute right-[2%] top-[8%]" style={{ animationDelay: "-1.2s" }}>
            <div className="flex items-center gap-2.5 rounded-xl bg-white/95 px-3 py-2 shadow-xl shadow-black/30">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <div className="leading-tight">
                <p className="text-[10px] text-slate-500">New Leads</p>
                <p className="text-sm font-semibold text-slate-900">1,240 <span className="text-[10px] text-emerald-600">+8%</span></p>
              </div>
            </div>
          </div>

          {/* Floating chip: conversion */}
          <div className="animate-float absolute bottom-[6%] left-[4%]" style={{ animationDelay: "-2.2s" }}>
            <div className="flex items-center gap-2.5 rounded-xl bg-white/95 px-3 py-2 shadow-xl shadow-black/30">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M14 7h7v7" />
                </svg>
              </span>
              <div className="leading-tight">
                <p className="text-[10px] text-slate-500">Conversion</p>
                <p className="text-sm font-semibold text-slate-900">3.6% <span className="text-[10px] text-emerald-600">+0.4%</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
