"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  TIME_OF_DAY_STYLES,
  type TimeOfDay,
  type FlythroughWaypoint,
} from "@/lib/flythrough-journey";

interface FlythroughWaypointLayerProps {
  waypoint: FlythroughWaypoint;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  imageSrc: string;
}

export function FlythroughWaypointLayer({
  waypoint,
  index,
  total,
  scrollYProgress,
  imageSrc,
}: FlythroughWaypointLayerProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const span = end - start;
  const fade = span * 0.22;
  const fadeInEnd = start + fade;
  const fadeOutStart = Math.max(fadeInEnd + 0.001, end - fade);
  const isLast = index === total - 1;

  // Input offsets must be strictly non-decreasing for Framer Motion
  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [start, fadeInEnd, 1]
      : [start, fadeInEnd, fadeOutStart, end],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [start, start + span * 0.5], [1.06, 1]);
  const y = useTransform(scrollYProgress, [start, end], ["2%", "-2%"]);
  const textY = useTransform(scrollYProgress, [start, start + span * 0.5], [24, 0]);

  const todStyle = TIME_OF_DAY_STYLES[waypoint.timeOfDay];

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center building-breathe"
          style={{
            backgroundImage: `url(${imageSrc})`,
            filter: todStyle.filter,
          }}
        />
      </motion.div>

      {/* Season / time lighting */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: todStyle.gradient }} />

      {/* Night: apartment & floodlight accents */}
      {waypoint.timeOfDay === "night" && (
        <div className="absolute inset-0 pointer-events-none night-lights" aria-hidden />
      )}

      {/* Human scale — editorial caption */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-0 flex flex-col justify-end section-padding pb-28 md:pb-36 pointer-events-none"
      >
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-6 xl:col-span-5">
              <p className="text-colophon text-champagne/70 mb-4 cinematic-time">
                {waypoint.time}
              </p>
              <h2 className="text-masthead text-ivory font-light leading-[0.92] mb-4 architectural-text">
                {waypoint.title}
              </h2>
              <p className="text-body text-ivory/55 mb-6 !max-w-none">{waypoint.subtitle}</p>
              <p className="text-editorial text-ivory/70 italic max-w-md">{waypoint.humanMoment}</p>
            </div>
            {waypoint.layer && (
              <div className="lg:col-span-4 lg:col-start-9 hidden lg:block">
                <p className="text-colophon text-ivory/25 [writing-mode:vertical-rl] rotate-180 h-32">
                  {waypoint.layer}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
