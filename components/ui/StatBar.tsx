"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/components/cn";

type StatBarProps = {
  label: string;
  value: number;
  colorClassName?: string;
  className?: string;
  delay?: number;
  rankDescriptions?: { [key: number]: string };
};

const defaultRankDescriptions: { [key: number]: string } = {
  20: "Rank 1: Novice",
  40: "Rank 2: Intermediate",
  60: "Rank 3: Proficient",
  75: "Rank 4: Advanced",
  85: "Rank 5: Master",
  95: "Rank 6: Expert",
  100: "Rank 7: Legendary",
};

function getRankDescription(value: number, descriptions: { [key: number]: string }): string {
  const sortedKeys = Object.keys(descriptions).map(Number).sort((a, b) => a - b);
  for (const key of sortedKeys) {
    if (value <= key) {
      return descriptions[key];
    }
  }
  return descriptions[sortedKeys[sortedKeys.length - 1]] || "Unknown Rank";
}

export function StatBar({
  label,
  value,
  colorClassName = "bg-brand-main",
  className,
  delay = 0,
  rankDescriptions = defaultRankDescriptions,
}: StatBarProps) {
  const [isHovering, setIsHovering] = useState(false);
  const clampedValue = Math.max(0, Math.min(100, value));
  const rankText = getRankDescription(clampedValue, rankDescriptions);

  return (
    <motion.div
      className={cn("space-y-2 relative", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 0.8,
        delay,
      }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {/* Rank Tooltip */}
      <motion.div
        className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none z-20"
        animate={{ opacity: isHovering ? 1 : 0, y: isHovering ? 0 : -8 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="bg-brand-bg border-2 border-brand-accent px-3 py-2 whitespace-nowrap text-xs font-hand uppercase tracking-wider text-brand-main font-bold drop-shadow-lg"
          style={{
            clipPath: 'polygon(4% 0%, 100% 0%, 96% 8%, 100% 25%, 98% 100%, 0% 100%, 0% 25%, 2% 8%)',
          }}
        >
          {rankText}

          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-l-transparent border-r-transparent border-t-brand-bg" />
        </div>
      </motion.div>

      <div className="flex items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-brand-accent/75">
        <span data-p5interactive="true" className="cursor-help">{label}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.3 }}
        >
          {clampedValue}%
        </motion.span>
      </div>

      <div className="relative h-3 overflow-hidden border border-brand-accent/80 bg-brand-bg [clip-path:polygon(3%_0%,100%_0%,97%_100%,0%_100%,0%_18%)] sm:h-4">
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