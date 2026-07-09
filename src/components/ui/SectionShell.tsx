"use client";

import { Chapter } from "@/components/ui/Chapter";
import { SceneDirector } from "@/components/ui/SceneDirector";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark" | "forest" | "charcoal";

const tones: Record<Tone, string> = {
  light: "experience-light",
  dark: "bg-forest-dark text-ivory",
  forest: "bg-forest text-ivory",
  charcoal: "bg-charcoal text-ivory",
};

interface SectionShellProps {
  id?: string;
  chapter?: { id: string; number: string; title: string };
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function SectionShell({
  id,
  chapter,
  tone = "light",
  className,
  innerClassName,
  children,
  fullWidth = false,
}: SectionShellProps) {
  const sceneId = chapter?.id ?? id ?? "section";

  return (
    <section id={id} className={cn("relative overflow-x-clip", tones[tone], className)}>
      <SceneDirector sceneId={sceneId}>
        <div className={cn(!fullWidth && "section-padding", innerClassName)}>
          <div className={cn(!fullWidth && "max-w-[1500px] mx-auto")}>
            {chapter && (
              <Chapter
                number={chapter.number}
                title={chapter.title}
                chapterId={chapter.id}
                light={tone !== "light"}
              />
            )}
            {children}
          </div>
        </div>
      </SceneDirector>
    </section>
  );
}
