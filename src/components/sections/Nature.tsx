"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { EditorialSplit } from "@/components/ui/EditorialSplit";
import { COPY, getChapter } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

export function Nature() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const { nature } = COPY;
  const chapter = getChapter("nature")!;

  return (
    <section id="nature" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.03]">
        <HighQualityImage
          src={ASSETS.renders.aerial}
          alt="Native tree canopy at District 25"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest-dark/72" />

      <div className="relative z-10 section-padding w-full">
        <div className="max-w-[1500px] mx-auto">
          <EditorialSplit
            aside={
              <motion.div style={{ y: textY }}>
                <span className="kicker !text-champagne mb-7">
                  {chapter.title} · {chapter.number}
                </span>
                <TextReveal as="h2" className="h-section text-ivory mb-10">
                  {nature.headline}
                </TextReveal>
                {nature.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-body text-ivory/65 leading-[1.85] mb-8 !max-w-none"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            }
            stickyAside={false}
          >
            <ul className="space-y-0">
              {nature.features.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-8 py-6 border-b border-ivory/10 last:border-0"
                >
                  <span className="text-colophon text-gold/50 w-8">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-title text-ivory font-light">{item}</span>
                </motion.li>
              ))}
            </ul>
          </EditorialSplit>
        </div>
      </div>
    </section>
  );
}
