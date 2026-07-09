"use client";

import { TextReveal } from "@/components/ui/TextReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { EditorialSplit } from "@/components/ui/EditorialSplit";
import { COPY, getChapter, PHASE_DETAILS } from "@/lib/constants";
import { motion } from "framer-motion";

export function ConstructionQuality() {
  const { construction } = COPY;
  const chapter = getChapter("construction")!;

  return (
    <SectionShell id="construction" chapter={chapter} tone="light">
      <EditorialSplit
        aside={
          <>
            <TextReveal as="h2" className="h-section text-forest mb-6">
              {construction.headline}
            </TextReveal>
            <p className="text-editorial text-forest mb-8">{construction.subheadline}</p>
            <p className="text-body text-grey-600 leading-[1.85]">{construction.body}</p>
          </>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ul className="space-y-8 border-t border-forest/10 pt-8">
            {PHASE_DETAILS.towerSpecs.map((spec, i) => (
              <li key={spec} className="flex gap-6">
                <span className="text-caption text-gold-muted w-8">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-body text-grey-600 leading-relaxed flex-1">{spec}</p>
              </li>
            ))}
          </ul>
          <p className="text-caption text-grey-400 mt-12 tracking-[0.12em]">{construction.artisticNote}</p>
          <p className="text-body text-grey-500 mt-6 leading-relaxed text-sm">
            {COPY.legal.disclaimer}
          </p>
        </motion.div>
      </EditorialSplit>
    </SectionShell>
  );
}
