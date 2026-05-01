'use client';

import { AnimatePresence, motion } from "framer-motion";
import type { Series } from "@/context/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type TransitionProps = {
  isActive: boolean;
  onComplete?: () => void;
};

// ─── P5 Shatter Effect ────────────────────────────────────────────────────────
//
// Diagonal jagged glass shards tear across the screen from bottom-left to
// top-right, simulating a reality-breaking shatter into the Metaverse.
// Each shard has a randomised clip-path, spring velocity, and stagger delay.

const SHATTER_SHARDS = [
  {
    clip: "polygon(0% 28%, 11% 0%, 100% 8%, 92% 55%, 100% 100%, 22% 82%, 0% 100%)",
    initial: { x: "-145%", y: "-14%", rotate: -16, scaleX: 0.62 },
    animate: { x: "145%", y: "-8%", rotate: 9, scaleX: 1.06 },
    color: "var(--brand-main)", // red
    delay: 0,
  },
  {
    clip: "polygon(0% 18%, 18% 0%, 100% 14%, 88% 62%, 100% 100%, 14% 90%, 0% 100%)",
    initial: { x: "-155%", y: "6%", rotate: -10, scaleX: 0.7 },
    animate: { x: "138%", y: "-4%", rotate: 13, scaleX: 1.1 },
    color: "#0D0D0D", // black counter-shard
    delay: 0.06,
  },
  {
    clip: "polygon(0% 36%, 9% 0%, 100% 18%, 94% 52%, 100% 100%, 18% 88%, 0% 100%)",
    initial: { x: "-148%", y: "26%", rotate: -20, scaleX: 0.66 },
    animate: { x: "142%", y: "14%", rotate: 6, scaleX: 1.03 },
    color: "var(--brand-main)",
    delay: 0.04,
  },
  {
    clip: "polygon(0% 22%, 14% 0%, 100% 10%, 90% 58%, 100% 100%, 20% 86%, 0% 100%)",
    initial: { x: "-162%", y: "44%", rotate: -14, scaleX: 0.72 },
    animate: { x: "152%", y: "32%", rotate: 15, scaleX: 1.08 },
    color: "#EBE6E6", // accent flash
    delay: 0.02,
  },
] as const;

const shatterSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 14,
  mass: 0.75,
};

