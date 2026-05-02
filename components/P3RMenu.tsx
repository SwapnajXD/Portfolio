'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { cn } from '@/components/cn';

type P3RMenuItem = {
  label: string;
  href: string;
  description?: string;
};

type P3RMenuProps = {
  items: P3RMenuItem[];
  className?: string;
  initialActiveHref?: string;
};

const spring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 10,
  mass: 0.5,
};

const jitterVariants = {
  idle: (index: number) => ({
    y: [0, index % 2 === 0 ? -2 : 2, 0],
    transition: {
      duration: 2.8 + index * 0.2,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: index * 0.15,
    },
  }),
  active: {
    y: 0,
    transition: {
      duration: 0.15,
    },
  },
};

const menuRows = [
  { x: 0, y: 0, rotateX: -4, rotateY: -4 },
  { x: 12, y: 20, rotateX: -6, rotateY: -7 },
  { x: 24, y: 42, rotateX: -8, rotateY: -10 },
  { x: 38, y: 66, rotateX: -10, rotateY: -12 },
  { x: 52, y: 92, rotateX: -12, rotateY: -14 },
];

export function P3RMenu({ items, className, initialActiveHref }: P3RMenuProps) {
  const firstHref = useMemo(() => initialActiveHref ?? items[0]?.href ?? '', [initialActiveHref, items]);
  const [activeHref, setActiveHref] = useState(firstHref);

  return (
    <nav
      aria-label="P3R menu navigation"
      className={cn('isolate relative w-full max-w-[30rem] select-none', className)}
      style={{ perspective: '1000px' }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[#000B1A]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-90"
      >
        <div className="absolute inset-x-6 top-10 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />
        <div className="absolute inset-y-0 right-3 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <ul className="relative flex flex-col gap-1 pl-2 pt-4" style={{ transformStyle: 'preserve-3d' }}>
        {items.map((item, index) => {
          const isActive = activeHref === item.href;
          const row = menuRows[Math.min(index, menuRows.length - 1)];

          return (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -24, y: 18, rotateX: row.rotateX - 3, rotateY: row.rotateY - 3 }}
              animate={{
                opacity: 1,
                x: row.x,
                y: row.y,
                rotateX: row.rotateX,
                rotateY: row.rotateY,
                scale: isActive ? 1.02 : 1,
              }}
              transition={{
                ...spring,
                delay: index * 0.06,
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                variants={jitterVariants}
                animate={isActive ? 'active' : 'idle'}
                custom={index}
                whileHover={{ scale: 1.03 }}
              >
                <Link
                  href={item.href}
                  onMouseEnter={() => setActiveHref(item.href)}
                  onFocus={() => setActiveHref(item.href)}
                  onClick={() => setActiveHref(item.href)}
                  className={cn(
                    'group relative block outline-none transition-transform focus-visible:ring-0',
                    isActive ? 'z-10' : 'z-0',
                  )}
                >
                  <motion.div
                    className="relative overflow-visible px-2 py-1"
                    animate={isActive ? { scale: 1.2, x: 10, y: -2 } : { scale: 1, x: 0, y: 0 }}
                    transition={spring}
                  >
                    {isActive && (
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-[-10%] top-1/2 h-[78%] w-[114%] -translate-y-1/2 skew-x-[-18deg]"
                        initial={{ opacity: 0, scaleX: 0.7, rotate: -4 }}
                        animate={{ opacity: 1, scaleX: 1, rotate: -1 }}
                        exit={{ opacity: 0 }}
                        transition={spring}
                        style={{
                          clipPath: 'polygon(0% 26%, 10% 6%, 94% 0%, 100% 34%, 92% 100%, 8% 94%, 0% 72%)',
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.78) 28%, rgba(255,0,110,0.92) 100%)',
                          boxShadow: '0 0 18px rgba(255,255,255,0.24), 0 0 34px rgba(255,0,110,0.18)',
                        }}
                      />
                    )}

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-[7px] left-[10px] h-[2px] w-[calc(100%+38px)] origin-left bg-cyan-300/90"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'skewX(-28deg) scaleX(1)' : 'skewX(-28deg) scaleX(0.12)',
                        boxShadow: '0 0 12px rgba(118, 237, 255, 0.9)',
                      }}
                      transition={{ type: 'spring', stiffness: 480, damping: 14 }}
                    />

                    <span className="relative z-10 flex flex-col items-start pr-8">
                      <span
                        className={cn(
                          'font-sans text-[clamp(2.1rem,3.8vw,3.5rem)] font-black italic uppercase leading-[0.86] tracking-[-0.075em]',
                          isActive ? 'text-black' : 'text-[#C0E8FF]',
                        )}
                        style={{
                          textShadow: isActive
                            ? 'none'
                            : '0 0 12px rgba(192,232,255,0.18), 0 1px 0 rgba(0,0,0,0.45)',
                        }}
                      >
                        {item.label}
                      </span>

                      {item.description && (
                        <span
                          className={cn(
                            'mt-1 max-w-[18rem] text-[0.62rem] font-semibold uppercase tracking-[0.34em]',
                            isActive ? 'text-[#000B1A]/90' : 'text-[#C0E8FF]/55',
                          )}
                        >
                          {item.description}
                        </span>
                      )}
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}
