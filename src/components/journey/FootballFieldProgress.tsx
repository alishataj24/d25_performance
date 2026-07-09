"use client";

import { useJourney } from "@/components/providers/JourneyProvider";
import { FOOTBALL_ZONES } from "@/lib/flythrough-journey";
import { cn } from "@/lib/utils";

/**
 * Football field diagram as scroll progress — restrained, not cartoonish.
 */
export function FootballFieldProgress() {
  const { flythroughProgress, footballZone, inFlythrough } = useJourney();

  if (!inFlythrough) return null;

  const fillHeight = flythroughProgress * 180;
  const fillY = 10 + (180 - fillHeight);

  return (
    <div
      className="fixed left-5 md:left-8 bottom-8 z-[90] pointer-events-none hidden md:block"
      aria-label="Journey progress"
    >
      <svg viewBox="0 0 120 200" className="w-14 h-24 opacity-55" aria-hidden>
        <rect
          x="10"
          y="10"
          width="100"
          height="180"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-ivory/30"
        />
        <line x1="10" y1="100" x2="110" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-ivory/20" />
        <circle cx="60" cy="100" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ivory/20" />
        <rect
          x="10"
          y={fillY}
          width="100"
          height={fillHeight}
          className="fill-bronze/25"
          style={{ transition: "y 0.1s linear, height 0.1s linear" }}
        />
        {/* Drone position dot */}
        <circle
          cx="60"
          cy={fillY}
          r="3"
          className="fill-champagne/80"
        />
      </svg>

      <div className="mt-3 space-y-1">
        {FOOTBALL_ZONES.map((zone) => (
          <p
            key={zone.id}
            className={cn(
              "text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-700",
              footballZone === zone.id ? "text-champagne opacity-90" : "text-ivory/25"
            )}
          >
            {zone.label}
          </p>
        ))}
      </div>
    </div>
  );
}
