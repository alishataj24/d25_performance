"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { ease } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface BannerSlide {
  src: string;
  alt: string;
  fit?: "contain" | "cover";
}

interface PromoBannerProps {
  slides: BannerSlide[];
  className?: string;
  height?: "screen" | "banner" | "auto";
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  kenBurns?: boolean;
  onSlideClick?: () => void;
}

const heights = {
  screen: "h-screen min-h-[700px]",
  banner: "h-[50vw] min-h-[280px] max-h-[560px]",
  auto: "aspect-[2/1] w-full",
};

export function PromoBanner({
  slides,
  className,
  height = "banner",
  autoPlay = false,
  interval = 6000,
  showDots = false,
  kenBurns = true,
  onSlideClick,
}: PromoBannerProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const fit = slide.fit ?? "contain";

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, slides.length]);

  return (
    <div className={cn("relative w-full overflow-hidden bg-black", heights[height], className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: ease.luxury }}
          className={cn("absolute inset-0", onSlideClick && "cursor-pointer")}
          onClick={onSlideClick}
        >
          <motion.div
            className="absolute inset-0"
            animate={kenBurns ? { scale: [1, 1.06] } : undefined}
            transition={
              kenBurns
                ? { duration: 12, ease: "linear", repeat: Infinity, repeatType: "reverse" }
                : undefined
            }
          >
            <HighQualityImage
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              unoptimized
              sizes="100vw"
              className={cn(fit === "contain" ? "object-contain" : "object-cover")}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-500 cursor-pointer",
                i === index ? "bg-gold w-6" : "bg-ivory/40 hover:bg-ivory/70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
