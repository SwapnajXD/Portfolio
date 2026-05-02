'use client';

import type { PropsWithChildren } from "react";
import { useTheme } from "@/context/ThemeContext";
import { P5Container } from "@/components/P5Container";
import { P3Container } from "@/components/P3Container";

type AdaptiveContainerProps = PropsWithChildren<{
  className?: string;
  /** P3 only — controls organic border-radius variant */
  bubble?: "sm" | "md" | "lg";
}>;

/**
 * Drop-in container that renders the appropriate visual shell based on the
 * active Series:
 *
 *   P5  →  P5Container  (3-layer rebellious collage: black/white/red shards)
 *   P3  →  P3Container  (liquid glass: blur, shimmer border, organic rounding)
 *
 * Usage — replace any raw `<section>` or `<P5Container>` in page files:
 * ```tsx
 * <AdaptiveContainer className="p-8">
 *   <h2>Hello</h2>
 * </AdaptiveContainer>
 * ```
 */
export function AdaptiveContainer({ className, children, bubble }: AdaptiveContainerProps) {
  const { currentSeries } = useTheme();

  if (currentSeries === "P3") {
    return (
      <P3Container className={className} bubble={bubble}>
        {children}
      </P3Container>
    );
  }

  return (
    <P5Container className={className}>
      {children}
    </P5Container>
  );
}
