import type { PropsWithChildren } from "react";
import { cn } from "@/components/cn";

type P5ContainerProps = PropsWithChildren<{
  className?: string;
}>;

/**
 * P5 — "Rebellious Collage" container.
 *
 * Renders a 3-layer shard stack as explicit DOM nodes so we can
 * independently rotate/offset each layer without fighting ::before/::after:
 *
 *   Layer 1 — Black shard (bottom) : rotate(-2deg) translate(+8px, +8px)
 *   Layer 2 — White shard (mid)    : rotate(+1deg) translate(+4px, +4px)
 *   Layer 3 — Red  shard (top)     : no rotation, sits flush, hosts content
 *
 * The red shard carries the halftone dot pattern (.p5-halftone) plus the
 * content children.
 */
export function P5Container({ className, children }: P5ContainerProps) {
  return (
    <div className={cn("relative", className)}>
      {/* ── Layer 1: Black shard (bottom shadow) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 clip-jagged bg-brand-bg"
        style={{ transform: "translate(8px, 8px) rotate(-2deg)", zIndex: 0 }}
      />

      {/* ── Layer 2: White shard (mid highlight) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 clip-jagged bg-brand-accent"
        style={{ transform: "translate(4px, 4px) rotate(1deg)", zIndex: 1 }}
      />

      {/* ── Layer 3: Red shard (top — hosts content) ── */}
      <section
        className={cn(
          "relative clip-jagged overflow-hidden",
          "bg-brand-main text-brand-bg",
          "border-2 border-brand-accent/70",
        )}
        style={{ zIndex: 2 }}
      >
        {/* Halftone dot texture */}
        <div
          aria-hidden="true"
          className="p5-halftone absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Radial ambient glow from top-left */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 8% 12%, rgba(235,230,230,0.22) 0%, transparent 35%)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="relative" style={{ zIndex: 2 }}>
          {children}
        </div>
      </section>
    </div>
  );
}
