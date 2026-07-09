/**
 * District 25 — One uninterrupted camera shot.
 * Eleven chapters. No section breaks. Only discoveries.
 */

export const NARRATIVE_CHAPTERS = [
  {
    id: "arrival",
    number: "01",
    title: "Arrival",
    emotion: "Curiosity",
    transition: "architecture-fill",
    anchor: "home",
  },
  {
    id: "vision",
    number: "02",
    title: "The Vision",
    emotion: "Wonder",
    transition: "words-to-landscape",
    anchor: "overview",
  },
  {
    id: "sport-journey",
    number: "03",
    title: "Life Around Sport",
    emotion: "Admiration",
    transition: "field-to-masterplan",
    anchor: "amenities",
  },
  {
    id: "master-plan",
    number: "04",
    title: "Master Plan",
    emotion: "Discovery",
    transition: "zoom-to-tower",
    anchor: "master-plan",
  },
  {
    id: "homes",
    number: "05",
    title: "Homes",
    emotion: "Aspiration",
    transition: "unfold-interior",
    anchor: "configuration",
  },
  {
    id: "craftsmanship",
    number: "06",
    title: "Craftsmanship",
    emotion: "Trust",
    transition: "marble-to-sky",
    anchor: "specifications",
  },
  {
    id: "location",
    number: "07",
    title: "Location",
    emotion: "Confidence",
    transition: "roads-to-growth",
    anchor: "location",
  },
  {
    id: "investment",
    number: "08",
    title: "Investment",
    emotion: "Aspiration",
    transition: "skyline-to-photography",
    anchor: "investment",
  },
  {
    id: "gallery",
    number: "09",
    title: "Gallery",
    emotion: "Desire",
    transition: "lights-to-portraits",
    anchor: "gallery",
  },
  {
    id: "testimonials",
    number: "10",
    title: "Testimonials",
    emotion: "Confidence",
    transition: "portraits-to-concierge",
    anchor: "testimonials",
  },
  {
    id: "presentation",
    number: "11",
    title: "Private Presentation",
    emotion: "Action",
    transition: null,
    anchor: "invitation",
  },
] as const;

export type MorphVariant =
  | "ivory-forest"
  | "forest-charcoal"
  | "charcoal-ivory"
  | "forest-ivory"
  | "charcoal-forest"
  | "ivory-charcoal"
  | "transparent-forest"
  | "transparent-charcoal";

export const CHAPTER_MORPHS: Record<string, MorphVariant> = {
  "arrival-vision": "transparent-forest",
  "vision-sport-journey": "forest-charcoal",
  "sport-journey-master-plan": "charcoal-ivory",
  "master-plan-homes": "ivory-forest",
  "homes-craftsmanship": "forest-ivory",
  "craftsmanship-location": "ivory-charcoal",
  "location-investment": "charcoal-forest",
  "investment-gallery": "forest-charcoal",
  "gallery-testimonials": "charcoal-ivory",
  "testimonials-presentation": "ivory-forest",
};

export function getChapterMorph(fromId: string, toId: string): MorphVariant {
  return CHAPTER_MORPHS[`${fromId}-${toId}`] ?? "ivory-forest";
}

/** Sport journey environments — camera walks through the township */
export const SPORT_JOURNEY_STOPS = [
  {
    id: "football",
    title: "FIFA-sized Football Pitch",
    description:
      "Come discover the sporty side of the Soho life. The Sports District alone spans 20+ acres.",
    imageKey: "seaImg" as const,
  },
  {
    id: "boulevard",
    title: "Living Corridor",
    description: "A walking boulevard woven through the township — movement as daily ritual.",
    imageKey: "sliderWeb2" as const,
  },
  {
    id: "clubhouse",
    title: "Expansive 2.5 Lakh Sq. Ft. Clubhouse",
    description:
      "An expansive clubhouse spread across 7 acres — connection, wellness, and elevated living.",
    imageKey: "gallery2" as const,
  },
  {
    id: "pool",
    title: "Aquatic & Leisure",
    description: "Spaces for restoration between sessions — calm, water, light.",
    imageKey: "gallery3" as const,
  },
  {
    id: "kids",
    title: "Children's Play Area",
    description: "Tot-Lot and pocket parks where young lives learn to move.",
    imageKey: "gallery4" as const,
  },
  {
    id: "fitness",
    title: "Outdoor Gym & Mindful Movement",
    description: "Training under open sky. Recovery Lawn. Sportsmen Plaza.",
    imageKey: "sliderWeb1" as const,
  },
  {
    id: "gardens",
    title: "3,500+ Native Trees",
    description:
      "More than 40% green coverage. Ecology Trail, Pollinator Garden, Native Tree Thicket.",
    imageKey: "gallery0" as const,
  },
  {
    id: "open",
    title: "Oval Glade & Open Spaces",
    description: "Rain Tree Plaza to Palm Plaza — a complete tapestry of open space.",
    imageKey: "heroTowers" as const,
  },
] as const;

/** Location descent — camera falls from region to address */
export const LOCATION_DESCENT = [
  { label: "India", scale: 0.15 },
  { label: "Karnataka", scale: 0.35 },
  { label: "Bengaluru", scale: 0.55 },
  { label: "Sarjapur Road", scale: 0.75 },
  { label: "District 25", scale: 1 },
] as const;

/** Craftsmanship editorial rooms */
export const CRAFT_ROOMS = [
  { id: "living", title: "Living", spec: "Villa-style skyrise residences with dedicated parking" },
  { id: "kitchen", title: "Kitchen", spec: "Crafted for distinction — 2, 3 & 4 BHK configurations" },
  { id: "bedroom", title: "Bedroom", spec: "Privacy and comfort within an integrated township" },
  { id: "bathroom", title: "Materials", spec: "Construction informed by the legacy of Nambiar District 25" },
] as const;
