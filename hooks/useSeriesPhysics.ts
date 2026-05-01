'use client';

import { useEffect } from "react";
import { useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import type { Series } from "@/context/ThemeContext";

// ─── Spring Configs ────────────────────────────────────────────────────────────

/**
 * P5: Aggressive, snappy, high-stiffness jitter.
 * Mimics the mechanical snap of Persona 5's UI elements.
 */
export const p5SpringConfig = {
  stiffness: 400,
  damping: 12,
  mass: 0.2,
} as const;

/**
 * P3: Fluid, weighted, slow — like floating in water.
 * Lower stiffness means the cursor "catches up" lazily,
 * and higher damping prevents over-oscillation.
 */
export const p3SpringConfig = {
  stiffness: 60,
  damping: 20,
  mass: 0.6,
} as const;

// ─── Hover Animation Variants ─────────────────────────────────────────────────

export const p5HoverVariants = {
  idle: {
    scale: 1,
    filter: "drop-shadow(0 0 0px var(--brand-main))",
    opacity: 1,
  },
  hovering: {
    scale: 1.3,
    opacity: [1, 0.6, 1],
    filter: [
      "drop-shadow(0 0 0px var(--brand-main))",
      "drop-shadow(0 0 8px var(--brand-main))",
      "drop-shadow(0 0 0px var(--brand-main))",
    ],
  },
} as const;

export const p3HoverVariants = {
  idle: {
    scale: 1,
    filter: "drop-shadow(0 0 6px rgba(0, 209, 255, 0.4))",
    opacity: 0.85,
  },
  hovering: {
    scale: 1.18,
    opacity: [0.85, 1, 0.85],
    filter: [
      "drop-shadow(0 0 6px rgba(0, 209, 255, 0.4))",
      "drop-shadow(0 0 16px rgba(0, 209, 255, 0.9))",
      "drop-shadow(0 0 6px rgba(0, 209, 255, 0.4))",
    ],
  },
} as const;

// ─── Sine-Wave Float Hook (P3 Liquid) ────────────────────────────────────────

/**
 * Returns a Framer Motion MotionValue that continuously oscillates on the Y axis,
 * simulating the gentle sine-wave bobbing of an object floating in water.
 *
 * @param amplitude - Peak displacement in pixels (default: 4px)
 * @param period    - Full cycle duration in milliseconds (default: 2400ms)
 * @param enabled   - When false, the value stays at 0 (use for P5 mode)
 */
export function useFloatY(
  amplitude = 4,
  period = 2400,
  enabled = true,
) {
  const rawY = useMotionValue(0);

  useAnimationFrame((t) => {
    if (!enabled) {
      rawY.set(0);
      return;
    }
    // sin produces a value in [-1, 1]; multiply by amplitude
    rawY.set(Math.sin((t / period) * 2 * Math.PI) * amplitude);
  });

  return rawY;
}

// ─── Unified Series Physics Hook ──────────────────────────────────────────────

/**
 * Returns the spring config and float motion value appropriate for the
 * currently active Series. Drop this into any interactive component to
 * get the correct physics with zero branching in the component itself.
 */
export function useSeriesPhysics(series: Series) {
  const isP3 = series === "P3";

  const springConfig = isP3 ? p3SpringConfig : p5SpringConfig;
  const hoverVariants = isP3 ? p3HoverVariants : p5HoverVariants;
  const floatY = useFloatY(isP3 ? 4 : 0, 2400, isP3);

  return { springConfig, hoverVariants, floatY, isP3 };
}
