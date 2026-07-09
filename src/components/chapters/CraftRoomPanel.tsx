"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { PublicationImage } from "@/components/ui/PublicationImage";
import type { CRAFT_ROOMS } from "@/lib/narrative-journey";

interface CraftRoomPanelProps {
  room: (typeof CRAFT_ROOMS)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  imageSrc: string;
  showStats?: React.ReactNode;
}

export function CraftRoomPanel({
  room,
  index,
  total,
  scrollYProgress,
  imageSrc,
  showStats,
}: CraftRoomPanelProps) {
  const start = index / total;
  const end = Math.min((index + 1) / total, 1);
  const span = end - start;
  const fade = span * 0.22;
  const fadeInEnd = Math.min(start + fade, end);
  const fadeOutStart = Math.max(fadeInEnd + 0.001, end - fade);
  const isLast = index === total - 1;

  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [start, fadeInEnd, 1]
      : [start, fadeInEnd, fadeOutStart, end],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 section-padding flex items-center pointer-events-none"
    >
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center pointer-events-auto">
        <div className="lg:col-span-5 lg:col-start-2">
          <span className="text-colophon text-stone-dark block mb-6">
            {String(index + 1).padStart(2, "0")} — {room.title}
          </span>
          <h3 className="text-title text-forest font-light mb-8">{room.title}</h3>
          <p className="text-body text-grey-600 leading-[1.85] !max-w-none">{room.spec}</p>
          {showStats}
        </div>
        <div className="lg:col-span-6">
          <PublicationImage src={imageSrc} alt={`${room.title} — District 25`} aspect="cinematic" sizes="55vw" />
        </div>
      </div>
    </motion.div>
  );
}
