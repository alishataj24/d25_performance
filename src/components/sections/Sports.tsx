"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { PublicationImage } from "@/components/ui/PublicationImage";
import { SectionShell } from "@/components/ui/SectionShell";
import { EditorialList } from "@/components/ui/EditorialList";
import { SPORTS, COPY, getChapter } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

export function Sports() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const { sports } = COPY;
  const chapter = getChapter("sports-district")!;

  return (
    <div id="sports-district" ref={containerRef}>
      <SectionShell chapter={chapter} tone="charcoal" className="!overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 mb-16 md:mb-24">
          <TextReveal as="h2" className="h-section text-ivory">
            {sports.headline}
          </TextReveal>
          <p className="text-body text-ivory/55 leading-[1.85] lg:pt-4 !max-w-none">
            {sports.body}
          </p>
        </div>

        <motion.div style={{ y: imageY }} className="relative mb-20 md:mb-28 -mx-6 md:-mx-12 lg:-mx-20">
          <div className="p-card overflow-hidden rounded-[var(--radius-card-lg)]">
            <PublicationImage
              src={ASSETS.seaImg}
              alt="Sports facilities at District 25"
              aspect="full"
              sizes="100vw"
            />
          </div>
        </motion.div>

        <div className="mb-20 md:mb-28">
          <EditorialList items={SPORTS} light columns={2} />
        </div>

        <div className="space-y-14 md:space-y-20 pt-16 border-t border-ivory/10 max-w-3xl">
          {sports.highlights.map((item, i) => (
            <article key={item.label}>
              <span className="text-colophon text-gold/50 block mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-title text-ivory font-light mb-4">{item.label}</h3>
              <p className="text-body text-ivory/50 leading-[1.85]">{item.desc}</p>
            </article>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
