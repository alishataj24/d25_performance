"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInquiry } from "@/components/providers/InquiryProvider";
import { SITE, VOICE } from "@/lib/constants";
import { ease } from "@/lib/animations";

export function FloatingCTA() {
  const { openConcierge } = useInquiry();
  const [visible, setVisible] = useState(false);
  const { cta } = VOICE;

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const heroObs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.08, rootMargin: "-76px 0px 0px 0px" }
    );

    heroObs.observe(hero);
    return () => heroObs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: ease.cinematic }}
          className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:pb-6 pointer-events-none"
        >
          <div className="max-w-md mx-auto pointer-events-auto flex items-stretch bg-forest-dark/95 backdrop-blur-md border border-ivory/10 shadow-2xl">
            <button
              onClick={() => openConcierge("enquire")}
              className="flex-1 py-4 text-[0.7rem] tracking-[0.12em] text-ivory hover:bg-white/5 transition-colors cursor-pointer font-light"
            >
              {cta.floatingConnect}
            </button>
            <span className="w-px bg-ivory/15 self-stretch my-3" aria-hidden />
            <a
              href={SITE.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 text-center text-[0.7rem] tracking-[0.12em] text-ivory/80 hover:text-gold transition-colors font-light"
            >
              {cta.floatingCollection}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
