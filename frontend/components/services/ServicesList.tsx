
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import {
  EnvelopeSimpleIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  MonitorIcon,
  ShareNetworkIcon,
  TargetIcon,
  ShoppingCartIcon,
  FigmaLogoIcon,
  SparkleIcon,
  ChartLineUpIcon,
  PuzzlePieceIcon
} from "@phosphor-icons/react";

import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import Cover from "@/components/blog/Cover";
import { useInView } from "@/hooks/useInView";
import { services, type Service } from "@/lib/services";
import ShareProjectButton from "../marketplace/ShareProjectButton";

type ServiceMeta = {
  icon: PhosphorIcon;
  style: string;
  label: string;
};

const meta: Record<string, ServiceMeta> = {
  "website-design": {
    icon: MonitorIcon,
    style: "bg-violet-100 text-violet-600",
    label: "Websites",
  },
  seo: {
    icon: MagnifyingGlassIcon,
    style: "bg-lime-100 text-gray-900",
    label: "SEO",
  },
  "social-media": {
    icon: ShareNetworkIcon,
    style: "bg-indigo-100 text-indigo-600",
    label: "Social Media",
  },
  ppc: {
    icon: TargetIcon,
    style: "bg-sky-100 text-sky-600",
    label: "PPC",
  },
  "email-marketing": {
    icon: EnvelopeSimpleIcon,
    style: "bg-violet-100 text-violet-600",
    label: "Email Marketing",
  },
  "content-writing": {
    icon: FileTextIcon,
    style: "bg-cyan-100 text-cyan-600",
    label: "Content Writing",
  },
  "ecommerce-development": {
    icon: ShoppingCartIcon,
    style: "bg-emerald-100 text-emerald-600",
    label: "E-commerce",
  },
  "figma-uiux-design": {
    icon: FigmaLogoIcon,
    style: "bg-pink-100 text-pink-600",
    label: "UI/UX Design",
  },
  "geo-ai-search": {
    icon: SparkleIcon,
    style: "bg-amber-100 text-amber-700",
    label: "GEO & AI Search",
  },
  "performance-marketing": {
    icon: ChartLineUpIcon,
    style: "bg-orange-100 text-orange-600",
    label: "Performance",
  },
    "wordpress-design-development": {
    icon: PuzzlePieceIcon,
    style: "bg-blue-100 text-blue-600",
    label: "WordPress",
  },
};

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const { ref, shown } = useInView<HTMLElement>(0.12);

  // Fallback keeps the component from crashing if a service has no metadata.
  const serviceMeta = meta[s.slug] ?? {
    icon: MonitorIcon,
    style: "bg-slate-100 text-slate-600",
    label: s.title,
  };

  const { icon: Icon, style } = serviceMeta;
  const flip = i % 2 === 1;

  return (
    <article
      ref={ref}
      id={s.slug}
      className={`${
        shown ? "animate-reveal" : "opacity-0"
      } group grid scroll-mt-32 items-center gap-8 rounded-[28px] border border-surface p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-12`}
    >
      {/* Service visual */}
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${
          flip ? "lg:order-2" : ""
        }`}
      >
        <Cover
          art={s.art}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />

        <span
          className={`absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ${style}`}
        >
          <Icon size={26} weight="duotone" />
        </span>
      </div>

      {/* Service content */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {serviceMeta.label}
        </p>

        <h2 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
          {s.title}
        </h2>

        <p className="mt-3 text-lg text-gray-500">{s.tagline}</p>

        <p className="mt-5 leading-relaxed text-gray-600">
          {s.description}
        </p>

        <h3 className="mt-8 text-sm font-medium text-ink">
          What&apos;s included
        </h3>

        <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {s.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-gray-700"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Check size={12} strokeWidth={3} />
              </span>

              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <p className="mb-7 mt-8 rounded-2xl bg-slate-50 px-5 py-4 text-sm leading-relaxed text-gray-600">
          <span className="font-medium text-ink">Best for: </span>
          {s.bestFor}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {/* Get a quote button */}
        <ShareProjectButton />

        <Link
          href={`/services/${s.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
        >
          Learn more <ArrowRight size={16} />
        </Link>
        </div>
      </div>
    </article>
  );
}

export default function ServicesList() {
  const [active, setActive] = useState<string>(
    services[0]?.slug ?? ""
  );

  // Scroll spy: update active navigation item as the user scrolls.
  useEffect(() => {
    const elements = services
      .map((service) => document.getElementById(service.slug))
      .filter((element): element is HTMLElement => element !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Smooth-scroll to a service card.
  const jump = (
    event: React.MouseEvent<HTMLAnchorElement>,
    slug: string
  ) => {
    event.preventDefault();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.getElementById(slug)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });

    setActive(slug);
    window.history.replaceState(null, "", `#${slug}`);
  };

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Sticky services navigation */}
        <nav
          aria-label="Services"
          className="sticky top-24 z-20 mx-auto w-fit max-w-full overflow-x-auto rounded-2xl bg-white/85 p-1.5 shadow-sm backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex gap-1">
            {services.map((service) => {
              const isActive = active === service.slug;

              const serviceMeta = meta[service.slug] ?? {
                label: service.title,
                icon: MonitorIcon,
                style: "bg-slate-100 text-slate-600",
              };

              return (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    onClick={(event) => jump(event, service.slug)}
                    aria-current={isActive ? "location" : undefined}
                    className={`block whitespace-nowrap rounded-xl px-4 py-2.5 text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink ${
                      isActive
                        ? "bg-ink text-white"
                        : "text-gray-600 hover:bg-slate-100 hover:text-ink"
                    }`}
                  >
                    {serviceMeta.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* All service cards */}
        <div className="mt-8 space-y-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              s={service}
              i={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}