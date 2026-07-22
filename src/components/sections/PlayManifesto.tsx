"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SceneDirector } from "@/components/ui/SceneDirector";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { COPY } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { ease, duration } from "@/lib/animations";

export function PlayManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const { philosophy } = COPY;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "5%"]);
  const headlineWords = philosophy.headline.split(" ");

  return (
    <section
      id="play-manifesto"
      ref={sectionRef}
      className="relative bg-ivory experience-light overflow-x-clip"
    >
      <SceneDirector sceneId="philosophy">
        <div className="section-padding px-container relative z-[1] !pt-14 md:!pt-16 !pb-12 md:!pb-16">
          <div className="mx-frame">
            {/* Centered editorial intro */}
            <div className="mx-auto max-w-[900px] text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: duration.slow, ease: ease.cinematic }}
                className="kicker kicker-center justify-center mb-8"
              >
                The Idea
              </motion.span>

              <h2>
                <span className="sr-only">{philosophy.headline}</span>
                <span aria-hidden className="flex flex-wrap justify-center gap-x-[0.28em]">
                  {headlineWords.map((word, i) => {
                    const isPlay = word.toLowerCase() === "play";
                    return (
                      <motion.span
                        key={word}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: duration.slow,
                          ease: ease.cinematic,
                          delay: i * 0.09,
                        }}
                        className={`text-[clamp(2.1rem,5vw,4.25rem)] font-light leading-[1.03] tracking-[-0.025em] ${
                          isPlay ? "text-bronze italic" : "text-forest"
                        }`}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: duration.slow, delay: 0.2, ease: ease.cinematic }}
                className="mx-auto mt-8 max-w-[54ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.75] text-[#2b2721]"
              >
                {philosophy.opening}
              </motion.p>
            </div>

            {/* Image + cure card, side by side */}
            <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: duration.cinematic, ease: ease.cinematic }}
                className="lg:col-span-7"
              >
                <div className="p-card relative w-full aspect-[16/10] overflow-hidden lg:h-full lg:min-h-[320px] lg:aspect-auto">
                  <motion.div className="absolute inset-0" style={{ y: imageY }}>
                    <HighQualityImage
                      src={ASSETS.config.creative3}
                      alt="Sport and play at Nambiar District 25"
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="!object-cover !object-center"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(18,26,20,0.35)_100%)]" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: duration.cinematic, delay: 0.1, ease: ease.cinematic }}
                className="lg:col-span-5 p-card p-card-dark bg-canvas-deep flex flex-col justify-center p-8 md:p-12"
              >
                <span className="kicker !text-champagne mb-5">The Cure</span>
                <p className="text-[clamp(2rem,3.4vw,3rem)] font-light leading-[1.03] tracking-[-0.02em] text-ivory">
                  {philosophy.pullquote}
                </p>
                <p className="mt-6 text-[clamp(1.02rem,1.35vw,1.16rem)] leading-[1.85] text-ivory/72">
                  {philosophy.body}
                </p>
              </motion.div>
            </div>

            {/* Closing */}
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 border-t border-bronze/25 pt-8">
              <p className="text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.02em] text-forest">
                {philosophy.closing[0]}
              </p>
              <p className="text-[clamp(1.9rem,4vw,3rem)] font-light italic leading-[1.05] tracking-[-0.02em] text-bronze sm:text-right">
                {philosophy.closing[1]}
              </p>
            </div>
          </div>
        </div>
      </SceneDirector>
    </section>
  );
}
