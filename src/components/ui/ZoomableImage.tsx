"use client";

import { useRef, useState, type TouchEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { cn } from "@/lib/utils";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const STEP = 0.5;

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scaleValue, setScaleValue] = useState(1);

  const rawScale = useMotionValue(1);
  const scale = useSpring(rawScale, { stiffness: 260, damping: 32 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 32 });
  const springY = useSpring(y, { stiffness: 260, damping: 32 });

  // Pinch tracking
  const pinchStartDist = useRef<number | null>(null);
  const pinchStartScale = useRef(1);

  const clamp = (v: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, v));

  const applyScale = (next: number) => {
    const clamped = clamp(next);
    rawScale.set(clamped);
    setScaleValue(clamped);
    if (clamped === MIN_SCALE) {
      x.set(0);
      y.set(0);
    }
  };

  const zoomIn = () => applyScale(scaleValue + STEP);
  const zoomOut = () => applyScale(scaleValue - STEP);
  const reset = () => applyScale(1);

  const dist = (t: React.TouchList) =>
    Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      pinchStartDist.current = dist(e.touches);
      pinchStartScale.current = scaleValue;
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchStartDist.current) {
      const ratio = dist(e.touches) / pinchStartDist.current;
      applyScale(pinchStartScale.current * ratio);
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) pinchStartDist.current = null;
  };

  const isZoomed = scaleValue > MIN_SCALE;

  return (
    <div
      ref={containerRef}
      style={{ touchAction: "none" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={() => (isZoomed ? reset() : applyScale(scaleValue + STEP * 2))}
      className={cn(
        "relative overflow-hidden select-none",
        isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
        className
      )}
    >
      <motion.div
        drag={isZoomed}
        dragConstraints={{ left: -600, right: 600, top: -450, bottom: 450 }}
        dragElastic={0.12}
        dragMomentum={false}
        style={{ x: springX, y: springY, scale }}
        className="relative h-full w-full"
      >
        <HighQualityImage
          src={src}
          alt={alt}
          fill
          draggable={false}
          unoptimized
          sizes="100vw"
          className="object-contain object-center pointer-events-none"
        />
      </motion.div>

      {/* Zoom controls */}
      <div
        className="absolute left-1/2 z-[1] flex -translate-x-1/2 items-center gap-1 rounded-full border border-ivory/15 bg-black/60 p-1 backdrop-blur-md"
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <button
          type="button"
          onClick={zoomOut}
          disabled={scaleValue <= MIN_SCALE}
          aria-label="Zoom out"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ivory/90 transition-colors hover:bg-ivory/10 disabled:opacity-30"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M8 11h6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset zoom"
          className="min-w-[3.2rem] px-1 text-caption tabular-nums text-ivory/70 transition-colors hover:text-ivory"
        >
          {Math.round(scaleValue * 100)}%
        </button>
        <button
          type="button"
          onClick={zoomIn}
          disabled={scaleValue >= MAX_SCALE}
          aria-label="Zoom in"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ivory/90 transition-colors hover:bg-ivory/10 disabled:opacity-30"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
