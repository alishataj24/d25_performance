"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SceneDirector } from "@/components/ui/SceneDirector";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { useInquiry } from "@/components/providers/InquiryProvider";
import { HERO_COPY, getChapter, STATS, VOICE } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { fadeUp, staggerContainer, ease, duration } from "@/lib/animations";

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const chapter = getChapter("overview")!;
  const { openInquiry } = useInquiry();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "5%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="relative bg-canvas experience-light overflow-x-clip"
    >
      <SceneDirector sceneId="overview">
        <div className="section-padding px-container relative z-[1] !pb-14 md:!pb-16">
          <div className="mx-frame">
            {/* Intro row — headline + lede fill the full width, aligned to a common top */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: duration.slow, ease: ease.cinematic }}
                className="lg:col-span-7"
              >
                <span className="kicker mb-6">Overview · {chapter.number}</span>
                <h2 className="h-section text-forest">
                  {HERO_COPY.headline}{" "}
                  <span className="text-bronze">{HERO_COPY.headlineAccent}</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: duration.slow, delay: 0.08, ease: ease.cinematic }}
                className="lg:col-span-5 lg:pt-2"
              >
                <p className="text-[clamp(1.05rem,1.35vw,1.22rem)] leading-[1.75] text-[#2b2721]">
                  {HERO_COPY.paragraphs[0]}
                </p>
                <button
                  type="button"
                  onClick={() => openInquiry("enquire")}
                  className="btn-pill btn-solid mt-8"
                >
                  {VOICE.cta.connect}
                </button>
              </motion.div>
            </div>

            {/* Content row — big image + dark statement card, balanced */}
            <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: duration.cinematic, ease: ease.cinematic }}
                className="lg:col-span-8"
              >
                <div className="p-card p-card-interactive relative h-[52vh] md:h-[64vh] min-h-[380px]">
                  <motion.div
                    className="absolute inset-0"
                    style={{ y: imageY, scale: imageScale }}
                  >
                    <HighQualityImage
                      src={ASSETS.renders.aerial}
                      alt="District 25 — aerial view of the township"
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 62vw"
                      className="p-card-media !object-cover !object-center"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(8,12,9,0.62)_82%,rgba(8,12,9,0.92)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="mb-3 inline-flex items-center gap-3">
                      <HighQualityImage
                        src={ASSETS.logoIcon}
                        alt=""
                        width={26}
                        height={26}
                        className="opacity-90"
                        aria-hidden
                      />
                      <span className="text-[0.7rem] uppercase tracking-[0.24em] text-champagne/85">
                        SOHO Life Journal
                      </span>
                    </div>
                    <p className="max-w-[36ch] text-[clamp(1.05rem,1.4vw,1.3rem)] font-light leading-[1.5] text-ivory">
                      Architecture that opens into greenery, sport, and private calm.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: duration.cinematic, delay: 0.1, ease: ease.cinematic }}
                className="lg:col-span-4 p-card p-card-dark bg-canvas-deep flex flex-col justify-between p-8 md:p-9"
              >
                <div>
                  <span className="kicker !text-champagne mb-6">Phase 3</span>
                  <p className="text-[clamp(1.55rem,2.2vw,2.1rem)] font-light leading-[1.2] tracking-[-0.01em] text-ivory">
                    {HERO_COPY.paragraphs[1]}
                  </p>
                </div>
                <p className="mt-8 text-[0.98rem] leading-[1.75] text-ivory/70">
                  {HERO_COPY.paragraphs[2]}
                </p>
              </motion.div>
            </div>

            {/* Stat cards — fill the base row */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8%" }}
              className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="p-card p-card-interactive p-6 md:p-7"
                >
                  <span className="block text-[clamp(2rem,3.2vw,2.9rem)] font-light leading-none tracking-[-0.02em] text-forest">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-3 block text-[0.78rem] uppercase tracking-[0.14em] text-grey-600">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </SceneDirector>
    </section>
  );
}
