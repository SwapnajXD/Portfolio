'use client';

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/cn";
import { useTheme } from "@/context/ThemeContext";
import { useSeriesSound } from "@/hooks/useSeriesSound";

type BattleMenuItem = {
  label: string;
  href: string;
  subLabel?: string;
};

type BattleMenuProps = {
  items?: BattleMenuItem[];
  className?: string;
};

const defaultItems: BattleMenuItem[] = [
  { label: "SKILL",    href: "#skills",   subLabel: "core abilities"      },
  { label: "PROJECTS", href: "#projects", subLabel: "selected works"      },
  { label: "ABOUT",    href: "#about",    subLabel: "the phantom thief"   },
  { label: "CONTACT",  href: "#contact",  subLabel: "send a calling card" },
];

// ─── P5 — Sticker-Bomb Labels ─────────────────────────────────────────────────
// Dark bg, thick diagonal slash marks, rectangular labels at different angles.
// Each label = solid-color rect + hard shadow + white bold text + small sub-text.

const P5_LABEL_STYLES: {
  rotate: number;
  bg: string;
  textColor: string;
  offsetX: number;
}[] = [
  { rotate: -4,   bg: "#C41A1A", textColor: "#fff", offsetX: 0   },
  { rotate:  2.5, bg: "#0D0D0D", textColor: "#fff", offsetX: 24  },
  { rotate: -1.5, bg: "#9B1111", textColor: "#fff", offsetX: 8   },
  { rotate:  3.5, bg: "#0D0D0D", textColor: "#fff", offsetX: 16  },
];

function P5BattleMenu({
  items,
  activeHref,
  onActivate,
  playHover,
}: {
  items: BattleMenuItem[];
  activeHref: string;
  onActivate: (href: string) => void;
  playHover: () => void;
}) {
  return (
    <nav
      className="relative select-none"
      style={{ width: 280 }}
      aria-label="Portfolio navigation"
    >
      {/* ── Diagonal slash marks across the background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-visible"
        style={{ zIndex: 0 }}
      >
        {/* Big bold diagonal slashes like in the reference */}
        {[
          { top: -20, left: -40, w: 420, angle: -52 },
          { top: -10, left:  20, w: 380, angle: -52 },
          { top:  30, left:  80, w: 360, angle: -52 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute bg-brand-accent/8"
            style={{
              top: s.top,
              left: s.left,
              width: s.w,
              height: 18,
              transform: `rotate(${s.angle}deg)`,
              background: "rgba(235,230,230,0.07)",
              transformOrigin: "left center",
            }}
          />
        ))}
      </div>

      {/* ── Sticker label blocks ── */}
      <ul
        className="relative flex flex-col"
        style={{ gap: 18, zIndex: 1 }}
      >
        {items.map((item, index) => {
          const isActive = activeHref === item.href;
          const style = P5_LABEL_STYLES[index % P5_LABEL_STYLES.length];

          return (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -80, rotate: style.rotate - 8 }}
              animate={{
                opacity: 1,
                x: style.offsetX,
                rotate: style.rotate,
              }}
              transition={{
                type: "spring",
                stiffness: 440,
                damping: 14,
                mass: 0.65,
                delay: index * 0.07,
              }}
              style={{ transformOrigin: "left center", listStyle: "none" }}
            >
              <motion.a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = item.href.slice(1);
                  onActivate(item.href);
                }}
                onHoverStart={playHover}
                whileHover={{ scale: 1.05, rotate: 0 }}
                whileTap={{ scale: 0.97 }}
                data-p5interactive="true"
                className="block"
              >
                {/* The sticker rectangle */}
                <div
                  className="relative px-5 py-3"
                  style={{
                    background: isActive ? "#D92323" : style.bg,
                    /* Hard drop shadow = the sticker "stuck on" look */
                    boxShadow: "5px 5px 0 #000, 8px 8px 0 rgba(0,0,0,0.3)",
                    borderLeft: isActive ? "4px solid #EBE6E6" : "none",
                    minWidth: 180,
                  }}
                >
                  {/* Active: diagonal white accent stripe */}
                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 overflow-hidden"
                    >
                      <div
                        className="absolute top-0 bottom-0"
                        style={{
                          right: 16,
                          width: 10,
                          background: "rgba(255,255,255,0.18)",
                          transform: "skewX(-16deg)",
                        }}
                      />
                      <div
                        className="absolute top-0 bottom-0"
                        style={{
                          right: 30,
                          width: 5,
                          background: "rgba(255,255,255,0.10)",
                          transform: "skewX(-16deg)",
                        }}
                      />
                    </div>
                  )}

                  {/* Main label */}
                  <span
                    className="block font-display font-black uppercase leading-none tracking-wide"
                    style={{
                      color: style.textColor,
                      fontSize: 26,
                      letterSpacing: "0.04em",
                      textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Sub-label */}
                  <span
                    className="block font-sans uppercase mt-0.5"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: 9,
                      letterSpacing: "0.28em",
                    }}
                  >
                    {item.subLabel}
                  </span>
                </div>
              </motion.a>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}

