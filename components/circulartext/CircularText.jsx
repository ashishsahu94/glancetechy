"use client";

import { useEffect } from "react";

export default function CircularText() {
  useEffect(() => {
    const text = document.querySelector(".circular-text .text");

    if (text) {
      text.innerHTML = text.textContent
        ?.split("")
        .map(
          (char, i) =>
            `<span style="transform:rotate(${i * 13}deg)">${char}</span>`
        )
        .join("") || "";
    }
  }, []);

  return null;
}