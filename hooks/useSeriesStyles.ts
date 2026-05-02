import { useMemo } from "react";
import { useTheme, type Series } from "@/context/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SeriesStyleBundle = {
  /** Root wrapper — positioning, z-index, overflow */
  container: string;
  /** The main visible panel (not the shard layers) */
  panel: string;
  /** Inner content wrapper to counteract skew / clip */
  inner: string;
  /** Primary heading / title */
  heading: string;
  /** Body text */
  body: string;
  /** Interactive button */
  button: string;
  /** Divider / accent line */
  divider: string;
  /** Tag / chip element */
  chip: string;
};

// ─── P5 — Rebellious Collage ─────────────────────────────────────────────────
//
// 3-layer shard stack:
//   Layer 1 (bottom) : black, rotate -3°, translate(+6px, +6px)
//   Layer 2 (middle) : white, rotate +1.5°, translate(+3px, +3px)
//   Layer 3 (top)    : red,   no rotation   (hosts halftone + content)
//
// These layers are implemented as ::before and ::after pseudo-elements on the
// wrapper, plus the main element itself. For components that need real DOM
// nodes (e.g. no pseudo-element access), P5Container renders them explicitly.

export const p5Styles: SeriesStyleBundle = {
  container: [
    "relative",            // stacking context for shard layers
  ].join(" "),

  panel: [
    // P5 Container rendered as the three DOM nodes — see P5Container.tsx
    // These classes go on the *top* (red) layer:
    "relative z-10",
    "clip-jagged",
    "bg-brand-main",       // red shard
    "p5-halftone",         // dot texture overlay
    "border-2 border-brand-accent/60",
    "text-brand-bg",       // black text on red
    "overflow-hidden",
  ].join(" "),

  inner: "skew-x-0 space-y-4",  // content sits on top of the halftone

  heading: [
    "font-display uppercase tracking-[0.04em]",
    "p5-ransom-block",     // high-contrast black-on-white ransom slab
  ].join(" "),

  body: "font-sans text-sm leading-6 text-brand-bg/80",

  button: [
    "font-display text-xs uppercase tracking-[0.22em]",
    "bg-brand-bg text-brand-main",
    "border-2 border-brand-bg",
    "px-4 py-2",
    "clip-jagged",
    "-skew-x-6",
    "hover:bg-brand-accent hover:text-brand-bg transition-colors",
  ].join(" "),

  divider: "h-0.5 w-full bg-brand-bg/30 -skew-x-12",

  chip: [
    "font-hand text-xs uppercase tracking-[0.28em]",
    "bg-brand-bg text-brand-main",
    "px-2 py-0.5",
    "-skew-x-6",
  ].join(" "),
};

// ─── P3 — Liquid Glass ───────────────────────────────────────────────────────
//
// Material:  backdrop-filter: blur(16px), bg-cyan-900/20
// Border:    2px shimmering silver gradient via .p3-shimmer-border pseudo-elem
// Shape:     organic / non-uniform border-radius via .p3-bubble-md
// Glow:      box-shadow pulsing via .p3-glow-pulse (or .p3-glass composite)

export const p3Styles: SeriesStyleBundle = {
  container: "relative",

  panel: [
    "relative z-10",
    "p3-glass",            // backdrop-blur(16px) + bg-cyan-900/20 + glow pulse
    "p3-shimmer-border",   // animated silver gradient border via ::before
    "p3-bubble-md",        // organic non-uniform border-radius
    "overflow-hidden",
    "text-brand-accent",
  ].join(" "),

  inner: "space-y-4",

  heading: [
    "font-display uppercase tracking-[0.06em] text-brand-main",
    // Glow text shadow applied via body.p3-theme .font-display in globals.css
  ].join(" "),

  body: "font-sans text-sm leading-6 text-brand-accent/80",

  button: [
    "font-display text-xs uppercase tracking-[0.18em]",
    "bg-[rgba(0,209,255,0.12)] text-brand-main",
    "border border-[rgba(0,209,255,0.4)]",
    "rounded-full px-5 py-2",
    "hover:bg-[rgba(0,209,255,0.22)] hover:border-brand-main",
    "transition-all duration-300",
  ].join(" "),

  divider: "h-px w-full bg-[rgba(0,209,255,0.25)]",

  chip: [
    "font-hand text-xs uppercase tracking-[0.2em]",
    "bg-[rgba(0,209,255,0.12)] text-brand-main",
    "border border-[rgba(0,209,255,0.35)]",
    "rounded-full px-3 py-0.5",
  ].join(" "),
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns the complete style bundle for the currently active Series.
 * Memoised — only recomputes when `currentSeries` changes.
 *
 * Usage:
 * ```tsx
 * const s = useSeriesStyles();
 * <div className={s.panel}>
 *   <h2 className={s.heading}>Title</h2>
 *   <p className={s.body}>Text</p>
 * </div>
 * ```
 */
export function useSeriesStyles(): SeriesStyleBundle & { isP3: boolean; series: Series } {
  const { currentSeries } = useTheme();

  return useMemo(() => {
    const isP3 = currentSeries === "P3";
    const bundle = isP3 ? p3Styles : p5Styles;
    return { ...bundle, isP3, series: currentSeries };
  }, [currentSeries]);
}

/**
 * Pure function variant — useful in Server Components or outside React hooks.
 */
export function getSeriesStyles(series: Series): SeriesStyleBundle {
  return series === "P3" ? p3Styles : p5Styles;
}
