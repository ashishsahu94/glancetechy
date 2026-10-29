"use client";
// components/layout/SmoothScroll.tsx
// Smooth mouse-wheel / trackpad scrolling for the whole site (Lenis).
// - Not used in the admin area, and not when the visitor asked for reduced motion.
// - Pauses while the page is locked (body overflow hidden: page loader, menus).
// - Touch devices keep their native scrolling.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
// import "@/lib/scroll"; // adds the window.__lenis type

export default function SmoothScroll() {
  const pathname = usePathname();
  const enabled = !pathname.startsWith("/admin");

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1, // lower = smoother and slower, higher = snappier
      smoothWheel: true,
      anchors: true, // <a href="#section"> links scroll smoothly too
      autoRaf: true,
    });
    window.__lenis = lenis;

    // Stop smooth scrolling while something locks the page scroll.
    const syncLock = () => (document.body.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    syncLock();
    const mo = new MutationObserver(syncLock);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      mo.disconnect();
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [enabled]);

  return null;
}
