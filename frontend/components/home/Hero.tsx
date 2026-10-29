"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  CodeXml,
  SearchCheck,
  Sparkles,
  BarChart3,
  Gauge,
  Sprout,
  ArrowUpRight,
} from "lucide-react";
import GlobalExpertise from "./Globalexpertise";
import TrustedSince from "./Trustedsince";

const BASE = {
  x: 10,
  y: -15,
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imageRef.current;

    if (!section || !img) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const target = { ...BASE };
    const current = { ...BASE };

    let raf = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      img.style.transform = `
        perspective(1030px)
        rotateX(${current.x}deg)
        rotateY(${current.y}deg)
      `;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();

      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;

      target.y = nx * 15;
      target.x = -ny * 10;
    };

    const onLeave = () => {
      target.x = BASE.x;
      target.y = BASE.y;
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);

      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="p-2">
      <div className="rounded-[24px] bg-surface">
        <div className="mx-auto flex w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px] px-4 sm:px-6">
          <div className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">

            {/* LEFT */}
            <div className="flex flex-col items-start justify-center pt-28 pb-2 sm:pt-32 sm:pb-6 lg:pb-40 lg:pt-[150px]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-gray-800">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                  <path d="M8.25 6 H20.25" />
                  <path d="M8.25 12 H20.25" />
                  <path d="M8.25 18 H20.25" />
                  <circle cx="4.125" cy="6" r="1.125" fill="currentColor" stroke="none"/>
                  <circle cx="4.125" cy="12" r="1.125" fill="currentColor" stroke="none"/>
                  <circle cx="4.125" cy="18" r="1.125" fill="currentColor" stroke="none"/>
                </svg>

                Trusted Digital Agency
              </span>

              <h1 className="mt-6 text-[2rem] font-bold leading-[1.15] tracking-tight text-gray-900 min-[400px]:text-4xl sm:text-5xl xl:text-5xl">
                Website Development, AI Integration
                <span className="block font-normal">
                  & Digital Growth
                </span>
              </h1>

              <p className="mt-5 text-base text-gray-500 sm:mt-6 sm:text-lg">
              Connect with the world’s top digital solutions. GlanceTechy simplifies the process of finding the right website development, AI integration, SEO, and digital marketing solutions to grow your business.
              </p>
           

              {/* BUTTONS */}
              <div className="mt-7 flex w-full flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-10 sm:gap-6">

                <Link href="/marketplace" className="group relative flex h-[56px] w-full items-center min-[480px]:w-[270px] overflow-hidden rounded-2xl bg-charcoal p-1 text-sm text-white" >
                  <span className="absolute left-1 top-1 flex h-12 w-12 items-center rounded-[14px] bg-primary transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:w-[calc(100%-8px)]">

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

                    <span className="absolute right-14 translate-x-3 whitespace-nowrap text-night opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      START YOUR PROJECT
                    </span>
                  </span>

                  <span className="relative z-10 ml-[70px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">
                    START YOUR PROJECT
                  </span>
                </Link>

                <Link
                  href="/services"
                  className="group relative flex h-[56px] w-full items-center min-[480px]:w-[270px] overflow-hidden rounded-2xl bg-white p-1 text-sm font-medium text-night"
                >
                  <span className="absolute left-1 top-1 flex h-12 w-12 items-center rounded-[14px] bg-surface transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:w-[calc(100%-8px)]">

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-4"
                    >
                      <path
                        d="M5 12H19M13 6L19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="absolute right-14 translate-x-3 whitespace-nowrap opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      EXPLORE OUR WORK
                    </span>
                  </span>

                  <span className="relative z-10 ml-[70px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">
                    EXPLORE OUR WORK
                  </span>
                </Link>
              </div>

       
            </div>

            {/* RIGHT */}
            <div className="relative mx-auto mb-6 w-full max-w-[520px] lg:mb-0 lg:max-w-none">

              <Image
                src="/assets/images/banner/hero-human.webp"
                alt="Website Development, AI Integration & Digital Growth"
                width={300}
                height={400}
                title="Glancetechy"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[5/6] w-full rounded-3xl object-cover sm:aspect-square lg:aspect-auto"
                priority
              />

              <div className="absolute left-3 top-3 origin-top-left scale-[.8] sm:left-[10%] sm:top-[12%] sm:scale-100">
                <GlobalExpertise />
              </div>

              <div className="absolute bottom-4 left-3 origin-bottom-left scale-[.8] sm:bottom-auto sm:left-0 sm:top-[40%] sm:origin-center sm:scale-100">
                <TrustedSince />
              </div>

              <div className="absolute bottom-4 right-3 w-36 animate-float rounded-2xl border border-gray-100 bg-white p-3 shadow-lg sm:bottom-auto sm:right-0 sm:top-1/4 sm:w-48 sm:p-4 hidden md:block">

                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                    <BarChart3 size={14} />
                  </span>

                  <span className="text-xs font-semibold text-gray-800">
                    Website Traffic
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-100 text-lime-700">
                    <Sprout size={14} />
                  </span>

                  <span className="text-2xl font-bold tracking-tight text-gray-900">
                    +68%
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="ml-auto text-lime-600"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}