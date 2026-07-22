"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { SceneDirector } from "@/components/ui/SceneDirector";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { COPY, PHASE_DETAILS } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { fadeUp, staggerContainer } from "@/lib/animations";

/** Structured tower breakdown — mirrors the original's Phase 3 Details */
const TOWER_BREAKDOWN = [
  {
    count: "Two",
    floors: 36,
    parking: "3 parking levels",
  },
  {
    count: "Four",
    floors: 38,
    parking: "4 parking levels",
    sub: "Basement & ground",
  },
] as const;

export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const { vision } = COPY;

  return (
    <section id="vision" ref={ref} className="relative bg-canvas-deep text-ivory overflow-hidden">
      <SceneDirector sceneId="vision">
        <div className="section-padding px-container relative z-[1]">
          <div className="mx-frame">
            {/* Header */}
            <div className="max-w-[840px]">
              <span className="kicker !text-champagne mb-6">
                {vision.phaseLabel}
              </span>
              <TextReveal as="h2" className="h-section text-ivory">
                {vision.phaseHeadline}
              </TextReveal>
              <p className="mt-7 max-w-[54ch] text-[clamp(1.02rem,1.4vw,1.2rem)] font-light leading-[1.8] text-ivory/65">
                A landmark composition of villa-style skyrise residences — engineered
                for privacy, light, and comfort.
              </p>
            </div>

            <div className="mt-14 md:mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
              {/* Left — tower render */}
              <motion.div style={{ y: imageY }}>
                <div className="relative overflow-hidden rounded-[var(--radius-card-lg)] aspect-[4/5] shadow-[var(--shadow-float)]">
                  <HighQualityImage
                    src={ASSETS.renders.phase3Lifestyle}
                    alt="Nambiar District 25 Phase 3 — lifestyle artistic impression"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="!object-cover !object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(10,18,14,0.55)_100%)]" />
                  <p className="absolute bottom-5 left-6 text-caption tracking-[0.14em] text-ivory/55">
                    Artistic Impression
                  </p>
                </div>
              </motion.div>

              {/* Right — the numbers + breakdown */}
              <div>
                {/* Headline stats */}
                <div className="grid grid-cols-2 gap-8 border-b border-ivory/12 pb-10">
                  <div>
                    <span className="block text-[clamp(3rem,6vw,5rem)] font-light leading-none tracking-[-0.03em] text-gold-light">
                      <AnimatedNumber value={PHASE_DETAILS.units} />
                    </span>
                    <span className="mt-3 block text-[0.72rem] uppercase tracking-[0.18em] text-ivory/50">
                      Units in Phase 3
                    </span>
                    <span className="mt-1 block text-sm text-ivory/40">{vision.unitsLine}</span>
                  </div>
                  <div>
                    <span className="block text-[clamp(3rem,6vw,5rem)] font-light leading-none tracking-[-0.03em] text-gold-light">
                      <AnimatedNumber value={PHASE_DETAILS.towers} />
                    </span>
                    <span className="mt-3 block text-[0.72rem] uppercase tracking-[0.18em] text-ivory/50">
                      Skyrise Towers
                    </span>
                    <span className="mt-1 block text-sm text-ivory/40">Composed with intention</span>
                  </div>
                </div>

                {/* Tower breakdown cards */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-10 space-y-4"
                >
                  {TOWER_BREAKDOWN.map((tower) => (
                    <motion.div
                      key={tower.floors}
                      variants={fadeUp}
                      className="flex items-center gap-6 rounded-[var(--radius-card)] border border-ivory/10 bg-ivory/[0.03] p-6 transition-colors duration-500 hover:border-champagne/30 hover:bg-ivory/[0.05]"
                    >
                      <div className="flex shrink-0 flex-col items-center">
                        <span className="text-[clamp(2.2rem,3.4vw,3rem)] font-light leading-none text-ivory">
                          {tower.floors}
                        </span>
                        <span className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-ivory/45">
                          Floors
                        </span>
                      </div>
                      <span className="h-14 w-px bg-ivory/12" aria-hidden />
                      <div>
                        <p className="text-[1.05rem] font-light text-ivory">
                          {tower.count} towers
                        </p>
                        <p className="mt-1 text-sm text-champagne/90">{tower.parking}</p>
                        {"sub" in tower && (
                          <p className="mt-0.5 text-xs tracking-[0.06em] text-ivory/40">{tower.sub}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </SceneDirector>
    </section>
  );
}
