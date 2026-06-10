"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    hoverEffect: any;
  }
}

export default function HoverEffectClient() {
  useEffect(() => {
    const initHoverEffect = () => {
      if (document.querySelector(".portfolio-tab-wrap")) return;

      const items = document.querySelectorAll<HTMLElement>(".shape-hover-img");

      items.forEach((el) => {
        const img = el.querySelector<HTMLImageElement>("img");
        if (!img) return;

        const createEffect = () => {
          if (!window.hoverEffect) return;

          const effect = new window.hoverEffect({
            parent: el,
            intensity: Number(el.dataset.intensity) || 0.6,
            speedIn: Number(el.dataset.speedin) || 1,
            speedOut: Number(el.dataset.speedout) || 1,
            displacementImage: el.dataset.displacement,
            image1: img.src,
            image2: img.src,
            imagesRatio: img.naturalHeight / img.naturalWidth,
            hover: false,
          });

          const hoverItem = el.closest(".shape-hover-item");

          hoverItem?.addEventListener("mouseenter", () => effect.next());
          hoverItem?.addEventListener("mouseleave", () => effect.previous());
        };

        if (img.complete) {
          createEffect();
        } else {
          img.addEventListener("load", createEffect, { once: true });
        }
      });
    };

    initHoverEffect();
  }, []);

  return null;
}