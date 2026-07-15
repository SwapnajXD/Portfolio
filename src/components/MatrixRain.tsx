"use client";

import { useEffect, useRef, useState } from "react";

export default function MatrixRain() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const trigger = () => setActive(true);
    window.addEventListener("trigger-matrix-rain", trigger);
    return () => window.removeEventListener("trigger-matrix-rain", trigger);
  }, []);

  useEffect(() => {
    if (!active) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dismiss = () => setActive(false);
    const timeout = setTimeout(dismiss, 4000);
    window.addEventListener("keydown", dismiss);
    window.addEventListener("click", dismiss);

    // Full flashing rain isn't appropriate with reduced motion requested —
    // show a calm, static equivalent instead of skipping the easter egg
    // entirely.
    if (prefersReducedMotion) {
      return () => {
        clearTimeout(timeout);
        window.removeEventListener("keydown", dismiss);
        window.removeEventListener("click", dismiss);
      };
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 15;
    let columns = Math.floor(width / fontSize);
    let drops = new Array(columns).fill(1);

    const chars = "01スワップナジDEVOPSアイウエオカキクケコ$#{}<>/";

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(1);
    };
    window.addEventListener("resize", onResize);

    let frame: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#3CE07A";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("click", dismiss);
    };
  }, [active]);

  if (!active) return null;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return (
      <div
        role="status"
        className="fixed inset-0 z-[300] flex cursor-pointer flex-col items-center justify-center gap-3 bg-black font-mono text-[#3CE07A]"
      >
        <div className="text-lg">🟢 wake up, swapnaj...</div>
        <div className="text-xs text-[#3CE07A]/60">click or press any key to exit</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[300] cursor-pointer bg-black">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-[#3CE07A]/70">
        click or press any key to exit
      </div>
    </div>
  );
}
