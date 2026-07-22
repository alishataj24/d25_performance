"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/animations";
import { CHAPTER_ESSENCE } from "@/lib/constants";

interface ChapterProps {
  number: string;
  title: string;
  chapterId?: string;
  className?: string;
  light?: boolean;
}

export function Chapter({ title, chapterId, className, light }: ChapterProps) {
  const essence = chapterId ? CHAPTER_ESSENCE[chapterId] : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: duration.slow, ease: ease.drift }}
      className={cn("mb-5 md:mb-7", className)}
    >
      <span className={cn("kicker", light && "!text-champagne")}>
        {title}
      </span>
      {essence && (
        <p
          className={cn(
            "mt-3 text-[0.8rem] tracking-[0.02em]",
            light ? "text-ivory/40" : "text-grey-400"
          )}
        >
          {essence}
        </p>
      )}
    </motion.div>
  );
}