// ─── P3 — Cascading Italic Text (matches Persona 3 Reload screenshots) ────────
//
// Active item   : RED (#E50914), large, bold italic + white parallelogram accent to the right
// Inactive items: Cyan (#00CFFF), bold italic, shrink progressively with distance from active
// Font          : Barlow Condensed 800 Italic (closest to P3R's condensed italic UI font)
// No background boxes — pure floating text

function P3BattleMenu({
  items,
  activeHref,
  onActivate,
  playHover,
}: {
  items: BattleMenuItem[];
  activeHref: string;
  onActivate: (href: string) => void;
  playHover: () => void;
}) {
  const activeIndex = items.findIndex((item) => item.href === activeHref);

  // Font size cascade: active is largest, shrinks by ~9px per step from active
  const getFontSize = (index: number) => {
    const dist = Math.abs(index - activeIndex);
    if (dist === 0) return 56;
    return Math.max(24, 46 - dist * 9);
  };

  // Opacity cascade: items far from active fade out
  const getOpacity = (index: number) => {
    const dist = Math.abs(index - activeIndex);
    if (dist === 0) return 1;
    return Math.max(0.5, 1 - dist * 0.13);
  };

  return (
    <nav
      className="select-none"
      aria-label="Portfolio navigation"
      style={{ width: "max-content" }}
    >
      <ul className="flex flex-col" style={{ gap: 2 }}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const fontSize = getFontSize(index);
          const opacity = getOpacity(index);

          return (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
                delay: index * 0.06,
              }}
              style={{ listStyle: "none" }}
            >
              <motion.a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = item.href.slice(1);
                  onActivate(item.href);
                }}
                onHoverStart={playHover}
                whileHover={{ x: -6 }}
                whileTap={{ scale: 0.97 }}
                data-p5interactive="true"
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                {/* ── Label text ── */}
                <span
                  style={{
                    fontFamily: "var(--font-barlow-condensed), var(--font-bangers), sans-serif",
                    fontStyle: "italic",
                    fontWeight: 800,
                    fontSize,
                    lineHeight: 1.05,
                    letterSpacing: "0.02em",
                    color: isActive ? "#E50914" : "#00CFFF",
                    textShadow: isActive
                      ? "2px 3px 0 rgba(0,0,0,0.55), 0 0 20px rgba(229,9,20,0.35)"
                      : "1px 2px 0 rgba(0,0,0,0.4), 0 0 14px rgba(0,207,255,0.25)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>

                {/* ── Active: white parallelogram accent (to the right) ── */}
                {isActive && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 480, damping: 22 }}
                    style={{
                      transformOrigin: "center",
                      flexShrink: 0,
                      // Height matches approx the active text cap height
                      height: Math.round(fontSize * 0.88),
                      width: 18,
                      position: "relative",
                      alignSelf: "center",
                    }}
                  >
                    {/* Main white shard */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "#FFFFFF",
                        transform: "skewX(-10deg)",
                        boxShadow: "0 0 10px rgba(255,255,255,0.55)",
                      }}
                    />
                    {/* Left magenta/pink edge — thin accent line */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: 4,
                        background: "linear-gradient(180deg, #FF3EA5 0%, #E50914 100%)",
                        transform: "skewX(-10deg)",
                      }}
                    />
                  </motion.div>
                )}
              </motion.a>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}

// ─── Unified BattleMenu ───────────────────────────────────────────────────────

export function BattleMenu({ items = defaultItems, className }: BattleMenuProps) {
  const { currentSeries } = useTheme();
  const { playHover } = useSeriesSound(currentSeries);
  const firstItem = useMemo(() => items[0]?.href ?? "#skills", [items]);
  const [activeHref, setActiveHref] = useState(firstItem);

  useEffect(() => {
    const sync = () => setActiveHref(window.location.hash || firstItem);
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [firstItem]);

  const sharedProps = {
    items,
    activeHref,
    onActivate: setActiveHref,
    playHover,
  };

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait">
        {currentSeries === "P3" ? (
          <motion.div
            key="p3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <P3BattleMenu {...sharedProps} />
          </motion.div>
        ) : (
          <motion.div
            key="p5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <P5BattleMenu {...sharedProps} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}