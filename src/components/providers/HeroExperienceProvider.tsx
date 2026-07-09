"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

type HeroPhase = "loading" | "pause" | "revealing" | "ready";

interface HeroExperienceContextType {
  phase: HeroPhase;
  setPhase: (phase: HeroPhase) => void;
  loadingComplete: boolean;
  completeLoading: () => void;
}

const HeroExperienceContext = createContext<HeroExperienceContextType | null>(null);

export function useHeroExperience() {
  const ctx = useContext(HeroExperienceContext);
  if (!ctx) throw new Error("useHeroExperience must be used within HeroExperienceProvider");
  return ctx;
}

export function HeroExperienceProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<HeroPhase>("ready");
  const [loadingComplete, setLoadingComplete] = useState(true);

  const completeLoading = useCallback(() => {
    setLoadingComplete(true);
    setPhase("revealing");
  }, []);

  useEffect(() => {
    if (phase === "revealing") {
      const t = setTimeout(() => setPhase("ready"), 3200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <HeroExperienceContext.Provider
      value={{ phase, setPhase, loadingComplete, completeLoading }}
    >
      {children}
    </HeroExperienceContext.Provider>
  );
}
