'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/components/cn';

type ShadowResponse = 'cool' | 'neutral' | 'boring';

interface ShadowNegotiationProps {
  isOpen: boolean;
  onClose: () => void;
  onRespond: (response: ShadowResponse) => void;
}

export function ShadowNegotiation({ isOpen, onClose, onRespond }: ShadowNegotiationProps) {
  const [selectedResponse, setSelectedResponse] = useState<ShadowResponse | null>(null);
  const [showReaction, setShowReaction] = useState(false);

  const responses = [
    {
      id: 'cool' as const,
      text: "I want to collaborate!",
      emoji: '🔥',
      reaction: 'EXCELLENT...',
      color: 'from-p5-red to-p5-red',
    },
    {
      id: 'neutral' as const,
      text: "I'm a fan of your work.",
      emoji: '😏',
      reaction: 'NOT BAD...',
      color: 'from-p5-white/50 to-p5-white/30',
    },
    {
      id: 'boring' as const,
      text: "Just give me the data.",
      emoji: '😒',
      reaction: 'Tch... FINE.',
      color: 'from-p5-black to-p5-black',
    },
  ];

  const handleRespond = (responseId: ShadowResponse) => {
    setSelectedResponse(responseId);
    setShowReaction(true);
    setTimeout(() => {
      onRespond(responseId);
      onClose();
    }, 1200);
  };

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
          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Shadow dialog */}
          <motion.div
            className="relative z-10 max-w-2xl w-full"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Shadow Avatar */}
            <motion.div
              className="flex justify-center mb-8"
              animate={showReaction ? { y: [0, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Shadow silhouette */}
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-p5-red">
                  <defs>
                    <filter id="shadow-blur">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                    </filter>
                  </defs>
                  <ellipse cx="50" cy="55" rx="35" ry="38" fill="currentColor" opacity="0.9" />
                  {/* Eyes */}
                  <circle cx="38" cy="40" r="4" fill="#0D0D0D" />
                  <circle cx="62" cy="40" r="4" fill="#0D0D0D" />
                  {/* Mouth */}
                  {showReaction ? (
                    <path d="M 45 60 Q 50 65 55 60" stroke="#0D0D0D" strokeWidth="3" fill="none" strokeLinecap="round" />
                  ) : (
                    <path d="M 45 60 Q 50 55 55 60" stroke="#0D0D0D" strokeWidth="3" fill="none" strokeLinecap="round" />
                  )}
                </svg>

                {/* Aura pulse */}
                <motion.div
                  className="absolute inset-0 border-2 border-p5-red rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Main container with jagged border */}
            <motion.div
              className="relative bg-p5-black border-4 border-p5-white p-8 -skew-x-6"
              style={{
                clipPath: 'polygon(2% 0%, 100% 0%, 98% 5%, 100% 15%, 98% 20%, 100% 100%, 0% 100%, 0% 20%, 2% 15%, 0% 5%)',
              }}
            >
              {/* Content wrapper to unskew text */}
              <div className="skew-x-6 space-y-6">
                {/* Shadow text */}
                {!showReaction ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display text-2xl uppercase text-p5-red font-bold tracking-widest">
                      Shadow Negotiation
                    </h3>
                    <p className="font-hand text-lg leading-relaxed text-p5-white/90">
                      "You wish to contact this one and offer your submission? Speak thy true intentions..."
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <p className="font-display text-3xl uppercase text-p5-red font-bold">
                      {responses.find((r) => r.id === selectedResponse)?.reaction}
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
                    {responses.map((response, idx) => (
                      <motion.button
                        key={response.id}
                        onClick={() => handleRespond(response.id)}
                        whileHover={{ scale: 1.05, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className={cn(
                          'relative w-full py-3 px-4 border-2 font-hand uppercase text-sm tracking-wider',
                          'bg-p5-black hover:bg-p5-red transition-all duration-200',
                          'hover:text-p5-black text-p5-white',
                          '-skew-x-6 overflow-hidden'
                        )}
                        style={{
                          borderColor: response.id === 'cool' ? 'var(--brand-main)' : 'var(--brand-accent, #EBE6E6)',
                          background: selectedResponse === response.id ? 'linear-gradient(90deg, var(--brand-main), var(--brand-accent))' : undefined,
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {response.emoji} {response.text}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Decorative accents */}
            <motion.div
              className="absolute -top-6 -left-6 w-4 h-4 bg-p5-red"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-3 h-3 bg-p5-white"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
