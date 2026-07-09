import type { Variants } from "framer-motion";
import { duration, ease } from "./animations";

/** Each scene gets exactly one entrance personality — never repeat adjacent scenes */
export type SceneDirection =
  | "fade"
  | "reveal-up"
  | "reveal-left"
  | "reveal-right"
  | "unfold"
  | "dissolve"
  | "drift-up"
  | "drift-horizontal"
  | "mask-vertical"
  | "mask-horizontal"
  | "settle"
  | "focus";

const t = { duration: duration.slow, ease: ease.out };

export const sceneVariants: Record<SceneDirection, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ...t, duration: duration.scene } },
  },
  "reveal-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: t },
  },
  "reveal-left": {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0, transition: t },
  },
  "reveal-right": {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0, transition: t },
  },
  unfold: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: t },
  },
  dissolve: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.scene, ease: ease.drift } },
  },
  "drift-up": {
    hidden: { opacity: 0, y: 56 },
    visible: { opacity: 1, y: 0, transition: { ...t, duration: duration.scene } },
  },
  "drift-horizontal": {
    hidden: { opacity: 0, x: 64 },
    visible: { opacity: 1, x: 0, transition: t },
  },
  "mask-vertical": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: t },
  },
  "mask-horizontal": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: t },
  },
  settle: {
    hidden: { opacity: 0, scale: 1.015 },
    visible: { opacity: 1, scale: 1, transition: { ...t, duration: duration.scene } },
  },
  focus: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.slow, ease: ease.luxury } },
  },
};

/**
 * The original site uses one consistent motion everywhere: a crisp fade-up
 * (AOS-style). We mirror that — every section reveals the same way. The hero
 * is a plain fade so it doesn't shift on load.
 */
export const SECTION_DIRECTIONS: Record<string, SceneDirection> = {
  home: "fade",
};

export function getSceneDirection(id: string): SceneDirection {
  return SECTION_DIRECTIONS[id] ?? "reveal-up";
}
