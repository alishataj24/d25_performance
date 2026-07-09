"use client";

import { cn } from "@/lib/utils";

/** Emotional beat of the documentary journey */
export type StoryEmotion =
  | "Curiosity"
  | "Wonder"
  | "Discovery"
  | "Admiration"
  | "Trust"
  | "Aspiration"
  | "Desire"
  | "Confidence"
  | "Action";

interface SceneProps {
  emotion: StoryEmotion;
  children: React.ReactNode;
  className?: string;
}

export function Scene({ emotion, children, className }: SceneProps) {
  return (
    <div
      data-scene-emotion={emotion}
      className={cn("scene", className)}
      role="region"
      aria-label={`Scene — ${emotion}`}
    >
      {children}
    </div>
  );
}
