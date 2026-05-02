'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useTheme, type Series } from '@/context/ThemeContext';
import { useSeriesStyles } from '@/hooks/useSeriesStyles';
import { cn } from '@/components/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ShadowResponse = 'cool' | 'neutral' | 'boring';

type DialogueLine = {
  id: ShadowResponse;
  text: string;
  emoji: string;
  reaction: string;
};

interface ShadowNegotiationProps {
  isOpen: boolean;
  onClose: () => void;
  onRespond: (response: ShadowResponse) => void;
}

// ─── Dialogue Scripts ─────────────────────────────────────────────────────────

const P5_DIALOGUE = {
  title: 'Shadow Negotiation',
  prompt:
    '"What makes you think you\'re worthy of a Phantom Thief\'s time? Speak — before I lose interest."',
  responses: [
    {
      id: 'cool' as const,
      text: "I'm here to change the world with you.",
      emoji: '🔥',
      reaction: 'NOT BAD... YOU HAVE GUTS!',
    },
    {
      id: 'neutral' as const,
      text: "Relax — I just want to talk shop.",
      emoji: '😏',
      reaction: "Hmph... you're not boring at least.",
    },
    {
      id: 'boring' as const,
      text: "Hand over the goods, Shadow.",
      emoji: '💀',
      reaction: "Tch... FINE. But you owe me.",
    },
  ] satisfies DialogueLine[],
};

const P3_DIALOGUE = {
  title: 'The Dark Hour',
  prompt:
    '"Memento Mori... Do you truly understand the weight of reaching out across the void? What drives you forward when the clock strikes midnight?"',
  responses: [
    {
      id: 'cool' as const,
      text: "I choose to face the Dark Hour with you.",
      emoji: '🌙',
      reaction: 'The bonds we forge... transcend mortality.',
    },
    {
      id: 'neutral' as const,
      text: "I seek understanding, nothing more.",
      emoji: '🔮',
      reaction: 'So be it... knowledge is its own end.',
    },
    {
      id: 'boring' as const,
      text: "Skip the philosophy — let's talk.",
      emoji: '⏳',
      reaction: 'Time waits for no one... nor shall I.',
    },
  ] satisfies DialogueLine[],
};

function getDialogue(series: Series) {
  return series === 'P3' ? P3_DIALOGUE : P5_DIALOGUE;
}

// ─── P5 Shadow Avatar ─────────────────────────────────────────────────────────

