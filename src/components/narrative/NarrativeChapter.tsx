"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface NarrativeChapterProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Pull up into previous chapter for seamless overlap */
  overlap?: boolean;
  /** Enable subtle depth parallax on scroll */
  depth?: boolean;
  emotion?: string;
}

/**
 * One chapter in the continuous film.
 * Never feels like a new section — feels like the next step.
 */
export function NarrativeChapter({
  id,
  children,
  className,
  overlap = true,
  depth = false,
  emotion,
}: NarrativeChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const layerBg = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const layerFg = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);

  return (
    <div
      id={id}
      ref={ref}
      data-narrative-chapter
      data-emotion={emotion}
      className={cn(
        "narrative-chapter relative",
        overlap && "narrative-chapter-overlap",
        className
      )}
    >
      {depth && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none z-0 opacity-30"
            style={{ y: layerBg }}
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone/5 to-transparent" />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 top-0 h-32 pointer-events-none z-[1]"
            style={{ y: layerFg }}
            aria-hidden
          >
            <div className="h-full bg-gradient-to-b from-charcoal/8 to-transparent" />
          </motion.div>
        </>
      )}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
