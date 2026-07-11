"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
  mode = "scroll",
}: {
  children: React.ReactNode;
  delay?: number;
  mode?: "scroll" | "load";
}) {
  const shouldReduceMotion = useReducedMotion();

  const shared = shouldReduceMotion
    ? { initial: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        transition: { duration: 0.5, delay, ease: "easeOut" as const },
      };

  if (mode === "load") {
    return (
      <motion.div {...shared} animate={{ opacity: 1, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      {...shared}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
