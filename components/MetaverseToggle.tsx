'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useP5Sound } from '@/hooks/useP5Sound';

export function MetaverseToggle() {
  const { theme, toggleTheme } = useTheme();
  const { playHover } = useP5Sound();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    playHover();
    
    // Trigger flash effect
    document.documentElement.classList.add('theme-transitioning');
    
    setTimeout(() => {
      toggleTheme();
      document.documentElement.classList.remove('theme-transitioning');
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <motion.button
      onClick={handleToggle}
      disabled={isTransitioning}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 right-6 z-[9000] flex items-center justify-center w-14 h-14 rounded-full border-2 border-current shadow-lg transition-all duration-300 data-p5interactive"
      data-p5interactive="true"
      title={`Switch to ${theme === 'metaverse' ? 'Reality' : 'Metaverse'} Mode`}
      style={{
        backgroundColor: theme === 'metaverse' ? 'var(--brand-main)' : '#F5F5F5',
        borderColor: theme === 'metaverse' ? 'var(--brand-accent, #EBE6E6)' : '#0D0D0D',
        color: theme === 'metaverse' ? 'var(--brand-accent, #EBE6E6)' : '#0D0D0D',
      }}
    >
      <svg
        viewBox="0 0 32 32"
        className="w-6 h-6 fill-current"
        style={{ opacity: isTransitioning ? 0.5 : 1 }}
      >
        {theme === 'metaverse' ? (
          // Mask icon (Metaverse)
          <g>
            <path d="M16 4C9.4 4 4 9.4 4 16c0 6.6 5.4 12 12 12s12-5.4 12-12S22.6 4 16 4zm0 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S6 21.5 6 16 10.5 6 16 6z" />
            <path d="M13 13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
            <path d="M11 18c1.5 2 3.5 3 5 3s3.5-1 5-3" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" />
          </g>
        ) : (
          // Watch icon (Reality)
          <g>
            <circle cx="16" cy="16" r="10" fill="none" strokeWidth="1.5" stroke="currentColor" />
            <circle cx="16" cy="16" r="1.5" fill="currentColor" />
            <line x1="16" y1="8" x2="16" y2="6" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
            <line x1="16" y1="16" x2="16" y2="12" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
            <line x1="16" y1="16" x2="19" y2="16" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" opacity="0.6" />
          </g>
        )}
      </svg>
    </motion.button>
  );
}
