"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { SceneDirector } from "@/components/ui/SceneDirector";
import { COPY, HIGHLIGHTS, getChapter } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { fadeUp, staggerContainer, ease, duration } from "@/lib/animations";

function Highlight({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center gap-4 text-center"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-champagne/25 bg-champagne/[0.06]">
        <HighQualityImage
          src={icon}
          alt=""
          width={30}
          height={30}
          unoptimized
          aria-hidden
          className="h-7 w-7 object-contain"
        />
      </span>
      <p className="max-w-[20ch] text-[clamp(0.98rem,1.2vw,1.1rem)] font-light leading-[1.35] text-ivory/85">
        {title}
      </p>
    </motion.div>
  );
}

export function LifeInside() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const { lifeInside } = COPY;
  const chapter = getChapter("district")!;

  const left = HIGHLIGHTS.slice(0, 2);
  const right = HIGHLIGHTS.slice(3, 5);
  const center = HIGHLIGHTS[2];

  return (
    <section id="district" ref={ref} className="relative bg-canvas-deep text-ivory overflow-hidden">
      <SceneDirector sceneId="district">
        <div className="section-padding px-container">
          <div className="mx-frame">
            {/* Heading */}
            <div className="mx-auto max-w-[900px] text-center">
              <span className="kicker kicker-center justify-center !text-champagne mb-6">
                {chapter.title}
              </span>
              <TextReveal as="h2" align="center" className="h-section text-ivory">
                {lifeInside.headline}
              </TextReveal>
            </div>

            {/* Highlights ring around the central image */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-14 md:mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_minmax(280px,400px)_1fr] lg:gap-16"
            >
              {/* Left column */}
              <div className="flex flex-col items-center gap-10">
                {left.map((h) => (
                  <Highlight key={h.title} icon={h.icon} title={h.title} />
                ))}
              </div>

              {/* Center: top highlight + circular image */}
              <div className="flex flex-col items-center gap-8">
                <Highlight icon={center.icon} title={center.title} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: duration.cinematic, ease: ease.cinematic }}
                  className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border border-champagne/20 shadow-[var(--shadow-float)]"
                >
                  <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
                    <HighQualityImage
                      src={ASSETS.renders.dropOff}
                      alt="Villa-styled skyrise residences at District 25"
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 80vw, 400px"
                      className="!object-cover !object-center"
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Right column */}
              <div className="flex flex-col items-center gap-10">
                {right.map((h) => (
                  <Highlight key={h.title} icon={h.icon} title={h.title} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </SceneDirector>
    </section>
  );
}
