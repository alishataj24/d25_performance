"use client";

import { cn } from "@/lib/utils";
import type { MorphVariant } from "@/lib/narrative-journey";

const morphGradients: Record<MorphVariant, string> = {
  "ivory-forest":
    "linear-gradient(to bottom, var(--ivory) 0%, color-mix(in srgb, var(--ivory) 20%, var(--forest-dark)) 45%, var(--forest-dark) 100%)",
  "forest-charcoal":
    "linear-gradient(to bottom, var(--forest-dark) 0%, color-mix(in srgb, var(--forest-dark) 30%, var(--charcoal)) 50%, var(--charcoal) 100%)",
  "charcoal-ivory":
    "linear-gradient(to bottom, var(--charcoal) 0%, color-mix(in srgb, var(--charcoal) 25%, var(--ivory)) 50%, var(--ivory) 100%)",
  "forest-ivory":
    "linear-gradient(to bottom, var(--forest) 0%, color-mix(in srgb, var(--forest) 20%, var(--ivory)) 55%, var(--ivory) 100%)",
  "charcoal-forest":
    "linear-gradient(to bottom, var(--charcoal) 0%, color-mix(in srgb, var(--charcoal) 35%, var(--forest)) 50%, var(--forest) 100%)",
  "ivory-charcoal":
    "linear-gradient(to bottom, var(--ivory) 0%, color-mix(in srgb, var(--ivory) 15%, var(--charcoal)) 50%, var(--charcoal) 100%)",
  "transparent-forest":
    "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, transparent 60%, var(--forest)) 70%, var(--forest) 100%)",
  "transparent-charcoal":
    "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, transparent 50%, var(--charcoal)) 65%, var(--charcoal) 100%)",
};

interface ChapterMorphProps {
  variant: MorphVariant;
  className?: string;
  height?: "short" | "medium" | "tall";
}

const heights = {
  short: "h-[18vh]",
  medium: "h-[28vh]",
  tall: "h-[40vh]",
};

/**
 * Invisible bridge between chapters — the cut never happens.
 * Overlaps adjacent sections so colour bleeds continuously.
 */
export function ChapterMorph({
  variant,
  className,
  height = "medium",
}: ChapterMorphProps) {
  return (
    <div
      className={cn(
        "chapter-morph relative z-[5] -mt-[14vh] -mb-[14vh] pointer-events-none",
        heights[height],
        className
      )}
      style={{ background: morphGradients[variant] }}
      aria-hidden
    />
  );
}
