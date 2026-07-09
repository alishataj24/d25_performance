"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

/** Proximity pull — calm, no spring bounce */
export function MagneticButton({
  children,
  className,
  onClick,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useTransform(x, (v) => v * 0.15);
  const smoothY = useTransform(y, (v) => v * 0.15);
  const [hovering, setHovering] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovering(false);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovering(true)}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: smoothX, y: smoothY }}
      className={cn(
        "relative inline-flex items-center justify-center",
        "w-16 h-16 rounded-full border border-bronze/40",
        "text-bronze hover:border-bronze hover:bg-bronze/8",
        "transition-colors duration-700 cursor-pointer",
        className
      )}
    >
      <motion.span
        animate={{ scale: hovering ? 1.04 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
