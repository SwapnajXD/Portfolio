'use client';

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type MetaverseTransitionProps = {
  children: ReactNode;
};

const shardVariants = [
  {
    initial: { x: "-140%", y: "-18%", rotate: -14, scaleX: 0.6 },
    animate: { x: "140%", y: "-12%", rotate: 8, scaleX: 1.05 },
  },
  {
    initial: { x: "-150%", y: "8%", rotate: -8, scaleX: 0.72 },
    animate: { x: "130%", y: "-2%", rotate: 12, scaleX: 1.1 },
  },
  {
    initial: { x: "-145%", y: "28%", rotate: -18, scaleX: 0.65 },
    animate: { x: "135%", y: "18%", rotate: 5, scaleX: 1.02 },
  },
  {
    initial: { x: "-160%", y: "48%", rotate: -12, scaleX: 0.7 },
    animate: { x: "150%", y: "36%", rotate: 14, scaleX: 1.08 },
  },
];

const snapTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 15,
  mass: 0.8,
};

function Shard({ index }: { index: number }) {
  const shard = shardVariants[index];
  const redFlip = index % 2 === 0;

  return (
    <motion.div
      className="absolute left-[-28vw] top-0 h-[32vh] w-[180vw] origin-left"
      initial={shard.initial}
      animate={shard.animate}
      exit={{ opacity: 0 }}
      transition={{
        ...snapTransition,
        delay: index * 0.05,
      }}
      style={{ zIndex: 50 + index }}
    >
      <div
        className="absolute inset-0 opacity-95 [clip-path:polygon(0%_30%,12%_0%,100%_12%,92%_60%,100%_100%,18%_86%,0%_100%)]"
        style={{
          background: redFlip
            ? "linear-gradient(135deg, #D92323 0%, #0D0D0D 44%, #D92323 100%)"
            : "linear-gradient(135deg, #0D0D0D 0%, #D92323 42%, #0D0D0D 100%)",
          filter: "contrast(1.15) saturate(1.2)",
        }}
      />

      <svg className="absolute inset-0 h-full w-full mix-blend-overlay opacity-35" aria-hidden="true">
        <defs>
          <filter id={`metaverse-noise-${index}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.28" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="white" filter={`url(#metaverse-noise-${index})`} />
      </svg>
    </motion.div>
  );
}

export function MetaverseTransition({ children }: MetaverseTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative min-h-screen">
        {children}

        <motion.div
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
          aria-hidden="true"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,35,35,0.14),transparent_40%),linear-gradient(135deg,rgba(13,13,13,0.92),rgba(13,13,13,0.78))] opacity-80" />
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(115deg,rgba(235,230,230,0.08)_0%,transparent_16%,transparent_84%,rgba(235,230,230,0.08)_100%)] mix-blend-screen opacity-30"
            animate={{ opacity: [0.18, 0.3, 0.2] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          />
          {shardVariants.map((_, index) => (
            <Shard key={index} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}