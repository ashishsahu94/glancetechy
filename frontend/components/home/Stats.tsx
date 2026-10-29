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
    label: "Websites Designed & Launched",
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
    label: "Average Traffic Growth",
  },
  {
    icon: HeadsetIcon,
    iconStyle: "bg-sky-100 text-sky-600",
    text: "24/7",
    label: "Customer Support",
  },
];

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
    const el = ref.current;

    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(id);
    }

    let raf = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();

        const start = performance.now();
        const duration = 1400;

        const tick = (now: number) => {
          const p = Math.min(
            (now - start) / duration,
            1
          );

          const eased = 1 - Math.pow(1 - p, 3);

          setValue(to * eased);

          if (p < 1) {
            raf = requestAnimationFrame(tick);
          }
        };

        raf = requestAnimationFrame(tick);
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(el);

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

export default function Stats() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = gridRef.current;

    if (!el) return;


    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-2 py-16">
      <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]">

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-200/70 px-3 py-1.5 text-sm text-gray-700">
            <span>●</span>
            Our Impact
          </span>

          <h3 className="text-2xl mt-5 font-semibold tracking-tight text-ink sm:text-3xl">
            Digital Results That Drive Business Growth
          </h3>

          <p className="mt-3 text-base text-gray-600">
            Empowering Brands with Technology, Creativity, and Measurable Results.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map(
            (
              {
                icon: Icon,
                iconStyle,
                weight = "duotone",
                label,
                to,
                decimals,
                suffix,
                text,
              },
              i
            ) => (
              <div
                key={label}
                style={{
                  transitionDelay: `${i * 120}ms`,
                }}
                className={`rounded-2xl bg-surface p-6 transition duration-700 ease-out motion-reduce:transition-none ${
                  shown
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconStyle}`}
                >
                  <Icon
                    size={24}
                    weight={weight}
                  />
                </span>

                <p className="mt-4 text-4xl font-medium tracking-tight text-ink">
                  {to !== undefined ? (
                    <CountUp
                      to={to}
                      decimals={decimals}
                      suffix={suffix}
                    />
                  ) : (
                    text
                  )}
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  {label}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}