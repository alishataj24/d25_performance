"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/** Bronze progress line — hidden over hero (hero has its own) */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (overHero) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px bg-bronze/60 origin-left z-[110] pointer-events-none"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
