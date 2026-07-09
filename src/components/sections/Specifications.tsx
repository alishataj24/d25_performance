"use client";

import { TextReveal } from "@/components/ui/TextReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { COPY, getChapter, PHASE_DETAILS, STATS } from "@/lib/constants";
import { motion } from "framer-motion";

export function Specifications() {
  const { specifications } = COPY;
  const chapter = getChapter("specifications")!;

  return (
    <SectionShell id="specifications" chapter={chapter} tone="light">
      <div className="max-w-4xl mb-14 md:mb-20">
        <TextReveal as="h2" className="h-section text-forest mb-6">
          {specifications.headline}
        </TextReveal>
        <span className="kicker">{specifications.subheadline}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-10"
        >
          <p className="text-body text-forest leading-[1.85]">
            <span className="text-title text-gold font-light">
              {PHASE_DETAILS.units.toLocaleString()}
            </span>{" "}
            Units in Phase 3 {specifications.unitsLine}
          </p>
          <p className="text-body text-grey-600">
            {PHASE_DETAILS.towers} {specifications.towersLabel}
          </p>
          {PHASE_DETAILS.towerSpecs.map((spec) => (
            <p key={spec} className="text-body text-grey-600 leading-[1.85] pl-6 border-l border-stone/80">
              {spec}
            </p>
          ))}
          <p className="text-body text-grey-600 pt-4">
            {PHASE_DETAILS.clubhouse} Clubhouse across {PHASE_DETAILS.clubhouseArea}
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="lg:col-span-6 stat-editorial"
        >
          {STATS.map((stat) => (
            <li key={stat.label}>
              <span className="stat-editorial-label">{stat.label}</span>
              <span className="stat-editorial-value">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </SectionShell>
  );
}
