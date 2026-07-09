export const ease = {
  luxury: [0.22, 1, 0.36, 1] as const,
  cinematic: [0.16, 1, 0.3, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  /** Documentary drift — unhurried, confident */
  drift: [0.25, 0.1, 0.25, 1] as const,
  /** AOS-style easeOutCubic — crisp reveal like the original site */
  out: [0.215, 0.61, 0.355, 1] as const,
};

export const duration = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.8,
  cinematic: 1.0,
  scene: 1.1,
};

export const revealUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const revealMask = {
  hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: duration.cinematic, ease: ease.cinematic },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const sceneEnter = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.slow, ease: ease.luxury },
  },
};
