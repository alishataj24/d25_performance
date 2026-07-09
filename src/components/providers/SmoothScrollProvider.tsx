"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { frame } from "framer-motion";
import { setLenis } from "@/lib/scroll";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      duration: 1.4,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    setLenis(instance);
    document.documentElement.classList.add("lenis", "lenis-smooth");

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