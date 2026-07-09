"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { COPY, getChapter, PHASE_DETAILS } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

/**
 * Chapter 4 — Master Plan
 * Revealed gradually. Hover illuminates. Nothing technical.
 */
export function MasterPlanJourney() {
  const ref = useRef<HTMLElement>(null);
  const [hoverZone, setHoverZone] = useState<string | null>(null);
  const { masterPlan } = COPY;
  const chapter = getChapter("master-plan")!;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mapReveal = useTransform(scrollYProgress, [0, 0.4], [0.15, 1]);
  const mapY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const towerScale = useTransform(scrollYProgress, [0.5, 0.9], [1, 1.08]);
  const towerOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);

  const zones = [
    { id: "sport", label: "Sports District", x: "62%", y: "55%" },
    { id: "club", label: "Clubhouse", x: "38%", y: "42%" },
    { id: "residences", label: "Residences", x: "48%", y: "58%" },
    { id: "green", label: "Native Canopy", x: "28%", y: "65%" },
  ];

  return (
    <section id="master-plan" ref={ref} className="relative bg-ivory overflow-hidden min-h-screen">
      <div className="section-padding">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-colophon text-stone-dark mb-8">
            {chapter.number} — {chapter.title}
          </p>
          <TextReveal as="h2" className="text-masthead text-forest font-light mb-6">
            {masterPlan.headline}
          </TextReveal>
          <p className="text-title text-forest/80 font-light mb-6 max-w-2xl">{masterPlan.subheadline}</p>
          <p className="text-body text-grey-600 leading-[1.85] max-w-2xl mb-16">{masterPlan.body}</p>

          <motion.div
            style={{ scale: mapReveal, y: mapY }}
            className="relative aspect-[16/10] bg-forest/[0.03] overflow-hidden mb-12 origin-center"
          >
            <HighQualityImage
              src={ASSETS.locationMap}
              alt="Master plan — Nambiar District 25"
              fill
              unoptimized
              className="object-contain p-6 md:p-12"
              sizes="90vw"
            />
            {zones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer group"
                style={{ left: zone.x, top: zone.y }}
                onMouseEnter={() => setHoverZone(zone.id)}
                onMouseLeave={() => setHoverZone(null)}
                data-cursor-detail={zone.label}
                aria-label={zone.label}
              >
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                    hoverZone === zone.id
                      ? "bg-bronze/30 scale-150"
                      : "bg-bronze/10 scale-100 group-hover:bg-bronze/20 group-hover:scale-125"
                  }`}
                />
                <span
                  className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-colophon whitespace-nowrap transition-opacity duration-700 ${
                    hoverZone === zone.id ? "opacity-100 text-forest" : "opacity-0"
                  }`}
                >
                  {zone.label}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Zoom into tower — transition to homes */}
          <motion.div
            style={{ opacity: towerOpacity, scale: towerScale }}
            className="relative aspect-[21/9] overflow-hidden origin-center"
          >
            <HighQualityImage
              src={ASSETS.heroTowers}
              alt="Phase 3 towers"
              fill
              unoptimized
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
            <p className="absolute bottom-8 left-8 text-colophon text-forest/60">
              {PHASE_DETAILS.towers} · {PHASE_DETAILS.units.toLocaleString()} units
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
