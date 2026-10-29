"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

/* =========================================================
   NAV ITEMS
========================================================= */

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

/* =========================================================
   SERVICES
========================================================= */

const serviceGroups = [
  {
    title: "Website & Development",
    items: [
      {
        name: "Website Design & Development",
        description: "Fast, mobile-friendly websites that bring you enquiries",
        href: "/services/website-design",
        icon: "code",
      },
      {
        name: "E-commerce Development",
        description: "Online stores with easy checkout and secure payments",
        href: "/services/ecommerce-development",
        icon: "cart",
      },
      {
        name: "Figma UI/UX Design",
        description: "Clean app and website designs you can click through before we build",
        href: "/services/figma-uiux-design",
        icon: "design",
      },
      {
        name: "WordPress Design & Development",
        description: "Beautiful, fast WordPress websites built for your business.",
        href: "/services/wordpress-design-development",
        icon: "wordpress",
      },
    ],
  },
  {
    title: "SEO & Search",
    items: [
      {
        name: "SEO Services",
        description: "Rank higher on Google and get steady organic traffic",
        href: "/services/seo",
        icon: "search",
      },
      {
        name: "GEO & AI Search Optimization",
        description: "Help AI tools understand and mention your business",
        href: "/services/geo-ai-search",
        icon: "spark",
      },
      {
        name: "Performance Marketing",
        description: "Ad campaigns where every rupee is tracked to a result",
        href: "/services/performance-marketing",
        icon: "chart",
      },
    ],
  },
  {
    title: "Digital Marketing",
    items: [
      {
        name: "PPC & Google Ads",
        description: "Get in front of people ready to buy, and pay only for clicks",
        href: "/services/ppc",
        icon: "ads",
      },
      {
        name: "Social Media Marketing",
        description: "Regular posts, designs and replies that keep your pages active",
        href: "/services/social-media",
        icon: "social",
      },
      {
        name: "Email Marketing",
        description: "Bring past customers back with useful, timely emails",
        href: "/services/email-marketing",
        icon: "mail",
      },
      {
        name: "Content Writing",
        description: "Website and blog content that is clear and easy to find on Google",
        href: "/services/content-writing",
        icon: "content",
      },
    ],
  },
];

/* =========================================================
   SERVICE ICON
========================================================= */

