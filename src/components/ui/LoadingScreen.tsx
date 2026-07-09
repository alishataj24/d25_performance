"use client";

import { useEffect, useState } from "react";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/constants";
import { HERO_STORY } from "@/lib/hero-story";
import { useHeroExperience } from "@/components/providers/HeroExperienceProvider";
import { TownshipBuildSequence } from "@/components/journey/TownshipBuildSequence";
import { ease } from "@/lib/animations";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [lineDrawn, setLineDrawn] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const { completeLoading, setPhase } = useHeroExperience();

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 800);
    const lineTimer = setTimeout(() => setLineDrawn(true), 1400);
    const pauseTimer = setTimeout(() => setPhase("pause"), 2000);
    const exitTimer = setTimeout(() => {
      setVisible(false);
      completeLoading();
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(lineTimer);
      clearTimeout(pauseTimer);
      clearTimeout(exitTimer);
    };
  }, [completeLoading, setPhase]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-charcoal overflow-hidden hero-grain"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: ease.cinematic }}
        >
          <TownshipBuildSequence />

          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: ease.cinematic }}
                className="relative z-10 text-center px-6"
              >
                <HighQualityImage
                  src={SITE.logo}
                  alt="Nambiar District 25"
                  width={320}
                  height={118}
                  priority
                  unoptimized
                  className="mx-auto h-16 md:h-[4.75rem] w-auto object-contain brightness-0 invert opacity-92"
                />
                <motion.div
                  className="bronze-line mx-auto mt-10"
                  initial={{ width: 0, opacity: 0 }}
                  animate={
                    lineDrawn
                      ? { width: 72, opacity: 0.7 }
                      : { width: 0, opacity: 0 }
                  }
                  transition={{ duration: 1.8, ease: ease.cinematic }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: lineDrawn ? 0.5 : 0 }}
            transition={{ duration: 1.2 }}
            className="absolute bottom-12 text-colophon text-champagne/50 z-10"
          >
            {HERO_STORY.voice.loading}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
