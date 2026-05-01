'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Series = "P5" | "P3";

type ThemeContextValue = {
  currentSeries: Series;
  setCurrentSeries: (series: Series) => void;
  toggleSeries: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applySeriesToDocument(series: Series) {
  const root = document.documentElement;
  root.setAttribute("data-series", series);
  root.classList.remove("series-p5", "series-p3");
  root.classList.add(series === "P5" ? "series-p5" : "series-p3");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentSeries, setCurrentSeriesState] = useState<Series>("P5");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-series");
    const initialSeries: Series = stored === "P3" ? "P3" : "P5";

    setCurrentSeriesState(initialSeries);
    applySeriesToDocument(initialSeries);
  }, []);

  const setCurrentSeries = (series: Series) => {
    setCurrentSeriesState(series);
    localStorage.setItem("portfolio-series", series);
    applySeriesToDocument(series);
  };

  const toggleSeries = () => {
    setCurrentSeries(currentSeries === "P5" ? "P3" : "P5");
  };

  const value = useMemo(
    () => ({ currentSeries, setCurrentSeries, toggleSeries }),
    [currentSeries],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
