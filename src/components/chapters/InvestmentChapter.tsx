"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { PublicationImage } from "@/components/ui/PublicationImage";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { HIGHLIGHTS, COPY, getChapter, OVERVIEW_IMAGES, STATS } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

const HIGHLIGHT_IMAGES = [
  OVERVIEW_IMAGES[0],
  OVERVIEW_IMAGES[1],
  ASSETS.slider.web2,
  ASSETS.gallery[1],
  ASSETS.heroTowers,
] as const;

/**
 * Chapter 8 — Investment
 * Growth rises with confidence. Skyline emerges. Not sales pressure.
 */
export function InvestmentChapter() {
  const ref = useRef<HTMLElement>(null);
  const { investment } = COPY;
  const chapter = getChapter("investment")!;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineGrowth = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const skylineOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 0.35]);

  return (
    <section id="investment" ref={ref} className="relative bg-forest overflow-hidden">
      <motion.div
        style={{ opacity: skylineOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <PublicationImage
          src={ASSETS.heroTowers}
          alt=""
          aspect="full"
          unoptimized
          className="!min-h-full opacity-40"
          sizes="100vw"
        />
      </motion.div>

      <div className="relative z-10 section-padding">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-colophon text-champagne/70 mb-8">
            {chapter.number} — {chapter.title}
          </p>
          <TextReveal as="h2" className="text-masthead text-ivory font-light mb-8">
            {investment.headline}
          </TextReveal>
          <p className="text-title text-ivory/55 font-light mb-16 max-w-2xl">{investment.subheadline}</p>

          {/* Growth line — confidence, not pressure */}
          <div className="relative h-32 mb-20 max-w-3xl">
            <svg viewBox="0 0 400 120" className="w-full h-full" aria-hidden>
              <motion.path
                d="M 0 100 Q 100 90, 150 70 T 300 30 T 400 10"
                fill="none"
                stroke="var(--bronze)"
                strokeWidth="1"
                style={{ pathLength: lineGrowth, opacity: 0.6 }}
              />
            </svg>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              {STATS.map((stat) => (
                <li key={stat.label}>
                  <p className="stat-editorial-value text-ivory !text-3xl">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-colophon text-ivory/45 mt-2">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-32 md:space-y-40">
            {HIGHLIGHTS.map((item, i) => (
              <article
                key={item.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className={`lg:col-span-5 space-y-6 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <span className="text-colophon text-bronze/60">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-title text-ivory font-light leading-[1.15]">{item.title}</h3>
                </div>
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <PublicationImage
                    src={HIGHLIGHT_IMAGES[i] ?? HIGHLIGHT_IMAGES[0]}
                    alt={item.title}
                    aspect={i === 2 ? "tall" : "cinematic"}
                    unoptimized={HIGHLIGHT_IMAGES[i]?.endsWith(".png")}
                    sizes="55vw"
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
