"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function P5Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, mass: 0.5, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target?.dataset?.p5interactive === "true") {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target?.dataset?.p5interactive === "true") {
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
      <style>{`
        * {
          cursor: none;
        }
      `}</style>

      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9998]"
      >
        <motion.svg
          viewBox="0 0 32 32"
          className="w-4 h-4 text-p5-red drop-shadow-lg"
          animate={{ scale: isHovering ? 1.3 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <motion.g
            fill="currentColor"
            animate={
              isHovering
                ? {
                    opacity: [1, 0.6, 1],
                    filter: ["drop-shadow(0 0 0px rgba(217,35,35,0))", "drop-shadow(0 0 8px rgba(217,35,35,1))", "drop-shadow(0 0 0px rgba(217,35,35,0))"],
                  }
                : { opacity: 1, filter: "drop-shadow(0 0 0px rgba(217,35,35,0))" }
            }
            transition={{ duration: 0.4, repeat: isHovering ? Infinity : 0, ease: "easeInOut" }}
          >
            <path d="M16 2L20 12L30 16L20 20L16 30L12 20L2 16L12 12Z" />
          </motion.g>
        </motion.svg>
      </motion.div>
    </>
  );
}
