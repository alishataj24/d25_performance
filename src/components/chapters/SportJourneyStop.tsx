"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";

interface StopLayerProps {
  stop: (typeof import("@/lib/narrative-journey").SPORT_JOURNEY_STOPS)[number];
  index: number;
  stopCount: number;
  scrollYProgress: MotionValue<number>;
  chapterLabel: string;
  imageSrc: string;
}

function StopLayer({
  stop,
  index,
  stopCount,
  scrollYProgress,
  chapterLabel,
  imageSrc,
}: StopLayerProps) {
  const start = index / stopCount;
  const mid = (index + 0.5) / stopCount;
  const end = (index + 1) / stopCount;
  const opacity = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0, 1, index === stopCount - 1 ? 1 : 0]
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <HighQualityImage
        src={imageSrc}
        alt={stop.title}
        fill
        sizes="100vw"
        unoptimized={imageSrc.endsWith(".png")}
        className="object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/20" />
      <div className="absolute inset-0 flex items-end section-padding pb-24 md:pb-32">
        <div className="max-w-3xl">
          <span className="text-colophon text-bronze/60 block mb-6">
            {chapterLabel} · {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="text-masthead text-ivory font-light mb-6 leading-[0.95]">{stop.title}</h2>
          <p className="text-body text-ivory/60 !max-w-none leading-[1.85]">{stop.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export { StopLayer };
