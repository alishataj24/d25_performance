"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { frame } from "framer-motion";
import { setLenis } from "@/lib/scroll";

/** Fresh visits land on the hero — never a restored mid-page scroll (esp. mobile Safari). */
function shouldStartAtHero() {
  const hash = window.location.hash.replace(/^#/, "");
  return !hash || hash === "home";
}

function resetToHero(lenis?: Lenis | null) {
  if (!shouldStartAtHero()) return;
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      resetToHero();
      return;
    }

    const instance = new Lenis({
      duration: 1.4,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      // Touch scrolling stays native on mobile so horizontal strips don't fight the page
      syncTouch: false,
    });

    setLenis(instance);
    document.documentElement.classList.add("lenis", "lenis-smooth");
    resetToHero(instance);

    instance.on("scroll", () => {
      frame.update(() => {}, true);
    });

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      instance.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}