function ShatterShard({ shard, index }: { shard: (typeof SHATTER_SHARDS)[number]; index: number }) {
  return (
    <motion.div
      className="absolute left-[-30vw] top-0 h-[28vh] w-[190vw] origin-left"
      initial={shard.initial}
      animate={shard.animate}
      exit={{ opacity: 0 }}
      transition={{ ...shatterSpring, delay: shard.delay }}
      style={{ zIndex: 50 + index }}
    >
      {/* Main colour shard */}
      <div
        className="absolute inset-0 opacity-96"
        style={{
          clipPath: shard.clip,
          background:
            index % 2 === 0
              ? `linear-gradient(135deg, ${shard.color} 0%, #0D0D0D 48%, ${shard.color} 100%)`
              : `linear-gradient(135deg, #0D0D0D 0%, ${shard.color} 44%, #0D0D0D 100%)`,
          filter: "contrast(1.18) saturate(1.25)",
        }}
      />

      {/* Film-grain noise overlay for texture */}
      <svg
        className="absolute inset-0 h-full w-full mix-blend-overlay opacity-30"
        aria-hidden="true"
      >
        <defs>
          <filter id={`shard-noise-${index}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.3" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="white" filter={`url(#shard-noise-${index})`} />
      </svg>
    </motion.div>
  );
}

export function P5ShatterTransition({ isActive, onComplete }: TransitionProps) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isActive && (
        <motion.div
          key="p5-shatter"
          className="pointer-events-none fixed inset-0 z-[9990] overflow-hidden"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18, delay: 0.45 } }}
        >
          {/* White flashbang */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0] }}
            transition={{ duration: 0.28, times: [0, 0.2, 1] }}
            style={{ background: "radial-gradient(circle at 40% 50%, #fff 0%, var(--brand-main) 35%, #0D0D0D 80%)" }}
          />

          {/* Colour vignette overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.5, 0] }}
            transition={{ duration: 0.7, times: [0, 0.12, 0.8, 1] }}
            style={{
              background:
                "radial-gradient(circle at center, var(--brand-main), transparent 40%), linear-gradient(135deg, rgba(13,13,13,0.9), rgba(13,13,13,0.75))",
            }}
          />

          {/* Jagged shards */}
          {SHATTER_SHARDS.map((shard, i) => (
            <ShatterShard key={i} shard={shard} index={i} />
          ))}

          {/* Screen-edge vignette */}
          <motion.div
            className="absolute inset-0 mix-blend-screen opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.6, times: [0, 0.15, 1] }}
            style={{
              background:
                "linear-gradient(115deg, rgba(235,230,230,0.1) 0%, transparent 18%, transparent 82%, rgba(235,230,230,0.1) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── P3 Ripple Effect ─────────────────────────────────────────────────────────
//
// Concentric expanding rings radiate outward from the centre of the screen,
// like a stone dropped into still water. Each ring is semi-transparent cyan,
// simulating the Persona 3 Reload moonlit, watery aesthetic.

const RIPPLE_RINGS = [
  { delay: 0,    duration: 0.75, maxScale: 3.2, startOpacity: 0.7 },
  { delay: 0.10, duration: 0.80, maxScale: 4.4, startOpacity: 0.55 },
  { delay: 0.20, duration: 0.85, maxScale: 5.8, startOpacity: 0.40 },
  { delay: 0.30, duration: 0.90, maxScale: 7.4, startOpacity: 0.25 },
  { delay: 0.40, duration: 0.95, maxScale: 9.2, startOpacity: 0.14 },
] as const;

function RippleRing({ ring }: { ring: (typeof RIPPLE_RINGS)[number] }) {
  return (
    <motion.div
      className="absolute rounded-full border-2"
      style={{
        // Start as a small circle in the viewport centre
        top: "50%",
        left: "50%",
        width: 80,
        height: 80,
        marginTop: -40,
        marginLeft: -40,
        borderColor: "rgba(0, 209, 255, 0.8)",
        boxShadow: "0 0 12px 2px rgba(0, 209, 255, 0.35), inset 0 0 12px 2px rgba(0, 209, 255, 0.12)",
      }}
      initial={{ scale: 0.1, opacity: ring.startOpacity }}
      animate={{
        scale: ring.maxScale,
        opacity: 0,
        borderColor: [
          "rgba(0, 209, 255, 0.8)",
          "rgba(0, 209, 255, 0.4)",
          "rgba(0, 209, 255, 0.0)",
        ],
      }}
      transition={{
        duration: ring.duration,
        delay: ring.delay,
        ease: [0.22, 1, 0.36, 1], // custom ease-out-expo
      }}
    />
  );
}

export function P3RippleTransition({ isActive, onComplete }: TransitionProps) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isActive && (
        <motion.div
          key="p3-ripple"
          className="pointer-events-none fixed inset-0 z-[9990] overflow-hidden"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.7 } }}
        >
          {/* Deep ocean backdrop */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.82, 0.65, 0] }}
            transition={{ duration: 0.9, times: [0, 0.12, 0.8, 1] }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,209,255,0.42) 0%, rgba(7,20,35,0.95) 55%, rgba(5,11,22,1) 100%)",
            }}
          />

          {/* Glassmorphic blur lens at centre */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: ["0px", "240px", "480px", "240px"],
              height: ["0px", "240px", "480px", "240px"],
              opacity: [0, 0.9, 0.4, 0],
            }}
            transition={{ duration: 0.85, times: [0, 0.2, 0.7, 1], ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(circle, rgba(0,209,255,0.22) 0%, rgba(234,246,255,0.08) 40%, transparent 70%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(0,209,255,0.38)",
              boxShadow: "0 0 48px 12px rgba(0,209,255,0.28), inset 0 0 24px rgba(0,209,255,0.12)",
            }}
          />

          {/* Expanding ripple rings */}
          {RIPPLE_RINGS.map((ring, i) => (
            <RippleRing key={i} ring={ring} />
          ))}

          {/* Moonlight shimmer overlay */}
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0.08, 0] }}
            transition={{ duration: 0.9, times: [0, 0.15, 0.75, 1] }}
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(234,246,255,0.55) 0%, transparent 50%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Unified SeriesTransition ─────────────────────────────────────────────────
//
// Drop this single component into SeriesToggle. It reads the incoming series
// (the one being switched TO) and plays the appropriate animation.

type SeriesTransitionProps = {
  /** The series being switched INTO — drives which effect plays. */
  targetSeries: Series | null;
  isActive: boolean;
  onComplete?: () => void;
};

export function SeriesTransition({ targetSeries, isActive, onComplete }: SeriesTransitionProps) {
  if (targetSeries === "P5") {
    return <P5ShatterTransition isActive={isActive} onComplete={onComplete} />;
  }
  if (targetSeries === "P3") {
    return <P3RippleTransition isActive={isActive} onComplete={onComplete} />;
  }
  return null;
}
