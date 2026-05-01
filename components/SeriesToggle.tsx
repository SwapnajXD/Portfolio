'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useSeriesSound } from "@/hooks/useSeriesSound";
import { SeriesTransition } from "@/components/motion/SeriesTransition";
import { cn } from "@/components/cn";

export function SeriesToggle() {
  const { currentSeries, toggleSeries } = useTheme();
  const { playHover } = useSeriesSound(currentSeries);
  const [isSwitching, setIsSwitching] = useState(false);
  const [flashSeries, setFlashSeries] = useState<"P5" | "P3" | null>(null);

  useEffect(() => {
    if (!isSwitching) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsSwitching(false);
      setFlashSeries(null);
    }, 720);

    return () => window.clearTimeout(timeout);
  }, [isSwitching]);

  const handleToggle = () => {
    if (isSwitching) {
      return;
    }

    const nextSeries = currentSeries === "P5" ? "P3" : "P5";
    setFlashSeries(nextSeries);
    setIsSwitching(true);
    playHover();

    document.body.classList.add("series-transitioning");
    window.setTimeout(() => {
      toggleSeries();
      document.body.classList.remove("series-transitioning");
    }, 240);
  };

  const isP5 = currentSeries === "P5";

  return (
    <>
      {/* Shatter (→ P5) or Ripple (→ P3) full-screen transition */}
      <SeriesTransition
        targetSeries={flashSeries}
        isActive={isSwitching}
      />

      <motion.button
        type="button"
        aria-label={`Switch to ${isP5 ? "P3" : "P5"} mode`}
        onClick={handleToggle}
        onMouseEnter={playHover}
        data-p5interactive="true"
        className={cn(
          "fixed right-5 top-5 z-[9000] flex h-16 w-[7.5rem] overflow-hidden border-2 shadow-brandGlow transition-transform",
          isP5
            ? "clip-jagged bg-brand-main text-brand-accent border-brand-accent"
            : "clip-circle bg-[linear-gradient(180deg,rgba(234,246,255,0.28),rgba(234,246,255,0.12))] text-brand-accent border-[rgba(193,226,255,0.8)] backdrop-blur-xl",
        )}
        whileHover={{ scale: 1.04, rotate: isP5 ? -3 : 3 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="relative flex h-full w-full overflow-hidden">
          <motion.span
            className={cn("absolute inset-y-0 z-0 w-1/2 bg-white/10", isP5 ? "left-0" : "left-1/2")}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
          <span className={cn("relative z-10 grid h-full w-1/2 place-items-center border-r border-current/20 transition-opacity", isP5 ? "opacity-100" : "opacity-55")}>
            <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current">
              <path d="M16 2L20 10L30 12L22 18L24 28L16 23L8 28L10 18L2 12L12 10Z" />
            </svg>
          </span>
          <span className={cn("relative z-10 grid h-full w-1/2 place-items-center transition-opacity", isP5 ? "opacity-55" : "opacity-100")}>
            <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current">
              <path d="M16 2c7.7 0 14 6.3 14 14S23.7 30 16 30 2 23.7 2 16 8.3 2 16 2Zm0 3C10 5 5 10 5 16s5 11 11 11 11-5 11-11S22 5 16 5Z" />
              <path d="M16 9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3Zm0 8c2.8 0 5.2 1.4 6.6 3.6-.8.6-3.1 1.4-6.6 1.4s-5.8-.8-6.6-1.4C10.8 18.4 13.2 17 16 17Z" />
            </svg>
          </span>
        </span>
      </motion.button>
    </>
  );
}