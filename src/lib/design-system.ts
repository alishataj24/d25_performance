/**
 * District 25 — Luxury Digital Brand System
 *
 * Single source of truth for tokens reused across the entire experience.
 * Luxury is invisible: these values should feel inevitable, never decorative.
 */

export const BRAND = {
  name: "District 25",
  mantra:
    "Every screen should be beautiful enough to print as a magazine spread.",
} as const;

/** Architecture & nature — no glossy gold, no corporate bright */
export const colors = {
  forest: "#1c2e1f",
  forestLight: "#2d4230",
  forestDark: "#121a14",
  charcoal: "#1e1c19",
  ivory: "#f4efe6",
  ivoryMuted: "#e6dfd3",
  stone: "#d4cdc3",
  stoneDark: "#8a847c",
  warmGrey: "#6b665f",
  /** Muted champagne — accent, not decoration */
  bronze: "#a8956f",
  bronzeLight: "#b8a57a",
  champagne: "#c4b59a",
  olive: "#5a6348",
  slate: "#3d4549",
  /** Legacy aliases — prefer bronze over bright gold */
  gold: "#b8a066",
  goldMuted: "#9a8550",
} as const;

/** Micro → macro rhythm. Spacing creates luxury. */
export const space = {
  micro: { xs: 8, sm: 12, md: 16, lg: 24 },
  paragraph: { min: 24, max: 32 },
  headingToContent: { min: 56, max: 80 },
  card: { min: 32, max: 48 },
  section: { min: 160, max: 220 },
  heroBreath: { min: 180, max: 240 },
  anticipation: { min: 240, max: 320 },
} as const;

/** Content decides its own rhythm — never one tiny container */
export const width = {
  cinematic: "100%",
  editorial: "min(1440px, 100% - 2 * var(--gutter))",
  reading: "min(820px, 100%)",
  form: "min(640px, 100%)",
  narrow: "min(520px, 100%)",
} as const;

/** Typography hierarchy — generous, never compressed */
export const typography = {
  hero: { min: 88, max: 120, unit: "px" },
  sectionTitle: { min: 56, max: 72, unit: "px" },
  subtitle: { min: 28, max: 36, unit: "px" },
  body: { min: 18, max: 20, unit: "px" },
  caption: { min: 13, max: 14, unit: "px" },
  lineHeight: {
    display: 0.95,
    headline: 1.05,
    title: 1.15,
    body: 1.82,
    caption: 1.6,
  },
  tracking: {
    display: "-0.025em",
    headline: "-0.015em",
    body: "0.012em",
    label: "0.22em",
  },
  /** Uppercase reserved for labels & navigation only */
  uppercaseAllowed: ["nav", "label", "colophon"] as const,
} as const;

export const fonts = {
  /** Primary — matches district25.nambiarbuilders.com body */
  body: "var(--font-montserrat), system-ui, sans-serif",
  /** Section emphasis — loaded on source site */
  display: "var(--font-proza), system-ui, sans-serif",
  /** Script accent — e.g. taglines */
  script: "var(--font-script), cursive",
  accent: "var(--font-proza), sans-serif",
} as const;

/** 12-column editorial grid — components may break it intentionally */
export const grid = {
  columns: 12,
  gutter: "clamp(1.75rem, 5vw, 4rem)",
  maxBleed: "clamp(2rem, 8vw, 6rem)",
} as const;

export const surfaces = {
  stoneTexture: "var(--surface-stone)",
  mattePanel: "var(--surface-matte)",
  frostedGlass: "var(--surface-glass)",
} as const;

export const shadows = {
  /** Premium interior lighting — never heavy drop shadows */
  lift: "0 4px 24px rgba(18, 26, 20, 0.08)",
  soft: "0 2px 12px rgba(18, 26, 20, 0.05)",
  depth: "0 8px 40px rgba(18, 26, 20, 0.12)",
} as const;

export const radius = {
  button: "2px",
  panel: "0px",
  subtle: "1px",
} as const;

export const borders = {
  hairline: "1px solid",
  opacity: { light: 0.08, medium: 0.12, accent: 0.4 },
} as const;

/** Motion communicates confidence — never bounce, spin, or play */
export const motion = {
  allowed: [
    "fade",
    "mask-reveal",
    "scale",
    "layer-transition",
    "parallax",
    "text-stagger",
    "clip-path",
    "blur-to-focus",
    "line-draw",
  ] as const,
  forbidden: ["bounce", "elastic", "flash", "spin", "constant-motion", "3d-flourish"] as const,
  duration: {
    micro: 0.4,
    interaction: 0.7,
    transition: 1.2,
    scene: 2.4,
    breathe: 2.8,
  },
  easing: {
    luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
    cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
    drift: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  },
} as const;

export const accessibility = {
  minContrastRatio: 4.5,
  focusRing: "2px solid var(--bronze)",
  focusOffset: "4px",
  respectReducedMotion: true,
} as const;

/** CSS class map for layout primitives */
export const layoutClasses = {
  cinematic: "w-full",
  editorial: "w-full max-w-[1440px] mx-auto",
  reading: "w-full max-w-[820px]",
  form: "w-full max-w-[640px]",
  sectionPadding: "section-padding",
  sectionBreath: "section-breath",
  heroBreath: "hero-breath",
  editorialGrid: "editorial-grid",
} as const;
