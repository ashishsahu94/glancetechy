"use client";

import { useEffect, useRef, useState } from "react";

import {
  BrowsersIcon,
  ChartLineUpIcon,
  HeadsetIcon,
  StarIcon,
} from "@phosphor-icons/react";

import type {
  Icon as PhosphorIcon,
  IconWeight,
} from "@phosphor-icons/react";

const BASE = {
  x: 10,
  y: -15,
};

/* =========================================================
   HERO TILT
========================================================= */

type HeroTiltProps = {
  children: React.ReactNode;
};

export function HeroTilt({ children }: HeroTiltProps) {
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
      const rect = section.getBoundingClientRect();

      const nx =
        ((e.clientX - rect.left) / rect.width) * 2 - 1;

      const ny =
        ((e.clientY - rect.top) / rect.height) * 2 - 1;

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
    <section ref={sectionRef}>
      {children}

      {/* 
        IMPORTANT:
        imageRef ko actual image par attach karna hai.
        Isliye children ke through ref pass karna possible nahi hai.
      */}
    </section>
  );
}


/* =========================================================
   STATS
========================================================= */

type Stat = {
  icon: PhosphorIcon;
  iconStyle: string;
  weight?: IconWeight;
  label: string;
  to?: number;
  decimals?: number;
  suffix?: string;
  text?: string;
};

const stats: Stat[] = [
  {
    icon: BrowsersIcon,
    iconStyle: "bg-indigo-100 text-indigo-600",
    to: 120,
    suffix: "+",
    label: "Website Projects",
  },
  {
    icon: StarIcon,
    iconStyle: "bg-amber-100 text-amber-500",
    weight: "fill",
    to: 90,
    suffix: "%",
    label: "Client Satisfaction",
  },
  {
    icon: ChartLineUpIcon,
    iconStyle: "bg-lime-100 text-lime-700",
    to: 3.5,
    decimals: 1,
    suffix: "x",
    label: "Average Growth",
  },
  {
    icon: HeadsetIcon,
    iconStyle: "bg-sky-100 text-sky-600",
    text: "24/7",
    label: "Support",
  },
];


/* =========================================================
   COUNT UP
========================================================= */

function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(id);
    }

    let raf = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;

        started = true;
        observer.disconnect();

        const start = performance.now();
        const duration = 1400;

        const tick = (now: number) => {
          const progress = Math.min(
            (now - start) / duration,
            1
          );

          // easeOutCubic
          const eased =
            1 - Math.pow(1 - progress, 3);

          setValue(to * eased);

          if (progress < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setValue(to);
          }
        };

        raf = requestAnimationFrame(tick);
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}


/* =========================================================
   STATS
========================================================= */

export function Stats() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = gridRef.current;

    if (!element) return;


    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShown(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            style={{
              transitionDelay: `${index * 120}ms`,
            }}
            className={`
              rounded-2xl
              bg-slate-50
              p-6
              transition-all
              duration-700
              ease-out
              motion-reduce:transition-none
              ${
                shown
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }
            `}
          >
            <span
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                ${stat.iconStyle}
              `}
            >
              <Icon
                size={24}
                weight={stat.weight ?? "duotone"}
              />
            </span>

            <p className="mt-4 text-4xl font-medium tracking-tight text-ink">
              {stat.to !== undefined ? (
                <CountUp
                  to={stat.to}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              ) : (
                stat.text
              )}
            </p>

            <p className="mt-1 text-xs text-gray-600">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}