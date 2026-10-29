"use client";
import { useEffect } from "react";

/**
 * Adds .is-visible to every [data-reveal] element when it scrolls into view
 * (see "MOTION" in globals.css). Mounted once in the root layout; also picks up
 * elements that appear later (client-side navigation, API data).
 */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const delay = el.dataset.revealDelay;
        if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
        io.observe(el);
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
