
import type { CoverArt } from "@/lib/types";
import type { ReactNode } from "react";

const bg = (id: string, from: string, to: string) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={from} />
        <stop offset="1" stopColor={to} />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill={`url(#${id})`} />
  </>
);

const arts: Record<CoverArt, ReactNode> = {
  seo: (
    <>
      {bg("c-seo", "#0f2d2b", "#134e4a")}
      <g fill="var(--color-accent-strong)">
        <rect x="90" y="190" width="38" height="60" rx="8" opacity=".5" />
        <rect x="145" y="160" width="38" height="90" rx="8" opacity=".7" />
        <rect x="200" y="125" width="38" height="125" rx="8" opacity=".85" />
        <rect x="255" y="85" width="38" height="165" rx="8" />
      </g>
      <circle cx="130" cy="95" r="34" fill="none" stroke="#fff" strokeWidth="8" />
      <line x1="154" y1="119" x2="180" y2="145" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
    </>
  ),

  speed: (
    <>
      {bg("c-speed", "#1e1b4b", "#4338ca")}
      <rect x="80" y="60" width="240" height="170" rx="16" fill="#fff" opacity=".95" />
      <rect x="80" y="60" width="240" height="26" rx="16" fill="#e0e7ff" />
      <path d="M150 190 A50 50 0 0 1 250 190" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
      <path d="M150 190 A50 50 0 0 1 232 152" fill="none" stroke="var(--color-accent-strong)" strokeWidth="12" strokeLinecap="round" />
      <line x1="200" y1="190" x2="228" y2="160" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="200" cy="190" r="8" fill="var(--color-ink)" />
    </>
  ),

  ppc: (
    <>
      {bg("c-ppc", "#3b1d0e", "#c2410c")}
      <circle cx="200" cy="150" r="96" fill="#fff" opacity=".12" />
      <circle cx="200" cy="150" r="70" fill="#fff" opacity=".2" />
      <circle cx="200" cy="150" r="44" fill="#fff" opacity=".9" />
      <circle cx="200" cy="150" r="20" fill="var(--color-accent-strong)" />
      <line x1="200" y1="150" x2="288" y2="62" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <polygon points="288,62 262,66 284,88" fill="#fff" />
    </>
  ),

  social: (
    <>
      {bg("c-social", "#2e1065", "#7c3aed")}
      <g stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".8">
        <line x1="130" y1="150" x2="270" y2="90" />
        <line x1="130" y1="150" x2="270" y2="210" />
      </g>
      <circle cx="130" cy="150" r="34" fill="var(--color-accent-strong)" />
      <circle cx="270" cy="90" r="26" fill="#fff" />
      <circle cx="270" cy="210" r="26" fill="#fff" />
    </>
  ),

  email: (
    <>
      {bg("c-email", "#082f49", "#0369a1")}
      <rect x="105" y="90" width="190" height="125" rx="16" fill="#fff" />
      <polyline points="105,102 200,170 295,102" fill="none" stroke="#0369a1" strokeWidth="8" strokeLinejoin="round" />
      <circle cx="295" cy="90" r="20" fill="var(--color-accent-strong)" />
    </>
  ),

  content: (
    <>
      {bg("c-content", "#1c1917", "#57534e")}
      <rect x="130" y="45" width="140" height="210" rx="14" fill="#fff" />
      <rect x="152" y="75" width="70" height="12" rx="6" fill="var(--color-ink)" />
      <rect x="152" y="105" width="96" height="8" rx="4" fill="#cbd5e1" />
      <rect x="152" y="125" width="96" height="8" rx="4" fill="#cbd5e1" />
      <rect x="152" y="145" width="70" height="8" rx="4" fill="#cbd5e1" />
      <rect x="152" y="175" width="96" height="26" rx="8" fill="var(--color-accent-strong)" />
    </>
  ),

  ecommerce: (
    <>
      {bg("c-ecommerce", "#064e3b", "#10b981")}
      <rect x="85" y="72" width="230" height="166" rx="18" fill="#fff" />
      <rect x="85" y="72" width="230" height="30" rx="12" fill="#d1fae5" />
      <circle cx="105" cy="87" r="4" fill="#059669" />
      <circle cx="119" cy="87" r="4" fill="#059669" />
      <rect x="105" y="119" width="75" height="75" rx="10" fill="#a7f3d0" />
      <path d="M124 145h37l-4 31h-29z" fill="#047857" />
      <path d="M132 145a10 10 0 0 1 20 0" fill="none" stroke="#047857" strokeWidth="4" />
      <rect x="194" y="124" width="95" height="10" rx="5" fill="#d1d5db" />
      <rect x="194" y="144" width="70" height="8" rx="4" fill="#e5e7eb" />
      <rect x="194" y="164" width="85" height="8" rx="4" fill="#e5e7eb" />
      <rect x="194" y="185" width="70" height="27" rx="8" fill="#059669" />
      <path d="M208 198l5 5 10-11" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  uiux: (
    <>
      {bg("c-uiux", "#831843", "#ec4899")}
      <rect x="65" y="55" width="190" height="190" rx="18" fill="#fff" />
      <rect x="85" y="75" width="150" height="65" rx="10" fill="#fce7f3" />
      <circle cx="120" cy="107" r="18" fill="#ec4899" />
      <rect x="149" y="91" width="65" height="8" rx="4" fill="#be185d" />
      <rect x="149" y="108" width="48" height="6" rx="3" fill="#f9a8d4" />
      <rect x="85" y="155" width="65" height="65" rx="10" fill="#fbcfe8" />
      <rect x="162" y="155" width="73" height="10" rx="5" fill="#e5e7eb" />
      <rect x="162" y="175" width="62" height="7" rx="3" fill="#e5e7eb" />
      <rect x="162" y="194" width="73" height="26" rx="8" fill="#db2777" />
      <path d="M270 100l8 8 16-20" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="290" cy="205" r="25" fill="#fff" opacity=".2" />
    </>
  ),

  geo: (
    <>
      {bg("c-geo", "#422006", "#d97706")}
      <circle cx="200" cy="140" r="86" fill="#fff" opacity=".12" />
      <circle cx="200" cy="140" r="58" fill="none" stroke="#fff" strokeWidth="5" opacity=".9" />
      <ellipse cx="200" cy="140" rx="26" ry="58" fill="none" stroke="#fff" strokeWidth="4" />
      <path d="M145 120h110M145 160h110" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M200 54l12 18-12 18-12-18z" fill="#fde68a" />
      <circle cx="200" cy="140" r="12" fill="#fef3c7" />
      <path d="M230 190l20 20 42-48" fill="none" stroke="#fde68a" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  performance: (
    <>
      {bg("c-performance", "#172554", "#2563eb")}
      <rect x="75" y="55" width="250" height="190" rx="18" fill="#fff" opacity=".96" />
      <rect x="98" y="78" width="105" height="10" rx="5" fill="#cbd5e1" />
      <rect x="98" y="100" width="65" height="7" rx="3" fill="#e2e8f0" />
      <rect x="98" y="173" width="32" height="48" rx="6" fill="#93c5fd" />
      <rect x="142" y="148" width="32" height="73" rx="6" fill="#60a5fa" />
      <rect x="186" y="124" width="32" height="97" rx="6" fill="#3b82f6" />
      <rect x="230" y="103" width="32" height="118" rx="6" fill="#2563eb" />
      <path d="M100 153l48-20 40 8 65-52" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M238 89h15v15" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="285" cy="80" r="12" fill="#86efac" />
    </>
  ),
};

export default function Cover({
  art,
  className = "",
}: {
  art: CoverArt;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {arts[art]}
    </svg>
  );
}