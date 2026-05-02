import type { PropsWithChildren } from "react";
import { cn } from "@/components/cn";

type P3ContainerProps = PropsWithChildren<{
  className?: string;
  /** Controls the organic border-radius variant. Defaults to "md". */
  bubble?: "sm" | "md" | "lg";
}>;

/**
 * P3 — "Liquid Glass" container.
 *
 * Material stack:
 *   - backdrop-filter: blur(16px)                 ← frosted glass
 *   - background: rgba(8, 40, 80, 0.20)           ← cyan-900/20
 *   - border: 2px shimmering silver gradient      ← .p3-shimmer-border ::before
 *   - box-shadow: pulsing cyan glow               ← .p3-glow-pulse keyframe
 *   - border-radius: non-uniform / organic        ← .p3-bubble-{sm|md|lg}
 *
 * Inner shine: a top-edge highlight replicates the "glass refraction" look.
 */
export function P3Container({ className, children, bubble = "md" }: P3ContainerProps) {
  const bubbleClass = `p3-bubble-${bubble}` as const;

  return (
    <section
      className={cn(
        // Material
        "p3-glass",          // bg + blur + base glow-pulse shadow
        // Shimmer border via ::before pseudo-element
        "p3-shimmer-border",
        // Organic shape
        bubbleClass,
        // Typography colour
        "text-brand-accent",
        "relative overflow-hidden",
        className,
      )}
    >
      {/* ── Top-edge shine (glass refraction highlight) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-0 h-px"
        style={{
          width: "84%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 35%, rgba(0,209,255,0.8) 50%, rgba(255,255,255,0.55) 65%, transparent 100%)",
          filter: "blur(0.5px)",
        }}
      />

      {/* ── Cyan ambient scatter (inner light) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(0,209,255,0.12) 0%, transparent 55%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
