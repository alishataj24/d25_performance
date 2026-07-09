"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { EditorialSplit } from "@/components/ui/EditorialSplit";
import { PublicationImage } from "@/components/ui/PublicationImage";
import { PHASE_DETAILS, COPY, getChapter } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

export function Architecture() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-6%", "12%"]);
  const { architecture } = COPY;
  const chapter = getChapter("architecture")!;

  return (
    <section id="architecture" ref={ref}>
      <div className="section-padding px-container bg-canvas">
        <div className="mx-frame">
          <span className="kicker mb-8">
            {chapter.title} · {chapter.number}
          </span>
          <EditorialSplit
            aside={
              <>
                <TextReveal as="h2" className="h-section text-forest mb-8">
                  {architecture.headline}
                </TextReveal>
                <p className="text-body text-grey-600 leading-[1.85] mb-10 !max-w-none">{architecture.body}</p>
                <ul className="space-y-6 border-t border-forest/10 pt-10">
                  {PHASE_DETAILS.towerSpecs.map((spec, i) => (
                    <li key={spec} className="flex gap-6 items-baseline">
                      <span className="text-[0.8rem] font-medium tracking-[0.18em] text-bronze w-8">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-body text-grey-600 leading-relaxed">{spec}</p>
                    </li>
                  ))}
                </ul>
              </>
            }
          >
            <div className="relative">
              <motion.div style={{ y: y1 }} className="relative z-10 w-[78%]">
                <div className="p-card p-card-interactive overflow-hidden">
                  <PublicationImage
                    src={ASSETS.config.conf3}
                    alt="Tower architecture"
                    aspect="tall"
                    sizes="40vw"
                    className="p-card-media"
                  />
                </div>
              </motion.div>
              <motion.div style={{ y: y2 }} className="absolute right-0 top-[18%] w-[58%] z-0">
                <div className="p-card overflow-hidden">
                  <PublicationImage
                    src={ASSETS.heroTowers}
                    alt="Facade at dusk"
                    aspect="portrait"
                    unoptimized
                    sizes="35vw"
                  />
                </div>
              </motion.div>
            </div>
          </EditorialSplit>
        </div>
      </div>
    </section>
  );
}
