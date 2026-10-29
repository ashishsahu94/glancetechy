// lib/scroll.ts - one helper for programmatic scrolling.
// Uses the smooth-scroll engine (Lenis) when it is running, native scrolling otherwise.
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scroll to the top of an element (with an optional pixel offset) or to a Y position. */
export function scrollToTarget(target: HTMLElement | number, offset = 0) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate: reduced() });
    return;
  }
  const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: top + offset, behavior: reduced() ? "auto" : "smooth" });
}