function P5Avatar({ reacting }: { reacting: boolean }) {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-brand-main">
        <ellipse cx="50" cy="55" rx="35" ry="38" fill="currentColor" opacity="0.9" />
        <circle cx="38" cy="40" r="4" fill="#0D0D0D" />
        <circle cx="62" cy="40" r="4" fill="#0D0D0D" />
        {reacting ? (
          <path d="M 45 60 Q 50 65 55 60" stroke="#0D0D0D" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 45 60 Q 50 55 55 60" stroke="#0D0D0D" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
      </svg>
      <motion.div
        className="absolute inset-0 border-2 border-brand-main rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
  );
}

// ─── P3 Persona Avatar ────────────────────────────────────────────────────────

function P3Avatar({ reacting }: { reacting: boolean }) {
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      {/* Outer ripple rings */}
      {[0, 0.4, 0.8].map((delay) => (
        <motion.div
          key={delay}
          className="absolute inset-0 rounded-full border border-[rgba(0,209,255,0.3)]"
          animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
          transition={{ duration: 2.2, delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* Central orb */}
      <motion.div
        className="relative w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(0,209,255,0.35) 0%, rgba(7,20,35,0.9) 70%)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 24px 6px rgba(0,209,255,0.3), inset 0 0 12px rgba(0,209,255,0.15)',
          border: '1px solid rgba(0,209,255,0.45)',
        }}
        animate={reacting ? { scale: [1, 1.12, 1] } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Moon icon */}
        <svg viewBox="0 0 32 32" className="w-10 h-10" fill="none">
          <path
            d="M14 4C8.5 5.5 4.5 10.5 4.5 16.5c0 7.2 5.8 13 13 13 6 0 11-3.9 12.5-9.5-1.5.8-3.2 1.2-5 1.2-6.1 0-11-4.9-11-11 0-1.8.4-3.5 1.2-5Z"
            fill="rgba(0,209,255,0.85)"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ShadowNegotiation({ isOpen, onClose, onRespond }: ShadowNegotiationProps) {
  const { currentSeries } = useTheme();
  const s = useSeriesStyles();
  const [selectedResponse, setSelectedResponse] = useState<ShadowResponse | null>(null);
  const [showReaction, setShowReaction] = useState(false);

  const dialogue = getDialogue(currentSeries);
  const isP3 = currentSeries === 'P3';

  const handleRespond = useCallback(
    (responseId: ShadowResponse) => {
      setSelectedResponse(responseId);
      setShowReaction(true);
      setTimeout(() => {
        onRespond(responseId);
        onClose();
        // Reset for next open
        setTimeout(() => {
          setSelectedResponse(null);
          setShowReaction(false);
        }, 300);
      }, 1200);
    },
    [onRespond, onClose],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="shadow-negotiation"
          className="fixed inset-0 z-[9500] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay — P5: pure black, P3: deep ocean gradient */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: isP3
                ? 'radial-gradient(ellipse at 50% 40%, rgba(0,209,255,0.12) 0%, rgba(5,11,22,0.92) 60%)'
                : 'rgba(0,0,0,0.82)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog card */}
          <motion.div
            className="relative z-10 max-w-2xl w-full"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: isP3 ? 180 : 400,
              damping: isP3 ? 22 : 25,
            }}
          >
            {/* Avatar */}
            <motion.div
              className="flex justify-center mb-8"
              animate={showReaction ? { y: [0, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {isP3 ? <P3Avatar reacting={showReaction} /> : <P5Avatar reacting={showReaction} />}
            </motion.div>

            {/* Content panel */}
            <motion.div
              className={cn(
                'relative p-8 border-4',
                isP3
                  ? 'rounded-3xl border-[rgba(0,209,255,0.4)]'
                  : '-skew-x-6 border-brand-accent',
              )}
              style={
                isP3
                  ? {
                      background: 'linear-gradient(180deg, rgba(234,246,255,0.1) 0%, rgba(7,20,35,0.95) 100%)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 0 32px rgba(0,209,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                    }
                  : {
                      background: 'var(--brand-bg)',
                      clipPath: 'polygon(2% 0%, 100% 0%, 98% 5%, 100% 15%, 98% 20%, 100% 100%, 0% 100%, 0% 20%, 2% 15%, 0% 5%)',
                    }
              }
            >
              <div className={isP3 ? '' : 'skew-x-6 space-y-6'}>
                {/* Dialogue text */}
                {!showReaction ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h3
                      className={cn(
                        'font-display text-2xl uppercase font-bold tracking-widest text-brand-main',
                        isP3 && 'text-center',
                      )}
                    >
                      {dialogue.title}
                    </h3>
                    <p
                      className={cn(
                        'font-hand text-lg leading-relaxed text-brand-accent/90',
                        isP3 && 'text-center italic',
                      )}
                    >
                      {dialogue.prompt}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-2"
                  >
                    <p className="font-display text-3xl uppercase text-brand-main font-bold">
                      {dialogue.responses.find((r) => r.id === selectedResponse)?.reaction}
                    </p>
                  </motion.div>
                )}

                {/* Response buttons */}
                {!showReaction && (
                  <motion.div
                    className="grid gap-3 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {dialogue.responses.map((response, idx) => (
                      <motion.button
                        key={response.id}
                        onClick={() => handleRespond(response.id)}
                        whileHover={{ scale: 1.04, x: isP3 ? 0 : 4 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, x: isP3 ? 0 : -20, y: isP3 ? 10 : 0 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className={s.button}
                      >
                        <span className="relative z-10 flex items-center gap-2 justify-center">
                          {response.emoji} {response.text}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Decorative accents */}
            {isP3 ? (
              <>
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[rgba(0,209,255,0.7)]"
                  animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[rgba(0,209,255,0.5)]"
                  animate={{ y: [0, 6, 0], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </>
            ) : (
              <>
                <motion.div
                  className="absolute -top-6 -left-6 w-4 h-4 bg-brand-main"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 w-3 h-3 bg-brand-accent"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
