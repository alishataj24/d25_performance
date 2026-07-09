"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { useHeroExperience } from "@/components/providers/HeroExperienceProvider";
import { HERO_COPY } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { ease } from "@/lib/animations";

const HERO_SLIDES = [
  {
    src: ASSETS.slider.web1,
    alt: "District 25 — Less scroll time. More goal time.",
  },
  {
    src: ASSETS.slider.web2,
    alt: "District 25 — Bengaluru's biggest sports address",
  },
] as const;

const INTERVAL_MS = 5000;

/** Banner is 20:9 — full width visible; min height on mobile so it doesn't feel tiny */
const heroHeight = "clamp(calc(100vw * 9 / 20), 36dvh, 100dvh)";

export function Arrival() {
  const reduceMotion = useReducedMotion();
  const { loadingComplete } = useHeroExperience();
  const [slideIndex, setSlideIndex] = useState(0);

  const revealActive = loadingComplete || Boolean(reduceMotion);
  const slide = HERO_SLIDES[slideIndex];

  useEffect(() => {
    if (!revealActive || reduceMotion || HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [revealActive, reduceMotion]);

  return (
    <section
      id="home"
      className="relative isolate z-0 w-full overflow-hidden bg-[#141414]"
      style={{ height: heroHeight }}
      aria-label="District 25 — hero"
    >
      <h1 className="sr-only">
        {HERO_COPY.headline} {HERO_COPY.headlineAccent}
      </h1>

      <HighQualityImage
        src={ASSETS.sportsHeroBanner}
        alt=""
        width={1}
        height={1}
        className="sr-only"
        aria-hidden
        priority
      />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealActive ? 1 : 0 }}
        transition={{ duration: 1.2, ease: ease.cinematic, delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: ease.cinematic }}
            className="absolute inset-0"
          >
            {/* Safe inset so edge text (LESS / DISTRICT 25) is never clipped */}
            <div className="absolute inset-[clamp(6px,0.8vw,14px)]">
              <HighQualityImage
                src={slide.src}
                alt={slide.alt}
                fill
                priority={slideIndex === 0}
                sizes="100vw"
                className="!object-contain !object-center"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
