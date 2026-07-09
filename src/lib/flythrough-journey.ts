/**
 * Continuous camera shot — drone flies through District 25.
 * Time progresses: morning → afternoon → golden hour → night.
 */

export type TimeOfDay = "morning" | "afternoon" | "golden" | "night";
export type FootballZone = "kickoff" | "midfield" | "final-third" | "goal";

export interface FlythroughWaypoint {
  id: string;
  time: string;
  timeOfDay: TimeOfDay;
  footballZone: FootballZone;
  title: string;
  subtitle: string;
  humanMoment: string;
  imageKey: keyof typeof IMAGE_KEYS;
  /** Layer revealed when façade peels (architectural depth) */
  layer?: "landscape" | "amenities" | "interiors" | "materials";
}

export const IMAGE_KEYS = {
  entrance: "sliderWeb2",
  football: "seaImg",
  clubhouse: "gallery2",
  pool: "gallery3",
  park: "gallery0",
  tower: "heroTowers",
  apartment: "creative2",
  skylounge: "creative3",
  sunset: "sliderWeb1",
  masterplan: "locationMap",
} as const;

export const FLYTHROUGH_WAYPOINTS: FlythroughWaypoint[] = [
  {
    id: "entrance",
    time: "6:00 AM",
    timeOfDay: "morning",
    footballZone: "kickoff",
    title: "The Entrance",
    subtitle: "A township built around movement",
    humanMoment: "A morning walk beneath the native canopy",
    imageKey: "entrance",
    layer: "landscape",
  },
  {
    id: "football",
    time: "8:00 AM",
    timeOfDay: "morning",
    footballZone: "kickoff",
    title: "FIFA-sized Football Pitch",
    subtitle: "20+ acres devoted to sport",
    humanMoment: "A father teaching his daughter to strike the ball",
    imageKey: "football",
    layer: "amenities",
  },
  {
    id: "boulevard",
    time: "10:00 AM",
    timeOfDay: "afternoon",
    footballZone: "midfield",
    title: "Living Corridor",
    subtitle: "Movement woven into daily life",
    humanMoment: "Friends cycling along the boulevard",
    imageKey: "pool",
    layer: "landscape",
  },
  {
    id: "pool",
    time: "12:00 PM",
    timeOfDay: "afternoon",
    footballZone: "midfield",
    title: "Aquatic & Leisure",
    subtitle: "Restoration between sessions",
    humanMoment: "Someone reading by the water's edge",
    imageKey: "pool",
    layer: "amenities",
  },
  {
    id: "clubhouse",
    time: "5:00 PM",
    timeOfDay: "golden",
    footballZone: "final-third",
    title: "The Clubhouse",
    subtitle: "2.5 lakh sq. ft. across 7 acres",
    humanMoment: "Friends gathering at the café terrace",
    imageKey: "clubhouse",
    layer: "interiors",
  },
  {
    id: "park",
    time: "5:30 PM",
    timeOfDay: "golden",
    footballZone: "final-third",
    title: "Central Park",
    subtitle: "3,500+ native trees · 40% green",
    humanMoment: "Kids playing in the pocket park",
    imageKey: "park",
    layer: "landscape",
  },
  {
    id: "tower",
    time: "6:30 PM",
    timeOfDay: "golden",
    footballZone: "goal",
    title: "Villa-Style Skyrise",
    subtitle: "Eight towers composed with intention",
    humanMoment: "Golden light across the façade",
    imageKey: "tower",
    layer: "materials",
  },
  {
    id: "apartment",
    time: "7:00 PM",
    timeOfDay: "golden",
    footballZone: "goal",
    title: "Your Future Home",
    subtitle: "2, 3 & 4 BHK skyrise residences",
    humanMoment: "A couple watching the sunset from the balcony",
    imageKey: "apartment",
    layer: "interiors",
  },
  {
    id: "skylounge",
    time: "8:00 PM",
    timeOfDay: "night",
    footballZone: "goal",
    title: "Sky Lounge",
    subtitle: "Elevated living above the canopy",
    humanMoment: "Apartment lights switch on across the township",
    imageKey: "skylounge",
    layer: "interiors",
  },
  {
    id: "sunset",
    time: "9:00 PM",
    timeOfDay: "night",
    footballZone: "goal",
    title: "Sunset Terrace",
    subtitle: "Football floodlights illuminate the field",
    humanMoment: "The skyline breathes with warm interior light",
    imageKey: "sunset",
    layer: "materials",
  },
];

export const TIME_OF_DAY_STYLES: Record<
  TimeOfDay,
  { filter: string; gradient: string; warmth: number }
> = {
  morning: {
    filter: "brightness(1.05) saturate(0.95) hue-rotate(-5deg)",
    gradient: "linear-gradient(to bottom, rgba(255,248,235,0.25) 0%, transparent 40%, rgba(28,46,31,0.15) 100%)",
    warmth: 0.2,
  },
  afternoon: {
    filter: "brightness(1.02) saturate(1.05)",
    gradient: "linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(28,46,31,0.2) 100%)",
    warmth: 0.1,
  },
  golden: {
    filter: "brightness(0.98) saturate(1.15) sepia(0.12)",
    gradient: "linear-gradient(to bottom, rgba(200,160,90,0.2) 0%, transparent 45%, rgba(30,28,25,0.35) 100%)",
    warmth: 0.45,
  },
  night: {
    filter: "brightness(0.72) saturate(0.85) hue-rotate(8deg)",
    gradient: "linear-gradient(to bottom, rgba(15,20,30,0.5) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)",
    warmth: 0.05,
  },
};

export const FOOTBALL_ZONES: { id: FootballZone; label: string; range: [number, number] }[] = [
  { id: "kickoff", label: "Kickoff", range: [0, 0.25] },
  { id: "midfield", label: "Midfield", range: [0.25, 0.5] },
  { id: "final-third", label: "Final Third", range: [0.5, 0.75] },
  { id: "goal", label: "Goal", range: [0.75, 1] },
];

export function getTimeOfDayAtProgress(progress: number): TimeOfDay {
  if (progress < 0.25) return "morning";
  if (progress < 0.5) return "afternoon";
  if (progress < 0.78) return "golden";
  return "night";
}

export function getActiveFootballZone(progress: number): FootballZone {
  const zone = FOOTBALL_ZONES.find((z) => progress >= z.range[0] && progress < z.range[1]);
  return zone?.id ?? "goal";
}
