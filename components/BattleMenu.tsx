'use client';

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/components/cn";
import { useP5Sound } from "@/hooks/useP5Sound";

type BattleMenuItem = {
  label: string;
  href: string;
};

type BattleMenuProps = {
  items?: BattleMenuItem[];
  className?: string;
};

const defaultItems: BattleMenuItem[] = [
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 15,
  mass: 0.8,
};

const menuVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: "-100%",
    rotate: -5,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: springTransition,
  },
};

export function BattleMenu({ items = defaultItems, className }: BattleMenuProps) {
  const firstItem = useMemo(() => items[0]?.href ?? "#skills", [items]);
  const [activeHref, setActiveHref] = useState(firstItem);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { playHover } = useP5Sound();

  useEffect(() => {
    const syncActiveHref = () => {
      setActiveHref(window.location.hash || firstItem);
    };

    syncActiveHref();
    window.addEventListener("hashchange", syncActiveHref);
    window.addEventListener("popstate", syncActiveHref);

    return () => {
      window.removeEventListener("hashchange", syncActiveHref);
      window.removeEventListener("popstate", syncActiveHref);
    };
  }, [firstItem]);

  return (
    <nav className={cn("w-full max-w-[22rem] sm:max-w-[26rem]", className)} aria-label="Portfolio navigation">
      <motion.ul
        className="flex flex-col gap-3"
        variants={menuVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, index) => {
          const isActive = activeHref === item.href;

          return (
            <motion.li key={item.href} variants={itemVariants} className="w-full">
              <motion.div
                whileHover={{ scale: 1.1, x: 10 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                onHoverStart={() => {
                  playHover();
                  setHoveredIndex(index);
                }}
                onHoverEnd={() => setHoveredIndex(null)}
                data-p5interactive="true"
                className={cn(
                  "group relative block w-full overflow-hidden border-2 border-brand-accent/90 px-4 py-3 shadow-p5 transition-colors md:px-5 md:py-4",
                  "-skew-x-6 origin-left md:-skew-x-12",
                  "[clip-path:polygon(4%_0%,100%_0%,96%_18%,100%_76%,95%_100%,0_100%,0_7%)]",
                  "md:[clip-path:polygon(2%_0%,100%_0%,97%_16%,100%_72%,98%_100%,0_100%,0_9%)]",
                  isActive ? "bg-brand-main text-brand-accent" : "bg-brand-bg text-brand-accent",
                )}
              >
                <a
                  href={item.href}
                  className="block w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = item.href.slice(1);
                    setActiveHref(item.href);
                  }}
                >
                  <motion.span
                    animate={hoveredIndex === index ? { x: [0, -2, 2, 0] } : { x: 0 }}
                    transition={springTransition}
                    className="flex w-full items-center justify-between gap-4 font-display text-xl uppercase tracking-[0.16em] sm:text-2xl"
                  >
                    <span className="translate-x-1 skew-x-6 md:skew-x-12">{item.label}</span>
                    <span className="translate-x-1 text-xs tracking-[0.35em] text-current/80">0{index + 1}</span>
                  </motion.span>
                </a>
              </motion.div>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}