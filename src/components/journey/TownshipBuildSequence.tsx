"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/animations";

/** Township builds itself before the user arrives */
export function TownshipBuildSequence() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Roads draw */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <motion.path
          d="M 40 220 Q 120 200, 200 210 T 360 190"
          fill="none"
          stroke="var(--bronze)"
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: ease.cinematic, delay: 0.3 }}
        />
        <motion.path
          d="M 200 80 L 200 250"
          fill="none"
          stroke="var(--bronze)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: ease.cinematic, delay: 0.8 }}
        />
      </svg>

      {/* Trees grow */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-olive/40"
          style={{
            left: `${8 + (i % 4) * 22}%`,
            bottom: `${18 + Math.floor(i / 4) * 12}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 1 + i * 0.08, ease: ease.cinematic }}
        />
      ))}

      {/* Building rises */}
      <motion.div
        className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-24 h-32 border border-ivory/10 bg-ivory/5"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.35 }}
        transition={{ duration: 1.6, ease: ease.cinematic, delay: 1.4 }}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Water shimmer */}
      <motion.div
        className="absolute bottom-[18%] left-[30%] right-[30%] h-px bg-champagne/30"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.5 }}
        transition={{ duration: 1.4, delay: 2, ease: ease.cinematic }}
      />

      {/* Lights */}
      <motion.div
        className="absolute bottom-[38%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-champagne/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.4] }}
        transition={{ duration: 2, delay: 2.4, ease: "easeInOut" }}
      />
    </div>
  );
}
