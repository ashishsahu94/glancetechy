"use client";

// components/layout/Footer.tsx
// npm i lucide-react @phosphor-icons/react

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";

import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";

import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import CTA from "@/components/home/Cta";
import Agency from "./Agency";
import { SITE } from "@/lib/site";

const BRAND = SITE.name;
const INK = "var(--color-navy)";
const MINT = "var(--color-primary)";

type FooterLink = { label: string; href: string; title?: string };

const socials: { label: string; href: string; icon: PhosphorIcon }[] = [
  { label: "Instagram", href: "https://www.instagram.com/glancetechy/", icon: InstagramLogoIcon },
  { label: "Facebook", href: "https://www.facebook.com/GlanceTechy/", icon: FacebookLogoIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/glancetechy/", icon: LinkedinLogoIcon },
  { label: "X (Twitter)", href: "https://x.com/GlanceTechy/", icon: XLogoIcon },
];

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Agency",
    links: [
      { label: "About us", href: "/about", title: "Learn More About GlanceTechy" },
      // { label: "Case studies", href: "/portfolio", title: "Explore Our Website Design and Development Case Studies" },
      { label: "Careers", href: "/careers", title: "Explore Our Website Design and Development Case Studies" },
      // { label: "Testimonials", href: "/#testimonials", title: "Read Client Testimonials and Reviews" },
      { label: "Blog", href: "/blog", title: "Read Web Design, Development, SEO, and Digital Marketing Blogs" },
      { label: "Contact", href: "/contact", title: "Contact GlanceTechy for Website Design and Development Services" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services", title: "Explore Our Website Design and Development Services" },
      { label: "Projects", href: "/portfolio", title: "Explore Our Website Design and Development Projects" },
      { label: "Pricing", href: "/pricing", title: "Explore Our Website Design, Development and SEO pricing" },
      { label: "FAQ", href: "/faq", title: "Answers to Common Website Design and SEO Questions" },
    ],
  },
];

const legal: FooterLink[] = [
  { label: "Terms of Use", href: "/terms", title: "Read GlanceTechy Terms of Use" },
  { label: "Privacy Policy", href: "/privacy", title: "Read GlanceTechy Privacy Policy" },
  { label: "Cookie policy", href: "/cookies", title: "Learn About GlanceTechy Cookie Policy" },
  { label: "Disclaimer", href: "/disclaimer", title: "Read GlanceTechy Disclaimer" },
];

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    title: `Email GlanceTechy at ${SITE.email}`,
  },
  {
    icon: Phone,
    label: "Call us",
    value: SITE.phone,
    href: `tel:${SITE.phoneLink}`,
    title: `Call GlanceTechy at ${SITE.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: SITE.address,
    href: undefined as string | undefined,
    title: `GlanceTechy office location: ${SITE.address}`,
  },
];

const linkClass =
  "relative inline-block text-sm text-gray-500 transition-colors duration-300 hover:text-navy focus-visible:text-navy focus-visible:outline-none after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none";

/** The GlanceTechy ring mark (same geometry as the logo), reused as a brand motif. */
function RingMark({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="10" y1="8" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2AE4AC" />
          <stop offset="1" stopColor="#1080D0" />
        </linearGradient>
      </defs>
      <path
        d="M46.14 15.15 A22 22 0 1 0 54 32"
        stroke={`url(#${id})`}
        strokeWidth="9.5"
        strokeLinecap="round"
      />
      <circle cx="35" cy="32" r="6" fill={`url(#${id})`} />
    </svg>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      <CTA />
      

      <footer ref={ref} className="p-2 pt-0">
        <div className="relative overflow-hidden rounded-[24px] bg-surface">
          <Agency />
          {/* Soft brand motif in the corner */}
          <RingMark
            id="ft-ring-bg"
            className="pointer-events-none absolute -right-28 -top-28 h-[440px] w-[440px] opacity-[0.07]"
          />

          <div className="relative mx-auto w-full max-w-[1430px] px-6 pt-16 sm:px-10 lg:px-14">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
              {/* LEFT: about + contact */}
              <div className={reveal}>
                <p className="max-w-md text-lg font-light leading-8 text-gray-600">
                  A digital marketing agency in India offering website design,
                  development, SEO and online marketing to help businesses get
                  more customers.
                </p>

                <ul className="mt-8 max-w-md space-y-3">
                  {contacts.map(({ icon: Icon, label, value, href, title }) => {
                    const inner = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-muted transition-colors duration-300 group-hover:bg-navy group-hover:text-primary">
                          <Icon size={18} aria-hidden="true" />
                        </span>

                        <span className="min-w-0">
                          <span className="block text-[11px] uppercase tracking-wide text-gray-400">
                            {label}
                          </span>
                          <span className="block truncate text-sm font-medium text-navy">
                            {value}
                          </span>
                        </span>

                        {href && (
                          <ArrowUpRight
                            size={16}
                            aria-hidden="true"
                            className="ml-auto shrink-0 text-gray-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
                          />
                        )}
                      </>
                    );

                    const card =
                      "group flex items-center gap-3 rounded-2xl bg-white p-2.5 pr-4 shadow-sm ring-1 ring-black/5 transition duration-300 hover:shadow-md";

                    return (
                      <li key={label}>
                        {href ? (
                          <a href={href} title={title} className={card}>
                            {inner}
                          </a>
                        ) : (
                          <div title={title} className={card}>
                            {inner}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* RIGHT: link columns + social */}
              <nav
                aria-label="Footer"
                className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3"
              >
                {columns.map((col, i) => (
                  <div
                    key={col.title}
                    className={reveal}
                    style={{ animationDelay: `${(i + 1) * 100}ms` }}
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-navy">
                      {col.title}
                    </h3>
                    <ul className="mt-5 space-y-3.5">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link href={l.href} title={l.title || l.label} className={linkClass}>
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div
                  className={`${reveal} col-span-2 sm:col-span-1`}
                  style={{ animationDelay: "300ms" }}
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-navy">
                    Follow us
                  </h3>
                  <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-1">
                    {socials.map(({ label, href, icon: Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Follow GlanceTechy on ${label}`}
                          className="group flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 text-sm text-gray-600 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-0.5 hover:bg-navy hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-reduce:transition-none"
                        >
                          <Icon
                            size={20}
                            weight="regular"
                            aria-hidden="true"
                            className="shrink-0 transition-colors duration-300 group-hover:text-primary"
                          />
                          <span className="truncate">{label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>

            {/* Large wordmark with the ring mark */}
            <div aria-hidden="true" className="mt-16 select-none [container-type:inline-size]">
              <div
                className="h-[1.05em] overflow-hidden whitespace-nowrap text-[12.5cqw] font-bold leading-none tracking-[-0.05em]"
                style={{ color: INK }}
              >
                <span
                  className={`flex h-full items-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    shown ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <RingMark id="ft-ring-word" className="mr-[0.1em] h-[0.62em] w-[0.62em] shrink-0" />
                  <span>
                    {BRAND}
                    <span style={{ color: MINT }}>.</span>
                  </span>
                </span>
              </div>
            </div>

            {/* Bottom bar: copyright + legal */}
            <div
              className="flex flex-col items-center gap-3 rounded-t-2xl px-6 py-4 text-sm text-white sm:flex-row sm:justify-between"
              style={{ backgroundColor: INK }}
            >
              <p className="text-center text-white/80">
                © {new Date().getFullYear()} {BRAND}. All rights reserved.
              </p>

              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {legal.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      title={l.title || l.label}
                      className="text-white/70 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}