"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/animations";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  align?: "left" | "center" | "right";
}

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = "h2",
  align = "left",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });
  const words = children.split(" ");
  const justify =
    align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";

  return (
    <Tag ref={ref} className={cn(className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className={cn("flex flex-wrap", justify)}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] max-w-full">
            <motion.span
              className="inline-block"
              initial={{ y: "105%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
              transition={{
                duration: duration.normal,
                ease: ease.drift,
                delay: delay + i * 0.07,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
