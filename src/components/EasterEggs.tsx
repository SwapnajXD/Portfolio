"use client";

import { useEffect } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function EasterEggs() {
  useEffect(() => {
    console.log(
      "%c👋 hey, looking around?",
      "color:#F6821F;font-size:16px;font-weight:bold;font-family:monospace;"
    );
    console.log(
      "%csource's right here → %chttps://github.com/SwapnajXD/Portfolio",
      "color:#9A9DA3;font-family:monospace;font-size:12px;",
      "color:#3B82F6;font-family:monospace;font-size:12px;"
    );
    console.log(
      "%cor just say hi → %cswapnaj0806@gmail.com",
      "color:#9A9DA3;font-family:monospace;font-size:12px;",
      "color:#3B82F6;font-family:monospace;font-size:12px;"
    );
    console.log(
      "%c(psst — try the konami code)",
      "color:#9A9DA3;font-family:monospace;font-size:11px;font-style:italic;"
    );
  }, []);

  useEffect(() => {
    let position = 0;
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === KONAMI[position]) {
        position++;
        if (position === KONAMI.length) {
          window.dispatchEvent(new Event("trigger-matrix-rain"));
          position = 0;
        }
      } else {
        position = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}
