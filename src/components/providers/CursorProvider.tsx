"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], summary, [data-cursor-pointer]';
const FIELD_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

/**
 * Refined pointer — a precise dot with a soft trailing ring.
 * Native cursor stays on form fields; decorative cursor hides elsewhere.
 */
export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 260, damping: 26, mass: 0.45 });
  const ringY = useSpring(cursorY, { stiffness: 260, damping: 26, mass: 0.45 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    setEnabled(true);
    document.body.classList.add("cursor-refined");

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement;
      const onField = !!target.closest(FIELD_SELECTOR);
      const onInteractive = !!target.closest(INTERACTIVE_SELECTOR);
      setHovering(onInteractive && !onField);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);
    const press = () => setPressing(true);
    const release = () => setPressing(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
      document.body.classList.remove("cursor-refined");
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {children}
      {enabled && visible && (
        <>
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[9999]"
            style={{ x: ringX, y: ringY }}
            aria-hidden
          >
            <motion.div
              className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
              animate={{
                width: hovering ? 42 : 30,
                height: hovering ? 42 : 30,
                borderColor: hovering
                  ? "rgba(168, 149, 111, 0.75)"
                  : "rgba(168, 149, 111, 0.4)",
                backgroundColor: hovering
                  ? "rgba(168, 149, 111, 0.1)"
                  : "rgba(168, 149, 111, 0.04)",
                scale: pressing ? 0.9 : 1,
              }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
            />
          </motion.div>

          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[10000]"
            style={{ x: cursorX, y: cursorY }}
            aria-hidden
          >
            <motion.div
              className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze shadow-[0_0_10px_rgba(168,149,111,0.35)]"
              animate={{
                width: hovering ? 6 : 5,
                height: hovering ? 6 : 5,
                scale: pressing ? 0.75 : 1,
              }}
              transition={{ duration: 0.12 }}
            />
          </motion.div>
        </>
      )}
    </>
  );
}
