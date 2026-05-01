"use client";

import { motion } from "framer-motion";
import { StatBar } from "./StatBar";
import { cn } from "@/components/cn";

type PhanSitePanelProps = {
  stats?: Array<{ label: string; value: number }>;
  className?: string;
};

const defaultStats = [
  { label: "Knowledge", value: 92 },
  { label: "Guts", value: 74 },
  { label: "Proficiency", value: 88 },
  { label: "Charm", value: 81 },
];

const statIcons: Record<string, string> = {
  Knowledge:
    '<svg viewBox="0 0 40 40" fill="none"><path d="M20 4c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 3c7.2 0 13 5.8 13 13s-5.8 13-13 13-13-5.8-13-13 5.8-13 13-13z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M18 14h4v8h-4zM20 24a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor"/></svg>',
  Guts: '<svg viewBox="0 0 40 40" fill="none"><path d="M20 6l6 12h13l-10.5 8 4 12L20 30l-10.5 8 4-12L1 18h13l6-12z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  Proficiency:
    '<svg viewBox="0 0 40 40" fill="none"><path d="M8 14h24v2H8zM8 20h18v2H8zM8 26h16v2H8z" fill="currentColor"/><path d="M32 12H8c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  Charm:
    '<svg viewBox="0 0 40 40" fill="none"><path d="M20 4c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm-4 12a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zM14 24h12c0-3.3-2.7-6-6-6s-6 2.7-6 6z" fill="currentColor"/></svg>',
};

const pollTickers = [
  "YES: 87% • SUPPORT • 87% • SUPPORT • 87% • SUPPORT • 87%",
  "NO: 13% • OPPOSE • 13% • OPPOSE • 13% • OPPOSE • 13%",
];

const statDescriptions: Record<string, Record<number, string>> = {
  Knowledge: {
    20: "Rank 1: Novice Coder",
    40: "Rank 2: Competent Developer",
    60: "Rank 3: Proficient Engineer",
    75: "Rank 4: Advanced React Master",
    85: "Rank 5: TypeScript Expert",
    95: "Rank 6: Architecture Sage",
    100: "Rank 7: Full-Stack Legend",
  },
  Guts: {
    20: "Rank 1: Timid",
    40: "Rank 2: Anxious Starter",
    60: "Rank 3: Bold Builder",
    75: "Rank 4: Courageous Maker",
    85: "Rank 5: Fearless Innovator",
    95: "Rank 6: Legendary Hero",
    100: "Rank 7: Phantom Thief",
  },
  Proficiency: {
    20: "Rank 1: Script Kiddie",
    40: "Rank 2: Self-Taught Dev",
    60: "Rank 3: Active Contributor",
    75: "Rank 4: Production Ready",
    85: "Rank 5: Shipping Master",
    95: "Rank 6: Technical Leader",
    100: "Rank 7: Industry Architect",
  },
  Charm: {
    20: "Rank 1: Awkward",
    40: "Rank 2: Friendly",
    60: "Rank 3: Engaging Presenter",
    75: "Rank 4: Charismatic Speaker",
    85: "Rank 5: Inspiring Mentor",
    95: "Rank 6: Influential Voice",
    100: "Rank 7: Legendary Persona",
  },
};

export function PhanSitePanel({ stats = defaultStats, className }: PhanSitePanelProps) {
  return (
    <div className={cn("space-y-0", className)}>
      <div className="relative overflow-hidden rounded-sm border-2 border-p5-white/20 bg-p5-black">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--brand-glow) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            backgroundPosition: "0 0",
            opacity: 0.5,
          }}
        />

        <motion.div
          className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.08),rgba(0,0,0,0.08)_2px,transparent_2px,transparent_4px)] pointer-events-none"
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="clip-jagged border-2 border-p5-red bg-p5-red px-4 py-2 -skew-x-12">
          <p className="font-display text-center text-xs uppercase tracking-[0.35em] text-p5-black font-bold">
            PHAN-SITE
          </p>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="space-y-2">
            <p className="font-hand text-[0.7rem] uppercase tracking-[0.3em] text-p5-white/60">
              Social Stats
            </p>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    delay: index * 0.12,
                  }}
                >
                  <div
                    className="flex-none w-4 h-4 text-p5-red mt-0.5"
                    dangerouslySetInnerHTML={{
                      __html: statIcons[stat.label] || statIcons.Knowledge,
                    }}
                  />
                  <StatBar
                    label={stat.label}
                    value={stat.value}
                    delay={index * 0.12 + 0.08}
                    rankDescriptions={statDescriptions[stat.label] || statDescriptions.Knowledge}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border-t border-p5-white/15 pt-3">
            <p className="font-hand text-[0.65rem] uppercase tracking-[0.3em] text-p5-white/60 mb-2">
              Live Poll
            </p>
            <div className="space-y-1 text-[0.6rem] overflow-hidden h-8">
              {pollTickers.map((ticker, idx) => (
                <motion.div
                  key={idx}
                  className="whitespace-nowrap font-mono text-p5-white/75"
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{
                    duration: 12 + idx * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {ticker}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border-t border-p5-white/15 pt-3 text-[0.65rem] leading-5 uppercase tracking-[0.25em] text-p5-white/50">
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Status: ONLINE
            </motion.div>
            <p className="mt-1">Rank: Rising</p>
          </div>
        </div>
      </div>
    </div>
  );
}
