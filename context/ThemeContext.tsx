'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'reality' | 'metaverse';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(newTheme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', newTheme);
  root.classList.remove('reality-mode', 'metaverse-mode');
  root.classList.add(newTheme === 'reality' ? 'reality-mode' : 'metaverse-mode');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('metaverse');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Apply initial theme immediately
    const stored = (localStorage.getItem('p5-theme') as Theme | null) || 'metaverse';
    setTheme(stored);
    applyTheme(stored);
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'metaverse' ? 'reality' : 'metaverse';
      localStorage.setItem('p5-theme', newTheme);
      applyTheme(newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
