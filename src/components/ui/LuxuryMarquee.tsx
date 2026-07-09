"use client";

import { cn } from "@/lib/utils";

interface LuxuryMarqueeProps {
  items: readonly string[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
  separator?: string;
  light?: boolean;
}

const speeds = {
  slow: "marquee-slow",
  normal: "marquee-normal",
  fast: "marquee-fast",
};

export function LuxuryMarquee({
  items,
  className,
  speed = "normal",
  separator = "·",
  light = false,
}: LuxuryMarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn("marquee-mask overflow-hidden py-6 border-y", light ? "border-ivory/10" : "border-forest/10", className)}
      aria-hidden
    >
      <div className={cn("marquee-track flex w-max gap-12", speeds[speed])}>
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={cn(
              "flex items-center gap-12 shrink-0 text-[clamp(1.25rem,3vw,2.25rem)] font-light tracking-[-0.02em] whitespace-nowrap",
              light ? "text-ivory/40" : "text-forest/25",
              "font-sans"
            )}
          >
            {item}
            <span className={cn("text-sm", light ? "text-gold/50" : "text-gold-muted/60")}>
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
