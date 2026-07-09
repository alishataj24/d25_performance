/**
 * HERO STORY — District 25
 *
 * The first 8–12 seconds are not a banner. They are the opening scene
 * of a luxury destination. Define the story before designing pixels.
 *
 * Current asset: sports-hero-banner.png (full-bleed artwork with embedded copy).
 * The interface should disappear. The story should remain.
 */

export const HERO_STORY = {
  /** One sentence the hero must earn */
  premise:
    "Before you read a single word, you should feel that Bengaluru has a new kind of address — one built for movement, not just residence.",

  duration: { seconds: { min: 8, max: 12 } },

  /** What success feels like — measured in emotion, not conversion */
  emotionalGoal:
    "Stillness followed by quiet awe. The visitor pauses — not because something flashed, but because something feels true.",

  visitorShouldFeel: [
    "I have arrived somewhere considered.",
    "This is not another property website.",
    "There is scale here — human energy, not just towers.",
    "I want to know what lies beyond this first frame.",
  ] as const,

  visitorShouldNotFeel: [
    "Sold to.",
    "Overwhelmed by UI.",
    "Recognizing a template.",
    "Rushed toward a form.",
  ] as const,

  /**
   * Temporal beats — map to loading → reveal → dwell → invitation.
   * Visual execution comes later; story governs every decision.
   */
  beats: [
    {
      id: "threshold",
      timing: "0–2s",
      title: "The Threshold",
      sensation: "Darkness lifting. A single breath of anticipation.",
      story:
        "The loading screen is not a spinner — it is a curtain rising. Logo appears with restraint. 'Phase 3' whispers context without selling. The visitor crosses from the outside world into District 25.",
      interface: "Minimal. Logo. One colophon line. A bronze line draws across the base.",
      soundscape: "Silence. Optional: distant ambient texture at near-zero volume.",
      doNot: "No progress percentages. No marketing slogans. No countdown urgency.",
    },
    {
      id: "revelation",
      timing: "2–6s",
      title: "The Revelation",
      sensation: "Full viewport. The sports district artwork fills the frame.",
      story:
        "This is Bengaluru's biggest sports address — but we do not announce it. The artwork already says it. The visitor sees athletes, courts, towers, forest canopy in one cinematic composition. Movement is the protagonist. Real estate is the backdrop.",
      interface:
        "Almost nothing. No headline overlay. No CTA buttons. No navigation prominence. The image is the narrator.",
      interaction:
        "The right portion of the artwork is quietly interactive — a discovery for the curious, not a billboarding of 'Enquire Now'.",
      doNot:
        "Do not duplicate this banner elsewhere. Do not add competing typography on top of embedded artwork copy.",
    },
    {
      id: "dwell",
      timing: "6–9s",
      title: "The Dwell",
      sensation: "Time slows. Subtle parallax breathes. The frame feels alive.",
      story:
        "The visitor's eye travels the composition — from sport to skyline to green. They absorb scale without reading specs. This is documentary framing: golden hour, human moments, authentic energy.",
      interface:
        "A single scroll cue at the bottom — 'Enter the experience' — fading in after the image has had time to speak.",
      motion:
        "Imperceptible scale drift on scroll. Opacity softens as descent begins. Calm. Cinematic. No bounce.",
      doNot: "No auto-advancing carousel. No video with promotional cuts. No pop-ups.",
    },
    {
      id: "descent",
      timing: "9–12s",
      title: "The Descent",
      sensation: "The first intentional act: scrolling down.",
      story:
        "Scrolling is not navigation — it is entering the township. The hero dissolves into the next chapter ('Modern Life Needs Play'). Awe gives way to intimacy. The visitor chooses to go deeper.",
      interface:
        "Navigation may gently materialize. Scroll progress remains subtle. The hero yields — it does not cling.",
      handoff:
        "Philosophy section receives the visitor with warmth (ivory), editorial typography, and the first readable prose. The contrast is deliberate: spectacle → reflection.",
      doNot: "No scroll hijacking. No pinned hero that fights the user. No sticky CTAs blocking the artwork.",
    },
  ] as const,

  /** Governing principles for when we design the hero visually */
  visualPrinciples: [
    "Full viewport. Edge-to-edge. No boxed hero.",
    "The sports hero banner appears exactly once — here, and only here.",
    "Typography on the hero is optional; if present, it is colophon-scale only.",
    "Color comes from the photograph — forest, stone, sunlight — not UI chrome.",
    "White space below the fold begins the next chapter; hero-to-section breath: 180–240px.",
    "Mobile is not a crop — it is a reframed composition with the same emotional arc.",
  ] as const,

  /** Thread connecting hero to the rest of the documentary */
  narrativeThread: {
    from: "Curiosity — 'What is this place?'",
    through: "Wonder — 'Modern Life Needs Play'",
    toward: "Discovery → Admiration → Desire → Confidence → Action",
    recurringMotifs: ["Movement", "Canopy", "Sport", "Architecture", "Community"],
  },

  /** Copy that belongs to the hero moment — sparse, earned */
  voice: {
    loading: "Phase 3",
    scrollCue: "Enter the experience",
    sportsDiscovery: "Discover the Sports District",
    /** Never on hero: prices, BHK counts, 'Enquire Now', RERA */
    forbiddenOnHero: [
      "Enquire Now",
      "Book a Site Visit",
      "Starting from",
      "Limited units",
      "2/3/4 BHK",
      "PRM/KA/RERA",
    ],
  },
} as const;

/** Type-safe beat lookup */
export function getHeroBeat(id: (typeof HERO_STORY.beats)[number]["id"]) {
  return HERO_STORY.beats.find((b) => b.id === id);
}
