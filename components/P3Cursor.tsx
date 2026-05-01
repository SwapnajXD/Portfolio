'use client';

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { p5SpringConfig, useSeriesPhysics } from "@/hooks/useSeriesPhysics";

// ─── P3 Glassmorphic Oval Cursor ──────────────────────────────────────────────

export function P3Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Always track at P5 speed — the float Y animation provides the liquid feel
  const { floatY } = useSeriesPhysics("P3");
  const cursorX = useSpring(mouseX, p5SpringConfig);
  const cursorY = useSpring(mouseY, p5SpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX - 20); // offset for larger oval
      mouseY.set(e.clientY - 12);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleHoverStart = (e: Event) => {
      if ((e.target as HTMLElement)?.dataset?.p5interactive === "true") {
        setIsHovering(true);
      }
    };
    const handleHoverEnd = (e: Event) => {
      if ((e.target as HTMLElement)?.dataset?.p5interactive === "true") {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseenter", handleHoverStart, true);
    document.addEventListener("mouseleave", handleHoverEnd, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseenter", handleHoverStart, true);
      document.removeEventListener("mouseleave", handleHoverEnd, true);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`* { cursor: none; }`}</style>

      {/* Main oval cursor body */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
      >
        <motion.div
          className="relative"
          style={{ y: floatY }}
          animate={isHovering ? { scaleX: 1.3, scaleY: 1.1 } : { scaleX: 1, scaleY: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
        >
          {/* Outer cyan glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              clipPath: "ellipse(50% 38% at 50% 50%)",
            }}
            animate={
              isHovering
                ? {
                    boxShadow: [
                      "0 0 12px 2px rgba(0, 209, 255, 0.55), 0 0 32px 6px rgba(0, 209, 255, 0.25)",
                      "0 0 22px 5px rgba(0, 209, 255, 0.80), 0 0 56px 12px rgba(0, 209, 255, 0.35)",
                      "0 0 12px 2px rgba(0, 209, 255, 0.55), 0 0 32px 6px rgba(0, 209, 255, 0.25)",
                    ],
                  }
                : {
                    boxShadow: "0 0 8px 2px rgba(0, 209, 255, 0.35), 0 0 20px 4px rgba(0, 209, 255, 0.15)",
                  }
            }
            transition={{ duration: 1.2, repeat: isHovering ? Infinity : 0, ease: "easeInOut" }}
          />

          {/* Glassmorphic oval body */}
          <motion.div
            className="w-10 h-6"
            style={{
              clipPath: "ellipse(50% 38% at 50% 50%)",
              background: "linear-gradient(135deg, rgba(234,246,255,0.28) 0%, rgba(0,209,255,0.14) 50%, rgba(234,246,255,0.08) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(0, 209, 255, 0.55)",
              boxShadow: "0 0 8px 2px rgba(0, 209, 255, 0.35), 0 0 20px 4px rgba(0, 209, 255, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
            animate={
              isHovering
                ? {
                    background: [
                      "linear-gradient(135deg, rgba(234,246,255,0.28) 0%, rgba(0,209,255,0.14) 50%, rgba(234,246,255,0.08) 100%)",
                      "linear-gradient(135deg, rgba(234,246,255,0.42) 0%, rgba(0,209,255,0.26) 50%, rgba(234,246,255,0.18) 100%)",
                      "linear-gradient(135deg, rgba(234,246,255,0.28) 0%, rgba(0,209,255,0.14) 50%, rgba(234,246,255,0.08) 100%)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.4, repeat: isHovering ? Infinity : 0, ease: "easeInOut" }}
          >
            {/* Inner shine highlight */}
            <div
              className="absolute top-[15%] left-[12%] w-[55%] h-[32%] rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.55), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

// ─── Adaptive Cursor (switches between P5 and P3) ────────────────────────────

/**
 * Drop-in replacement for P5Cursor that adapts to the active series.
 * In P5 mode: sharp star with jitter spring physics.
 * In P3 mode: glassmorphic oval with liquid spring and sine-wave float.
 */
export function AdaptiveCursor() {
  const { currentSeries } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Always track at P5 speed — the float Y provides the P3 liquid feel
  const { floatY, isP3 } = useSeriesPhysics(currentSeries);
  const cursorX = useSpring(mouseX, p5SpringConfig);
  const cursorY = useSpring(mouseY, p5SpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX - (isP3 ? 20 : 8));
      mouseY.set(e.clientY - (isP3 ? 12 : 8));
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleHoverStart = (e: Event) => {
      if ((e.target as HTMLElement)?.dataset?.p5interactive === "true") setIsHovering(true);
    };
    const handleHoverEnd = (e: Event) => {
      if ((e.target as HTMLElement)?.dataset?.p5interactive === "true") setIsHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseenter", handleHoverStart, true);
    document.addEventListener("mouseleave", handleHoverEnd, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseenter", handleHoverStart, true);
      document.removeEventListener("mouseleave", handleHoverEnd, true);
    };
  }, [mouseX, mouseY, isP3]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`* { cursor: none; }`}</style>

      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
      >
        <AnimatePresence mode="wait">
          {isP3 ? (
            // ── P3: Glassmorphic oval ──────────────────────
            <motion.div
              key="p3-cursor"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ y: floatY }}
            >
              <motion.div
                animate={
                  isHovering
                    ? { scaleX: 1.35, scaleY: 1.15 }
                    : { scaleX: 1, scaleY: 1 }
                }
                transition={{ type: "spring", stiffness: 80, damping: 16 }}
              >
                <motion.div
                  className="w-10 h-6 relative"
                  style={{
                    clipPath: "ellipse(50% 38% at 50% 50%)",
                    background:
                      "linear-gradient(135deg, rgba(234,246,255,0.28) 0%, rgba(0,209,255,0.14) 50%, rgba(234,246,255,0.08) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(0, 209, 255, 0.55)",
                    boxShadow:
                      "0 0 8px 2px rgba(0,209,255,0.35), 0 0 20px 4px rgba(0,209,255,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
                  }}
                  animate={
                    isHovering
                      ? {
                          boxShadow: [
                            "0 0 8px 2px rgba(0,209,255,0.35), 0 0 20px 4px rgba(0,209,255,0.15)",
                            "0 0 20px 5px rgba(0,209,255,0.75), 0 0 48px 10px rgba(0,209,255,0.30)",
                            "0 0 8px 2px rgba(0,209,255,0.35), 0 0 20px 4px rgba(0,209,255,0.15)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.2, repeat: isHovering ? Infinity : 0, ease: "easeInOut" }}
                >
                  {/* Inner shine */}
                  <div
                    className="absolute top-[15%] left-[12%] w-[55%] h-[32%] rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.55), transparent)",
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            // ── P5: Sharp star with jitter ─────────────────
            <motion.div
              key="p5-cursor"
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotate: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <motion.svg
                viewBox="0 0 32 32"
                className="w-4 h-4 text-brand-main drop-shadow-lg"
                animate={{ scale: isHovering ? 1.3 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <motion.g
                  fill="currentColor"
                  animate={
                    isHovering
                      ? {
                          opacity: [1, 0.6, 1],
                          filter: [
                            "drop-shadow(0 0 0px var(--brand-main))",
                            "drop-shadow(0 0 8px var(--brand-main))",
                            "drop-shadow(0 0 0px var(--brand-main))",
                          ],
                        }
                      : {
                          opacity: 1,
                          filter: "drop-shadow(0 0 0px var(--brand-main))",
                        }
                  }
                  transition={{
                    duration: 0.4,
                    repeat: isHovering ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <path d="M16 2L20 12L30 16L20 20L16 30L12 20L2 16L12 12Z" />
                </motion.g>
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