function ServiceIcon({ type }: { type: string }) {
  const common = "h-[18px] w-[18px] stroke-[1.7]";

  switch (type) {
    case "code":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M8.5 8L4.5 12L8.5 16M15.5 8L19.5 12L15.5 16M13.5 5L10.5 19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "cart":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M3 4H5L7.2 14.2C7.4 15.2 8.3 16 9.4 16H17.2C18.2 16 19 15.3 19.3 14.4L21 8H6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="19" r="1" stroke="currentColor" />
          <circle cx="18" cy="19" r="1" stroke="currentColor" />
        </svg>
      );

    case "design":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M4 19.5V15L14.8 4.2C15.5 3.5 16.5 3.5 17.2 4.2L19.8 6.8C20.5 7.5 20.5 8.5 19.8 9.2L9 20H4V19.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 5.5L18.5 10.5"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      );

    case "wordpress":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M6.2 7.2L9.6 17.1L12.1 10.2L14.7 17.1L17.9 7.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 7.2H5.9M18.1 7.2H15.8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "search":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" />
          <path
            d="M16 16L21 21"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      );

    case "spark":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 16L19.7 18.3L22 19L19.7 19.7L19 22L18.3 19.7L16 19L18.3 18.3L19 16Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M4 19V5M4 19H20"
            stroke="currentColor"
            strokeLinecap="round"
          />
          <path
            d="M7 15L10.5 11.5L13 14L19 7.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "ads":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M4 8.5C4 7.67 4.67 7 5.5 7H18.5C19.33 7 20 7.67 20 8.5V15.5C20 16.33 19.33 17 18.5 17H5.5C4.67 17 4 16.33 4 15.5V8.5Z"
            stroke="currentColor"
          />
          <path
            d="M8 10.5H16M8 13.5H13"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      );

    case "social":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="4"
            stroke="currentColor"
          />
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" />
          <circle cx="17.3" cy="6.8" r="0.8" fill="currentColor" />
        </svg>
      );

    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
          />
          <path
            d="M4 7L12 13L20 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "content":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M6 3.75H14L19 8.75V20.25H6V3.75Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 3.75V9H19M9 13H16M9 16.5H16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
}

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  /* -------------------------------------------------------
     SCROLL
  ------------------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* -------------------------------------------------------
     CLOSE MENUS ON ROUTE CHANGE
  ------------------------------------------------------- */

  const [lastPathname, setLastPathname] = useState(pathname);

  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }

  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      className={`fixed inset-x-0 z-50 w-full lg:px-3 px-2 md:px-4 transition-all duration-500 ease-in-out ${
        scrolled ? "top-0 py-2.5 px-5" : "lg:top-7 top-2 py-2.5 px-5"
      }`}
      onMouseLeave={() => setMegaMenuOpen(false)}
    >
      {/* =====================================================
          SAME 1430px CONTAINER
      ====================================================== */}

      <div className="relative mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]">
        {/* ===================================================
            NAVBAR
        ==================================================== */}

        <nav
          className={`relative w-full rounded-[12px] lg:rounded-[34px] transition-all duration-500 ${
            scrolled
              ? "bg-white/85 shadow-[0_8px_35px_rgba(0,0,0,0.07)] backdrop-blur-2xl"
              : "lg:bg-transparent bg-white"
          }`}
        >
          {/* =================================================
              TOP NAV
          ================================================== */}

          <div className="flex h-[58px] items-center justify-between gap-4 px-2.5 sm:px-3">
            {/* -------------------------------------------------
                LOGO
            -------------------------------------------------- */}

            <Link
              href="/"
              className="block shrink-0"
              onMouseEnter={() => setMegaMenuOpen(false)}
              aria-label="GlanceTechy Home" title="GlanceTechy"
            >
              <Image src="/assets/all_logo/logo-on-light.svg" width={160} height={32} className="h-8 w-auto" style={{ width: "auto" }} alt="GlanceTechy" title="GlanceTechy" />
            </Link>

            {/* =================================================
                DESKTOP NAV
            ================================================== */}

            <div className="hidden items-center gap-1 lg:flex">
              {/* -------------------------------------------------
                  HOME / ABOUT / PORTFOLIO
              -------------------------------------------------- */}

              {navItems.slice(0, 3).map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setMegaMenuOpen(false)}
                    className={`group relative inline-flex h-10 items-center overflow-hidden px-3 text-[15px] font-medium ${
                      isActive ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {/* Default */}
                    <span
                      className={`block transition-all duration-300 ease-out ${
                        isActive
                          ? "-translate-y-full opacity-0"
                          : "group-hover:-translate-y-full group-hover:opacity-0"
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* Hover / Active */}
                    <span
                      className={`absolute left-3 transition-all duration-300 ease-out ${
                        isActive
                          ? "top-1/2 -translate-y-1/2"
                          : "top-full group-hover:top-1/2 group-hover:-translate-y-1/2"
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* Underline */}
                    <span
                      className={`absolute bottom-1.5 left-3 h-[2px] rounded-full bg-ink transition-all duration-300 ${
                        isActive
                          ? "w-[calc(100%-24px)]"
                          : "w-0 group-hover:w-[calc(100%-24px)]"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* =================================================
                  SERVICES BUTTON
              ================================================== */}

              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={megaMenuOpen}
                onMouseEnter={() => setMegaMenuOpen(true)}
                onFocus={() => setMegaMenuOpen(true)}
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                className={`group relative inline-flex h-10 items-center gap-1 px-3 text-[15px] font-medium ${
                  servicesActive ? "text-ink" : "text-ink-soft"
                }`}
              >
                <span>Services</span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`transition-transform duration-300 ${
                    megaMenuOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span
                  className={`absolute bottom-1.5 left-3 h-[2px] rounded-full bg-ink transition-all duration-300 ${
                    servicesActive || megaMenuOpen
                      ? "w-[calc(100%-36px)]"
                      : "w-0 group-hover:w-[calc(100%-36px)]"
                  }`}
                />
              </button>

              {/* -------------------------------------------------
                  BLOG / CONTACT
              -------------------------------------------------- */}

              {navItems.slice(3).map((item) => {
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setMegaMenuOpen(false)}
                    className={`group relative inline-flex h-10 items-center overflow-hidden px-3 text-[15px] font-medium ${
                      isActive ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    <span
                      className={`block transition-all duration-300 ease-out ${
                        isActive
                          ? "-translate-y-full opacity-0"
                          : "group-hover:-translate-y-full group-hover:opacity-0"
                      }`}
                    >
                      {item.name}
                    </span>

                    <span
                      className={`absolute left-3 transition-all duration-300 ease-out ${
                        isActive
                          ? "top-1/2 -translate-y-1/2"
                          : "top-full group-hover:top-1/2 group-hover:-translate-y-1/2"
                      }`}
                    >
                      {item.name}
                    </span>

                    <span
                      className={`absolute bottom-1.5 left-3 h-[2px] rounded-full bg-ink transition-all duration-300 ${
                        isActive
                          ? "w-[calc(100%-24px)]"
                          : "w-0 group-hover:w-[calc(100%-24px)]"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* =================================================
                DESKTOP CTA
            ================================================== */}

            <Link
              href="/marketplace"
              className="group relative hidden h-[40px] w-[185px] shrink-0 items-center overflow-hidden rounded-xl bg-white p-0.5 text-sm font-medium text-night shadow-sm lg:flex"
            >
              <span className="absolute left-0.5 top-0.5 flex h-9 w-9 items-center rounded-[9px] bg-surface transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:w-[calc(100%-4px)]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute right-2"
                >
                  <path
                    d="M5 12H19M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="absolute right-10 whitespace-nowrap translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  Get a Free Quote
                </span>
              </span>

              <span className="relative z-10 ml-[50px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">
                Get a Free Quote
              </span>
            </Link>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================== */}

           <button
  type="button"
  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
  aria-expanded={mobileMenuOpen}
  onClick={() => setMobileMenuOpen((prev) => !prev)}
  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.07] bg-white/80 text-black lg:hidden"
>
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    className="overflow-visible"
  >
    {/* Hamburger */}
    <g
      className={`transition-all duration-300 ease-in-out ${
        mobileMenuOpen
          ? "opacity-0"
          : "opacity-100"
      }`}
    >
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 12H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 17H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </g>

    {/* Close */}
    <g
      className={`origin-center transition-all duration-300 ease-in-out ${
        mobileMenuOpen
          ? "scale-100 rotate-0 opacity-100"
          : "scale-75 rotate-[-45deg] opacity-0"
      }`}
    >
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </g>
  </svg>
</button>
          </div>

          {/* =================================================
              MOBILE MENU
          ================================================== */}

          <div
            className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
              mobileMenuOpen
                ? "max-h-[calc(100vh-90px)] opacity-100"
                : "pointer-events-none max-h-0 opacity-0"
            }`}
          >
            <div className="max-h-[calc(100vh-90px)] overflow-y-auto border-t border-black/[0.06] px-2 pb-3 pt-2">
              <div className="space-y-1">
                {/* HOME */}
                <Link
                  href="/"
                  className={`flex min-h-[48px] items-center justify-between rounded-[13px] px-3.5 text-[14px] font-medium ${
                    pathname === "/"
                      ? "bg-black/[0.04] text-black"
                      : "text-black/65 hover:bg-black/[0.03]"
                  }`}
                >
                  <span>Home</span>

                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M13 6L19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                {/* ABOUT */}
                <Link
                  href="/about"
                  className={`flex min-h-[48px] items-center justify-between rounded-[13px] px-3.5 text-[14px] font-medium ${
                    pathname.startsWith("/about")
                      ? "bg-black/[0.04] text-black"
                      : "text-black/65 hover:bg-black/[0.03]"
                  }`}
                >
                  <span>About</span>

                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M13 6L19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                {/* SERVICES ACCORDION */}
                <div className="rounded-[15px] bg-black/[0.025]">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileServicesOpen((prev) => !prev)
                    }
                    className={`flex min-h-[50px] w-full items-center justify-between px-3.5 text-left text-[14px] font-medium ${
                      servicesActive ? "text-black" : "text-black/70"
                    }`}
                  >
                    <span>Services</span>

                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`transition-transform duration-300 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileServicesOpen
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-1 px-2 pb-2">
                      {serviceGroups.flatMap((group) => group.items).map(
                        (service) => (
                          <Link
                            key={service.name}
                            href={service.href}
                            className="flex items-center gap-3 rounded-[12px] px-2.5 py-2.5 transition-colors hover:bg-white"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white text-black/60 shadow-sm">
                              <ServiceIcon type={service.icon} />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block text-[13px] font-medium leading-5 text-black/80">
                                {service.name}
                              </span>

                              <span className="block truncate text-[11px] text-black/40">
                                {service.description}
                              </span>
                            </span>
                          </Link>
                        )
                      )}

                      <Link
                        href="/services"
                        className="mt-1 flex min-h-[45px] items-center justify-center rounded-[11px] bg-black px-4 text-[13px] font-medium text-white"
                      >
                        View all services
                      </Link>
                    </div>
                  </div>
                </div>

                {/* PORTFOLIO */}
                <Link
                  href="/portfolio"
                  className={`flex min-h-[48px] items-center justify-between rounded-[13px] px-3.5 text-[14px] font-medium ${
                    pathname.startsWith("/portfolio")
                      ? "bg-black/[0.04] text-black"
                      : "text-black/65 hover:bg-black/[0.03]"
                  }`}
                >
                  <span>Portfolio</span>

                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M13 6L19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                {/* BLOG */}
                <Link
                  href="/blog"
                  className={`flex min-h-[48px] items-center justify-between rounded-[13px] px-3.5 text-[14px] font-medium ${
                    pathname.startsWith("/blog")
                      ? "bg-black/[0.04] text-black"
                      : "text-black/65 hover:bg-black/[0.03]"
                  }`}
                >
                  <span>Blog</span>

                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M13 6L19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                {/* CONTACT */}
                <Link
                  href="/contact"
                  className={`flex min-h-[48px] items-center justify-between rounded-[13px] px-3.5 text-[14px] font-medium ${
                    pathname.startsWith("/contact")
                      ? "bg-black/[0.04] text-black"
                      : "text-black/65 hover:bg-black/[0.03]"
                  }`}
                >
                  <span>Contact</span>

                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M13 6L19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

              {/* MOBILE CTA */}
              <Link
                href="/contact"
                className="mt-3 flex h-[48px] w-full items-center justify-center rounded-[13px] bg-black text-[14px] font-medium text-white"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </nav>

        {/* =====================================================
            MEGA MENU
            IMPORTANT: NAV KE BAHAR
            SAME 1430px CONTAINER KE ANDAR
        ====================================================== */}

        <div
          onMouseEnter={() => setMegaMenuOpen(true)}
          className={`absolute left-0 top-[calc(100%+10px)] hidden w-full transform transition-all duration-300 lg:block ${
            megaMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="w-full rounded-[24px] border border-black/[0.06] bg-white p-3 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-2xl">
            <div className="grid grid-cols-12 gap-3">
              {/* =================================================
                  SERVICE COLUMNS
              ================================================== */}

              <div className="col-span-9 grid grid-cols-3 gap-3">
                {serviceGroups.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-[18px] bg-[#f8f8f6] p-3"
                  >
                    {/* CATEGORY */}
                    <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40">
                      {group.title}
                    </div>

                    {/* ITEMS */}
                    <div className="space-y-1">
                      {group.items.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="group/item flex items-start gap-3 rounded-[14px] p-2.5 transition-all duration-200 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)]"
                        >
                          {/* ICON */}
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white text-black/65 shadow-sm transition-all duration-200 group-hover/item:bg-primary group-hover/item:text-white">
                            <ServiceIcon type={service.icon} />
                          </span>

                          {/* TEXT */}
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13px] font-semibold leading-5 text-[#171717]">
                              {service.name}
                            </span>

                            <span className="mt-0.5 block text-[11px] leading-4 text-black/45">
                              {service.description}
                            </span>
                          </span>

                          {/* ARROW */}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="mt-2 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                          >
                            <path
                              d="M5 12H19M13 6L19 12L13 18"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* =================================================
                  FEATURED PANEL
              ================================================== */}

              <div className="col-span-3">
                <div className="relative flex h-full min-h-[282px] flex-col justify-between overflow-hidden rounded-[18px] bg-[#111111] p-5 text-white">
                  {/* Decoration */}
                  <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#18b9bf]/25 blur-2xl" />

                  <div className="absolute -bottom-14 -left-14 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

                  {/* TOP */}
                  <div className="relative">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[13px] bg-white/10">
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 3L13.8 9.2L20 11L13.8 12.8L12 19L10.2 12.8L4 11L10.2 9.2L12 3Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                      Digital Growth
                    </div>

                    <div className="mt-2 max-w-[220px] text-[22px] font-semibold leading-[1.15] tracking-[-0.03em]">
                      Get a website that brings you customers.
                    </div>

                    <p className="mt-3 max-w-[220px] text-[12px] leading-5 text-white/55">
                      Website design, SEO and digital marketing built around
                      your business goals.
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/services"
                    className="group/cta relative mt-7 inline-flex h-11 items-center justify-between rounded-[12px] bg-white px-4 text-[13px] font-semibold text-black"
                  >
                    <span>See All Services</span>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform duration-300 group-hover/cta:translate-x-1"
                    >
                      <path
                        d="M5 12H19M13 6L19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}