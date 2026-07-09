"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/animations";

interface CinematicRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "scale";
}

export function CinematicReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: CinematicRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  const variants = {
    up: {
      hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
      visible: { opacity: 1, clipPath: "inset(0% 0 0 0)" },
    },
    left: {
      hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
      visible: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
    },
    scale: {
      hidden: { opacity: 0, scale: 1.08 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: duration.cinematic, ease: ease.cinematic, delay }}
      className={cn("overflow-hidden", className)}
    >
      {children}
    </motion.div>
  );
}
