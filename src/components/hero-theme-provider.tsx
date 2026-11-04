"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type HeroTheme = "light" | "dark";

const STORAGE_KEY = "zairo-hero-theme";

type HeroThemeContextValue = {
  theme: HeroTheme;
  setTheme: (theme: HeroTheme) => void;
  mounted: boolean;
};

const HeroThemeContext = createContext<HeroThemeContextValue | null>(null);

export function HeroThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<HeroTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Keep site tokens on light brand palette; only the hero swaps look.
    document.documentElement.classList.remove("dark");
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") setThemeState(saved);
    setMounted(true);
  }, []);

  const setTheme = useCallback((next: HeroTheme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, mounted }),
    [theme, setTheme, mounted],
  );

  return (
    <HeroThemeContext.Provider value={value}>
      {children}
    </HeroThemeContext.Provider>
  );
}

export function useHeroTheme() {
  const ctx = useContext(HeroThemeContext);
  if (!ctx) {
    throw new Error("useHeroTheme must be used within HeroThemeProvider");
  }
  return ctx;
}
