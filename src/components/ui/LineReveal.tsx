"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/animations";

interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "div";
  /** Delay before first line — sync with hero reveal */
  delay?: number;
  /** Seconds between each line */
  stagger?: number;
  active?: boolean;
}

/** Each line reveals independently — expensive, slow, no typewriter */
export function LineReveal({
  lines,
  className,
  lineClassName,
  as: Tag = "h1",
  delay = 0,
  stagger = 0.45,
  active = true,
}: LineRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Tag className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true" className="block">
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className={cn("block", lineClassName)}
              initial={{ y: reduceMotion ? 0 : "108%", opacity: reduceMotion ? 1 : 0 }}
              animate={
                active
                  ? { y: 0, opacity: 1 }
                  : { y: "108%", opacity: 0 }
              }
              transition={{
                duration: duration.cinematic,
                ease: ease.cinematic,
                delay: reduceMotion ? 0 : delay + i * stagger,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
