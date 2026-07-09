"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { ASSETS } from "@/lib/assets";

interface WowMorphProps {
  scrollYProgress: MotionValue<number>;
  /** When morph begins / completes within parent scroll (0–1) */
  range?: [number, number];
}

/**
 * Signature transition: football centre circle → clubhouse roof on master plan.
 * One unforgettable morph.
 */
export function WowMorph({ scrollYProgress, range = [0.82, 0.96] }: WowMorphProps) {
  const [start, end] = range;
  const morph = useTransform(scrollYProgress, [start, end], [0, 1]);
  const footballOpacity = useTransform(morph, [0, 0.45, 0.55], [1, 1, 0]);
  const planOpacity = useTransform(morph, [0.4, 0.6, 1], [0, 1, 1]);
  const circleScale = useTransform(morph, [0, 0.5, 1], [0.08, 0.35, 0.55]);
  const circleY = useTransform(morph, [0, 1], ["55%", "42%"]);
  const ringOpacity = useTransform(morph, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.85]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div style={{ opacity: footballOpacity }} className="absolute inset-0">
        <HighQualityImage
          src={ASSETS.seaImg}
          alt=""
          fill
          sizes="100vw"
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest-dark/40" />
      </motion.div>

      <motion.div style={{ opacity: planOpacity }} className="absolute inset-0 bg-ivory">
        <HighQualityImage
          src={ASSETS.locationMap}
          alt="Master plan aerial"
          fill
          unoptimized
          className="object-contain p-10 md:p-20"
        />
      </motion.div>

      {/* Centre circle morphs into clubhouse roof */}
      <motion.div
        style={{
          scale: circleScale,
          top: circleY,
          opacity: ringOpacity,
        }}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,520px)] aspect-square rounded-full border border-bronze/50 bg-bronze/10 backdrop-blur-[2px] wow-morph-ring"
        aria-hidden
      />
    </div>
  );
}
