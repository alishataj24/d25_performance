"use client";

import { motion } from "framer-motion";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { COPY, getChapter } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { ease, duration } from "@/lib/animations";

export function MasterPlan() {
  const { masterPlan } = COPY;
  const chapter = getChapter("master-plan")!;

  return (
    <SectionShell
      id="master-plan"
      chapter={chapter}
      tone="charcoal"
      innerClassName="!pb-10 md:!pb-12"
    >
      <div className="mb-8 md:mb-10 max-w-3xl">
        <TextReveal as="h2" className="h-section text-ivory">
          {masterPlan.headline}
        </TextReveal>
        <p className="mt-4 text-body text-champagne">{masterPlan.subheadline}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: duration.slow, ease: ease.out }}
        className="overflow-hidden rounded-[var(--radius-card-lg)] border border-ivory/10 bg-black shadow-[var(--shadow-float)]"
      >
        <div className="relative aspect-[16/9] w-full">
          <ZoomableImage
            src={ASSETS.masterplan}
            alt="Nambiar District 25 master plan"
            className="h-full w-full"
          />
        </div>
      </motion.div>
    </SectionShell>
  );
}
