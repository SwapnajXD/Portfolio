import type { PropsWithChildren } from "react";
import { cn } from "@/components/cn";

type P5ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function P5Container({ className, children }: P5ContainerProps) {
  return (
    <section
      className={cn(
        "relative clip-jagged overflow-hidden border-2 border-brand-accent/90 bg-brand-bg text-brand-accent",
        "before:absolute before:inset-0 before:-z-10 before:translate-x-2 before:translate-y-2 before:bg-brand-main before:content-['']",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(235,230,230,0.12),transparent_30%),linear-gradient(135deg,var(--brand-glow)_0%,transparent_28%,transparent_72%,rgba(235,230,230,0.08)_100%)]" />
      {children}
    </section>
  );
}
