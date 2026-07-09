"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LineReveal } from "@/components/ui/LineReveal";
import { PublicationImage } from "@/components/ui/PublicationImage";
import { COPY, HERO_COPY, getChapter, PHASE_DETAILS, OVERVIEW_IMAGES } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { ease } from "@/lib/animations";

/**
 * Chapter 2 — The Vision
 * Philosophy dissolves into landscape. One powerful statement. Architecture breathes.
 */
export function VisionChapter() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const { philosophy, vision } = COPY;
  const chapter = getChapter("overview")!;

  const philOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const philY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-15%"]);
  const forestOpacity = useTransform(scrollYProgress, [0.3, 0.55, 1], [0, 1, 1]);
  const towerY = useTransform(scrollYProgress, [0.4, 1], ["8%", "-8%"]);
  const visionOpacity = useTransform(scrollYProgress, [0.45, 0.65, 1], [0, 1, 1]);
  const visionY = useTransform(scrollYProgress, [0.45, 0.8], ["12%", "0%"]);

  const lifeInsideOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);

  return (
    <section
      id="overview"
      ref={ref}
      className="relative h-[280vh] bg-ivory"
      aria-label="The Vision"
    >
      {/* Philosophy — huge, still */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div
          style={{ opacity: philOpacity, y: philY }}
          className="absolute inset-0 flex items-center section-padding"
        >
          <div className="max-w-[1440px] mx-auto w-full">
            <p className="text-colophon text-stone-dark mb-8">
              {chapter.number} — {philosophy.label}
            </p>
            <LineReveal
              as="h2"
              active
              delay={0}
              stagger={0.55}
              lines={[philosophy.headline]}
              className="text-[clamp(3.5rem,9vw,7rem)] text-forest font-light leading-[0.92] max-w-5xl"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: ease.cinematic, delay: 0.8 }}
              className="text-editorial text-forest mt-12 md:mt-16 max-w-2xl"
            >
              {philosophy.pullquote}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: ease.cinematic, delay: 1.2 }}
              className="text-body text-grey-600 mt-10 !max-w-2xl leading-[1.85]"
            >
              {philosophy.opening}
            </motion.p>
          </div>
        </motion.div>

        {/* Vision — forest emerges as words dissolve */}
        <motion.div
          style={{ opacity: forestOpacity }}
          className="absolute inset-0 bg-forest"
        />
        <motion.div
          style={{ opacity: visionOpacity, y: visionY }}
          className="absolute inset-0 flex items-end section-padding pb-20 md:pb-28"
        >
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-5 space-y-8">
              <p className="text-colophon text-champagne/70">
                {getChapter("vision")!.number} — {vision.phaseHeadline}
              </p>
              <h3 className="text-masthead text-ivory font-light leading-[0.95]">
                {HERO_COPY.headline}
              </h3>
              <p className="text-body text-ivory/60 !max-w-none leading-[1.85]">
                {HERO_COPY.paragraphs[0]}
              </p>
              <p className="text-body text-ivory/50 !max-w-none leading-[1.85]">
                {HERO_COPY.paragraphs[1]}
              </p>
              <div className="space-y-3 border-l border-bronze/40 pl-6 pt-2">
                <p className="text-body text-champagne">
                  {PHASE_DETAILS.units.toLocaleString()} Units · {vision.unitsLine}
                </p>
                <p className="text-body text-ivory/70">
                  {PHASE_DETAILS.towers} {vision.towersLabel}
                </p>
              </div>
              <p className="text-title text-ivory/80 font-light italic pt-4">
                {vision.experienceHeadline}
              </p>
            </div>
            <motion.div style={{ y: towerY }} className="lg:col-span-7">
              <PublicationImage
                src={ASSETS.heroTowers}
                alt="Nambiar District 25 Phase 3"
                aspect="cinematic"
                unoptimized
                sizes="60vw"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Life inside — woven into vision close */}
        <motion.div
          style={{ opacity: lifeInsideOpacity }}
          className="absolute bottom-8 left-0 right-0 section-padding !py-0"
        >
          <p className="text-colophon text-ivory/40 text-center max-w-2xl mx-auto">
            {COPY.lifeInside.subheadline}
          </p>
        </motion.div>
      </div>

      {/* Life Inside — moments unfold after vision */}
      <div className="relative z-10 bg-forest section-padding -mt-[10vh]" id="district">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-colophon text-champagne/60 mb-6">
            {getChapter("district")!.number} — {COPY.lifeInside.headline}
          </p>
          <div className="space-y-32 md:space-y-40">
            {COPY.lifeInside.moments.map((moment, i) => (
              <article
                key={moment.title}
                className={`grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                  <span className="text-colophon text-champagne/50 block mb-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-title text-ivory font-light mb-6">{moment.title}</h3>
                  <p className="text-body text-ivory/60 leading-[1.85] !max-w-none">{moment.description}</p>
                </div>
                <div className={`md:col-span-7 ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                  <PublicationImage
                    src={OVERVIEW_IMAGES[i + 1] ?? OVERVIEW_IMAGES[1]}
                    alt={moment.title}
                    aspect={i === 0 ? "cinematic" : "tall"}
                    sizes="50vw"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
