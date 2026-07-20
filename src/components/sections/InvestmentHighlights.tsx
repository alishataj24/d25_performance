"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { PublicationImage } from "@/components/ui/PublicationImage";
import { SectionShell } from "@/components/ui/SectionShell";
import { HIGHLIGHTS, COPY, getChapter, OVERVIEW_IMAGES } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

const HIGHLIGHT_IMAGES = [
  OVERVIEW_IMAGES[0],
  OVERVIEW_IMAGES[1],
  ASSETS.slider.web2,
  ASSETS.gallery[1],
  ASSETS.heroTowers,
] as const;

export function InvestmentHighlights() {
  const { investment } = COPY;
  const chapter = getChapter("investment")!;

  return (
    <SectionShell id="investment" chapter={chapter} tone="charcoal" className="!overflow-visible">
      <div className="max-w-4xl mb-14 md:mb-20">
        <TextReveal as="h2" className="h-section text-ivory mb-8">
          {investment.headline}
        </TextReveal>
        <p className="text-title text-ivory/55 font-light leading-snug">{investment.subheadline}</p>
      </div>

      <div className="space-y-20 md:space-y-28">
        {HIGHLIGHTS.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
              i % 2 === 1 ? "lg:[direction:rtl]" : ""
            }`}
          >
            <div className={`lg:col-span-5 space-y-5 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
              <span className="text-[0.8rem] font-medium tracking-[0.2em] text-champagne">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-card text-ivory">{item.title}</h3>
            </div>
            <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
              <div className="p-card p-card-interactive overflow-hidden">
                <PublicationImage
                  src={HIGHLIGHT_IMAGES[i] ?? HIGHLIGHT_IMAGES[0]}
                  alt={item.title}
                  aspect={i === 2 ? "tall" : "cinematic"}
                  unoptimized={HIGHLIGHT_IMAGES[i]?.endsWith(".png")}
                  sizes="55vw"
                  className="p-card-media"
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
