"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { useInquiry } from "@/components/providers/InquiryProvider";
import { SITE, VOICE, OVERVIEW_IMAGES } from "@/lib/constants";
import { ease } from "@/lib/animations";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const { openInquiry } = useInquiry();
  const { finalCta } = VOICE;

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.03]">
        <HighQualityImage
          src={OVERVIEW_IMAGES[2]}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest-dark/88 vignette" />

      <div className="relative z-10 section-padding w-full">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-caption text-gold mb-8 tracking-[0.22em] font-light"
          >
            {finalCta.eyebrow}
          </motion.p>
          <TextReveal as="h2" className="text-display text-ivory font-light mb-8 leading-[0.95]">
            {finalCta.headline}
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: ease.luxury }}
            className="text-body text-ivory/60 max-w-xl mx-auto mb-12 leading-[1.85]"
          >
            {finalCta.body}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease: ease.luxury }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="invitation" size="lg" onClick={() => openInquiry("enquire")}>
              {finalCta.submitLabel}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="normal-case tracking-[0.06em] font-light"
              onClick={() => openInquiry("brochure")}
            >
              {VOICE.cta.collection}
            </Button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-caption text-ivory/40 mt-12 tracking-[0.15em]"
          >
            {SITE.phone} · RERA: {SITE.rera}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
