"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function TextAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll(".text-anim");

    elements.forEach((element) => {
      const delayValue = parseFloat(
        element.getAttribute("data-delay") || "0.25"
      );

        const split = new SplitType(element, {
        types: "chars, words",
        });

      gsap.from(split.chars, {
        duration: 1,
        delay: delayValue,
        x: 20,
        opacity: 0,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}