"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { FootballZone, TimeOfDay } from "@/lib/flythrough-journey";
import { getActiveFootballZone, getTimeOfDayAtProgress } from "@/lib/flythrough-journey";

interface JourneyContextType {
  flythroughProgress: number;
  setFlythroughProgress: (p: number) => void;
  timeOfDay: TimeOfDay;
  footballZone: FootballZone;
  inFlythrough: boolean;
  setInFlythrough: (v: boolean) => void;
}

const JourneyContext = createContext<JourneyContextType | null>(null);

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used within JourneyProvider");
  return ctx;
}

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [flythroughProgress, setFlythroughProgressRaw] = useState(0);
  const [inFlythrough, setInFlythrough] = useState(false);

  const setFlythroughProgress = useCallback((p: number) => {
    setFlythroughProgressRaw(Math.max(0, Math.min(1, p)));
  }, []);

  const timeOfDay = getTimeOfDayAtProgress(flythroughProgress);
  const footballZone = getActiveFootballZone(flythroughProgress);

  return (
    <JourneyContext.Provider
      value={{
        flythroughProgress,
        setFlythroughProgress,
        timeOfDay,
        footballZone,
        inFlythrough,
        setInFlythrough,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}
