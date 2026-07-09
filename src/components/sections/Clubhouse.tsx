"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { Chapter } from "@/components/ui/Chapter";
import { PHASE_DETAILS, COPY, getChapter } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

export function Clubhouse() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const { clubhouse } = COPY;
  const chapter = getChapter("clubhouse")!;

  return (
    <section id="clubhouse" ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.03]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          aria-hidden
        >
          <source src={ASSETS.video} type="video/mp4" />
        </video>
        <HighQualityImage src={ASSETS.gallery[2]} alt="Clubhouse at District 25" fill sizes="100vw" className="object-cover mix-blend-multiply opacity-90" />
        <div className="absolute inset-0 bg-forest-dark/75" />
      </motion.div>
      <div className="relative z-10 section-padding w-full">
        <div className="max-w-[1500px] mx-auto max-w-2xl">
          <Chapter number={chapter.number} title={chapter.title} chapterId={chapter.id} light />
          <TextReveal as="h2" className="h-section text-ivory mb-6">
            {clubhouse.headline}
          </TextReveal>
          <p className="text-[0.9rem] tracking-[0.02em] text-champagne mb-10">
            {PHASE_DETAILS.clubhouse} across {PHASE_DETAILS.clubhouseArea} · {clubhouse.subheadline}
          </p>
          <p className="text-body text-ivory/70 leading-[1.85] !max-w-none">{clubhouse.body}</p>
        </div>
      </div>
    </section>
  );
}
