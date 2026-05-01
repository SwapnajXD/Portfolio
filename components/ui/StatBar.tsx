"use client";

import { motion } from "framer-motion";
import { cn } from "@/components/cn";

type StatBarProps = {
  label: string;
  value: number;
  colorClassName?: string;
  className?: string;
  delay?: number;
};

export function StatBar({
  label,
  value,
  colorClassName = "bg-p5-red",
  className,
  delay = 0,
}: StatBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <motion.div
      className={cn("space-y-2", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 0.8,
        delay,
      }}
    >
      <div className="flex items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-p5-white/75">
        <span>{label}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.3 }}
        >
          {clampedValue}%
        </motion.span>
      </div>

      <div className="relative h-3 overflow-hidden border border-p5-white/80 bg-p5-black [clip-path:polygon(3%_0%,100%_0%,97%_100%,0%_100%,0%_18%)] sm:h-4">
        <motion.div
          className={cn(
            "absolute inset-y-0 left-0 [clip-path:polygon(2%_0%,100%_0%,96%_100%,0%_100%,0%_12%)]",
            colorClassName,
          )}
          initial={{ width: "0%" }}
          animate={{ width: `${clampedValue}%` }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 1,
            delay: delay + 0.1,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(235,230,230,0.18)_0%,transparent_18%,transparent_82%,rgba(13,13,13,0.28)_100%)] opacity-80" />
      </div>
    </motion.div>
  );
}