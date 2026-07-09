"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { LineReveal } from "@/components/ui/LineReveal";
import { HeroPill } from "@/components/ui/HeroPill";
import { useInquiry } from "@/components/providers/InquiryProvider";
import { SITE, VOICE, OVERVIEW_IMAGES } from "@/lib/constants";

/**
 * Chapter 11 — Private Presentation
 * Luxury hospitality. Welcomed, not captured.
 */
export function PrivatePresentation() {
  const ref = useRef<HTMLElement>(null);
  const { openConcierge } = useInquiry();
  const { finalCta } = VOICE;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const lightWarmth = useTransform(scrollYProgress, [0, 0.5], [0.88, 0.78]);

  return (
    <section
      id="invitation"
      ref={ref}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.04]">
        <HighQualityImage src={OVERVIEW_IMAGES[2]} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <motion.div
        style={{ opacity: lightWarmth }}
        className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/85 to-forest-dark/60"
      />
      <div className="absolute inset-0 hero-grain opacity-20" aria-hidden />

      <div className="relative z-10 section-padding w-full">
        <div className="max-w-[820px]">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6 }}
            className="kicker !text-champagne mb-8"
          >
            {finalCta.eyebrow}
          </motion.span>

          <LineReveal
            as="h2"
            active
            lines={[finalCta.headline]}
            className="text-masthead md:text-[clamp(3.5rem,8vw,6rem)] text-ivory font-light leading-[0.92] mb-10"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-body text-ivory/60 !max-w-none leading-[1.85] mb-14"
          >
            {finalCta.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.4 }}
            className="flex flex-wrap gap-4"
          >
            <HeroPill variant="primary" onClick={() => openConcierge("enquire")}>
              {VOICE.hero.privatePresentation}
            </HeroPill>
            <HeroPill variant="secondary" onClick={() => openConcierge("viewing")} showArrow>
              {VOICE.cta.privateViewing}
            </HeroPill>
            <HeroPill variant="secondary" href={SITE.brochure}>
              {VOICE.cta.collection}
            </HeroPill>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-colophon text-ivory/35 mt-16"
          >
            {SITE.phone} · RERA: {SITE.rera}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
