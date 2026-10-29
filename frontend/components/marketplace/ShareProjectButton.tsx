"use client";

import { useCallback, useState } from "react";
import ProjectQuoteModal from "./ProjectQuoteModal";

/** The site's moving-icon button; opens the full-page quote form. */
export default function ShareProjectButton({ label = "Share Your Project", dark = true }: { label?: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`group relative flex h-[56px] w-[255px] items-center overflow-hidden rounded-2xl p-1 text-sm font-medium text-white ${dark ? "bg-charcoal" : "bg-charcoal-dark"}`}
      >
        <span className="absolute left-1 top-1 flex h-12 w-12 items-center rounded-[14px] bg-primary transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:left-1 group-hover:right-auto group-hover:w-[calc(100%-8px)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="absolute right-4 transition-all duration-500" aria-hidden="true">
            <path d="M5 12H19M13 6L19 12L13 18" stroke="var(--color-night)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute right-14 translate-x-3 whitespace-nowrap text-night opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            {label}
          </span>
        </span>
        <span className="relative z-10 ml-[70px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">{label}</span>
      </button>

      {open && <ProjectQuoteModal onClose={close} />}
    </>
  );
}
