"use client";

import { cn } from "@/lib/utils";

type TransitionVariant = "breath" | "dissolve-ivory-forest" | "dissolve-forest-charcoal" | "dissolve-charcoal-ivory";

interface SceneTransitionProps {
  variant?: TransitionVariant;
  className?: string;
}

const variants: Record<TransitionVariant, string> = {
  breath: "scene-transition-breath",
  "dissolve-ivory-forest": "scene-transition-dissolve scene-dissolve-to-forest",
  "dissolve-forest-charcoal": "scene-transition-dissolve scene-dissolve-to-charcoal",
  "dissolve-charcoal-ivory": "scene-transition-dissolve scene-dissolve-to-ivory",
};

/** A pause between scenes — like a cut to black in documentary film */
export function SceneTransition({
  variant = "breath",
  className,
}: SceneTransitionProps) {
  return (
    <div
      className={cn(variants[variant], className)}
      aria-hidden
      role="presentation"
    />
  );
}
