"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface DescentLabelProps {
  label: string;
  index: number;
  total: number;
  scale: number;
  scrollYProgress: MotionValue<number>;
}

export function DescentLabel({
  label,
  index,
  total,
  scale,
  scrollYProgress,
}: DescentLabelProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.08, end - 0.05, end],
    [0, 1, 1, 0]
  );
  const labelScale = useTransform(scrollYProgress, [start, end], [0.85 + scale * 0.1, scale]);

  return (
    <motion.p
      style={{ opacity, scale: labelScale }}
      className="text-masthead font-light text-ivory/90 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
    >
      {label}
    </motion.p>
  );
}
