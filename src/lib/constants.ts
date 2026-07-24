import { ASSETS } from "./assets";

export const SITE = {
  name: "Nambiar District 25",
  tagline: "Live the SOHO Life",
  phase: "Phase 3",
  phone: "+91 8150 844 844",
  phoneHref: "tel:+918150844844",
  whatsapp: "https://wa.me/918150844844",
  whatsappIcon: ASSETS.whatsapp,
  brochure: ASSETS.brochure,
  logo: ASSETS.logo,
  rera: "PRM/KA/RERA/1251/308/PR/260526/008686",
  reraPhases: [
    { phase: "District 25 Phase 1", number: "PRM/KA/RERA/1251/308/PR/100125/007377" },
    { phase: "District 25 Phase 2", number: "PRM/KA/RERA/1251/308/PR/200825/008011" },
    { phase: "District 25 Phase 3", number: "PRM/KA/RERA/1251/308/PR/260526/008686" },
  ],
  siteAddress:
    "Chandapura Dommasandra Road, Dommasandra, Bengaluru – 562125",
  corporateAddress:
    "2nd Floor, PR Business Centre, Above Croma, Outer Ring Road, Kadubisanahalli, Marathahalli Post, Bengaluru – 560103",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#overview" },
  { label: "Configuration", href: "#configuration" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
] as const;

export const CHAPTERS = [
  { id: "overview", number: "01", title: "Modern Life Needs Play" },
  { id: "vision", number: "02", title: "The Vision" },
  { id: "district", number: "03", title: "Experience the SOHO Life" },
  { id: "nature", number: "04", title: "Nature" },
  { id: "sports-district", number: "05", title: "Sports District" },
  { id: "architecture", number: "06", title: "Architecture" },
  { id: "clubhouse", number: "07", title: "Clubhouse" },
  { id: "master-plan", number: "08", title: "Master Plan" },
  { id: "configuration", number: "09", title: "Floor Plans" },
  { id: "specifications", number: "10", title: "Specifications" },
  { id: "amenities", number: "11", title: "Amenities" },
  { id: "gallery", number: "12", title: "Gallery" },
  { id: "investment", number: "13", title: "Investment Highlights" },
  { id: "construction", number: "14", title: "Construction Quality" },
  { id: "testimonials", number: "15", title: "Testimonials" },
  { id: "connectivity", number: "16", title: "Connectivity" },
  { id: "location", number: "17", title: "Location" },
  { id: "legal", number: "18", title: "Legal Information" },
] as const;

export function getChapter(id: string) {
  return CHAPTERS.find((c) => c.id === id);
}

export function getConciergeSubmitLabel(type: "enquire" | "pricing" | "brochure" | "viewing") {
  const { submit, submitEnquire, submitViewing } = VOICE.modal;
  if (type === "viewing") return submitViewing;
  if (type === "enquire") return submitEnquire;
  return submit;
}

/** Experiential voice — desire through invitation, never urgency */
export const VOICE = {
  arrival: {
    cue: "Enter the experience",
    sportsAria: "Discover the Sports District",
  },
  hero: {
    idea: "Movement · Sport · Wellness · Community",
    ideaLine: "A township built around movement",
    watchStory: "Watch the Story",
    privatePresentation: "Book a Visit",
  },
  loading: "Phase 3",
  cta: {
    connect: "Enquire Now",
    collection: "Brochure",
    exploreResidence: "Explore This Residence",
    residenceDetails: "Residence Details",
    privateViewing: "Arrange a Visit",
    nav: "Enquire",
    floatingConnect: "Enquire Now",
    floatingCollection: "Brochure",
    viewCollection: "View Brochure",
  },
  modal: {
    enquire: {
      title: "Enquire Now",
      subtitle: "Share your details and we’ll get back to you shortly.",
    },
    pricing: {
      title: "Get Details",
      subtitle: "Leave your details and we’ll share the residence particulars.",
    },
    brochure: {
      title: "Download Brochure",
      subtitle: "Share your details to receive the brochure, or open it directly.",
      directLink: "Open brochure",
    },
    viewing: {
      title: "Book a Visit",
      subtitle: "Share your details and we’ll arrange a site visit.",
    },
    submit: "Submit",
    submitEnquire: "Submit",
    submitViewing: "Book Visit",
    thankTitle: "Thank you.",
    thankBody: "Our team will contact you shortly.",
    phoneNote: "Or call us at",
  },
  finalCta: {
    eyebrow: "An Invitation",
    headline: "Live the SOHO Life",
    body:
      "For those drawn to movement, wellness, and the quiet confidence of architectural distinction — Phase 3 awaits. Share your details, and we will continue the conversation privately.",
    submitLabel: "Continue",
  },
  footer: {
    essence:
      "An integrated township where sport, nature, and refined living converge — an address shaped for generations.",
  },
  testimonials: {
    subhead: "Voices from those who already belong",
  },
  amenities: {
    listIntro: "The complete tapestry",
  },
} as const;

export const CHAPTER_ESSENCE: Record<string, string> = {
  overview: "Movement · Wellness",
  vision: "Aspiration · Prestige",
  district: "Belonging · Sophistication",
  nature: "Calm confidence · Wellness",
  "sports-district": "Performance · Pride",
  architecture: "Architectural elegance",
  clubhouse: "Belonging · Timeless luxury",
  configuration: "Family legacy · Prestige",
  specifications: "Architectural elegance",
  amenities: "Wellness · Sophistication",
  gallery: "Architectural elegance",
  investment: "Aspiration · Prestige",
  construction: "Trust · Craftsmanship",
  testimonials: "Belonging · Family legacy",
  connectivity: "Prestige · Calm confidence",
  location: "Prestige · Calm confidence",
  legal: "Confidence",
};

/** Documentary emotional arc — each scene advances the visitor one step */
export const STORY_JOURNEY: Record<
  string,
  { emotion: string; scene: string }
> = {
  home: { emotion: "Curiosity", scene: "The Arrival" },
  overview: { emotion: "Wonder", scene: "A Philosophy" },
  vision: { emotion: "Discovery", scene: "The Vision" },
  district: { emotion: "Admiration", scene: "Life Inside" },
  nature: { emotion: "Admiration", scene: "The Canopy" },
  "sports-district": { emotion: "Admiration", scene: "The Sports District" },
  architecture: { emotion: "Trust", scene: "The Architecture" },
  clubhouse: { emotion: "Trust", scene: "The Clubhouse" },
  "master-plan": { emotion: "Discovery", scene: "The Master Plan" },
  configuration: { emotion: "Aspiration", scene: "Floor Plans" },
  specifications: { emotion: "Trust", scene: "Specifications" },
  amenities: { emotion: "Desire", scene: "The Amenities" },
  gallery: { emotion: "Desire", scene: "The Gallery" },
  investment: { emotion: "Aspiration", scene: "Investment Highlights" },
  construction: { emotion: "Confidence", scene: "Construction Quality" },
  testimonials: { emotion: "Confidence", scene: "The Voices" },
  connectivity: { emotion: "Confidence", scene: "Connectivity" },
  location: { emotion: "Confidence", scene: "The Address" },
  legal: { emotion: "Action", scene: "Legal Information" },
  invitation: { emotion: "Action", scene: "The Invitation" },
};

export function getStoryBeat(id: string) {
  return STORY_JOURNEY[id];
}

export const HERO_COPY = {
  headline: "Live the SOHO Life",
  headlineAccent: "in Bengaluru",
  subheadline:
    "Phase 3 also offers 2, 3 & 4 BHK skyrise residences, bringing together sports, greenery, and elevated living.",
  paragraphs: [
    "Nambiar District 25 is an integrated township redefining modern living in Bengaluru with luxury, sustainability, and connectivity, featuring a sprawling green space that covers more than 40% of the site, with 3500+ native trees carefully planted to honour Bengaluru's natural beauty. Villa-style skyrise residences offer privacy and comfort.",
    "After the success of Phase 1 & Phase 2, Phase 3 raises the bar.",
    "Come discover the sporty side of the Soho life. The Sports District alone spans 20+ acres, with a FIFA-sized football pitch, 5 tennis courts, 8 badminton courts, beach volleyball and a full range of recreational facilities — anchored by a seven-acre clubhouse.",
    "Phase 3 also offers 2, 3 & 4 BHK skyrise residences, bringing together sports, greenery, and elevated living.",
  ],
} as const;

export const COPY = {
  philosophy: {
    label: "Overview",
    headline: "Modern Life Needs Play",
    opening:
      "Modern life has given us convenience, comfort and endless content. It has also given us stress, screen time and sedentary routines.",
    pullquote: "Play is the cure.",
    body:
      "The new phase brings sports-focussed architecture to the modern living promise of Nambiar District 25, thus creating a space where residents can rediscover a life where play is as important as any other aspect of modern life.",
    closing: ["Play more.", "Live more."],
  },
  vision: {
    label: "Phase 3 Details",
    manifestoLabel: "District 25",
    phaseLabel: "Phase 3 Details",
    phaseHeadline: "Nambiar District 25 Phase 3",
    unitsLine: "Villa-style skyrise residences",
    towersLabel: "Towers",
    experienceHeadline: "Experience the SOHO Life in Bengaluru",
  },
  lifeInside: {
    label: "Experience the SOHO Life",
    headline: "Experience the SOHO Life in Bengaluru",
    subheadline:
      "Proposed Retail & Commercial Space, 3500+ Native Trees, Villa-Styled Skyrise Residences, and an Expansive 2.5 Lakh Sq. Ft. Clubhouse spread across 7 acres — Phase 3 brings together sport, greenery, and elevated living.",
    moments: [
      {
        title: "Villa-Styled Skyrise Residences",
        description:
          "Villa-style skyrise residences offer privacy and comfort within an integrated township setting.",
      },
      {
        title: "Sports & Recreation",
        description:
          "Come discover the sporty side of the Soho life. The Sports District alone spans 20+ acres, with a FIFA-sized football pitch, 5 tennis courts, 8 badminton courts, beach volleyball and a full range of recreational facilities — anchored by a seven-acre clubhouse.",
      },
      {
        title: "Green Living",
        description:
          "A sprawling green space that covers more than 40% of the site, with 3500+ native trees carefully planted to honour Bengaluru's natural beauty.",
      },
    ],
  },
  nature: {
    label: "Nature",
    headline: "3,500+ Native Trees. More Than 40% Green Coverage.",
    body: [
      "Nambiar District 25 features a sprawling green space that covers more than 40% of the site, with 3500+ native trees carefully planted to honour Bengaluru's natural beauty.",
      "Ecology Trail, Pollinator Garden, Native Tree Thicket, Heliconia Garden, Medicinal Plant Beds, and Aromatic Plants weave nature into everyday living.",
    ],
    features: [
      "Ecology Trail",
      "Pollinator Garden",
      "Native Tree Thicket",
      "Heliconia Garden",
      "Medicinal Plant Beds",
      "Aromatic Plants",
    ],
  },
  sports: {
    label: "The Sports District",
    headline: "20+ Acres Devoted to Sport",
    body:
      "Come discover the sporty side of the Soho life. The Sports District alone spans 20+ acres, with a FIFA-sized football pitch, 5 tennis courts, 8 badminton courts, beach volleyball and a full range of recreational facilities — anchored by a seven-acre clubhouse.",
    highlights: [
      { label: "Sportsmen Plaza", desc: "A gathering point for athletes and admirers" },
      { label: "Recovery Lawn", desc: "Space to restore between sessions" },
      { label: "Outdoor Gym", desc: "Training under open sky" },
    ],
  },
  architecture: {
    label: "Architecture",
    headline: "Eight Towers. Villa-Style Skyrise Living.",
    body:
      "Villa-style skyrise residences that dissolve the boundary between horizontal luxury and vertical living — two towers of 36 floors and four towers of 38 floors, composed with intention across the township.",
  },
  clubhouse: {
    headline: "Expansive 2.5 Lakh Sq. Ft. Clubhouse",
    subheadline: "Clubhouse spread across 7 acres",
    body:
      "An expansive clubhouse spread across 7 acres — a social architecture designed for connection, wellness, and elevated living at the heart of District 25.",
  },
  residences: {
    label: "Configuration",
    floorPlansLabel: "Floor Plans",
    headline: "Unveiled",
    subheadline:
      "Explore 2, 3 & 4 BHK skyrise residences — each configuration crafted for distinction, comfort, and elevated living.",
    artisticNote: "Artistic Impression",
  },
  amenities: {
    label: "Amenities",
    headline: "Beyond a Home — Embrace a Lifestyle of Distinction",
    subheadline:
      "Every corner of District 25 has been designed with intention — from Rain Tree Plaza to Palm Plaza, a complete tapestry of lifestyle amenities.",
    expandCta: "View All Amenities",
  },
  gallery: {
    label: "Gallery",
    headline: "Your Future Home Unveiled",
    secondaryHeadline: "Where Space Meets Lifestyle",
    tertiaryHeadline: "A Glimpse into District 25 – Phase 3",
    instruction: "Click on the visuals to expand",
  },
  testimonials: {
    label: "Testimonials",
    headline: "Testimonials",
  },
  location: {
    label: "Location",
    headline: "South East Bengaluru's Finest Landmark",
    subheadline: "Location Advantage",
    siteLabel: "Site Address",
    corporateLabel: "Corporate Address",
    reraLabel: "RERA Number",
    phoneLabel: "Phone",
  },
  masterPlan: {
    headline: "One Integrated Township",
    subheadline: "The complete Nambiar District 25 — all three phases, master planned as one.",
    body: "A sprawling master plan integrating villa-style skyrise residences, sports districts, native tree canopy, clubhouse, and proposed retail & commercial space.",
  },
  specifications: {
    headline: "Specifications",
    subheadline: "Phase 3 Details",
    unitsLine: "Villa-style skyrise residences",
    towersLabel: "Towers",
  },
  connectivity: {
    headline: "Connectivity",
    subheadline: "Location Advantage",
  },
  investment: {
    headline: "Investment Highlights",
    subheadline: "Experience the SOHO Life in Bengaluru",
  },
  construction: {
    headline: "Construction Quality",
    subheadline: "After the success of Phase 1 & Phase 2, Phase 3 raises the bar.",
    body: "Villa-style skyrise residences composed with intention — dedicated parking, tower specifications engineered for privacy and comfort, and construction informed by the legacy of Nambiar District 25.",
    artisticNote: "Artistic Impression",
  },
  legal: {
    headline: "Legal Information",
    disclaimer:
      "All visuals are artistic impressions for representational purposes. Specifications, amenities, and surroundings are indicative and subject to change.",
    copyright: "© 2026 Nambiar District 25. All rights reserved.",
  },
  finalCta: {
    eyebrow: "An Invitation",
    headline: "Live the SOHO Life",
    body:
      "For those drawn to movement, wellness, and the quiet confidence of architectural distinction — Phase 3 awaits. Share your details, and we will continue the conversation privately.",
    submitLabel: "Continue",
  },
} as const;

export const STATS = [
  { value: 40, suffix: "%", label: "Mother Earth Retained" },
  { value: 4, suffix: "", label: "Units per Floor" },
  { value: 150, suffix: "+", label: "Outdoor Amenities" },
  { value: 85, suffix: "%", label: "Open Space" },
] as const;

export const HIGHLIGHTS = [
  {
    title: "Proposed Retail & Commercial Space",
    icon: ASSETS.icons.retail,
  },
  {
    title: "3500+ Native Trees",
    icon: ASSETS.icons.trees,
  },
  {
    title: "Villa-Styled Skyrise Residences",
    icon: ASSETS.icons.villa,
  },
  {
    title: "Expansive 2.5 Lakh Sq. Ft. Clubhouse",
    icon: ASSETS.icons.clubhouse,
  },
  {
    title: "40+ Schools",
    icon: ASSETS.icons.clubhouseAcres,
  },
] as const;

export const CONFIGURATIONS = [
  {
    id: "2bhk",
    title: "Designed for Distinction",
    type: "2BHK + 2T",
    area: 1252,
    image: ASSETS.config.interior2bhk,
  },
  {
    id: "3bhk-2t",
    title: "Crafted for Comfort",
    type: "3BHK + 2T",
    area: 1518,
    image: ASSETS.config.interior3bhk2t,
  },
  {
    id: "3bhk-3t",
    title: "Experience Elevated",
    type: "3BHK + 3T",
    area: 2060,
    image: ASSETS.config.interior3bhk3t,
  },
  {
    id: "4bhk",
    title: "Luxury, Redefined",
    type: "4BHK + 4T",
    area: 2613,
    image: ASSETS.config.interior4bhk,
  },
  {
    id: "4.5bhk",
    title: "Crafted for Families",
    type: "4.5BHK + 4T",
    area: 2980,
    image: ASSETS.config.interior45bhk,
  },
] as const;

export const AMENITIES = [
  "Rain Tree Plaza",
  "Podium Driveway",
  "Podium Drop-off",
  "Pocket Park",
  "Elders Plaza with Reflexology Trail",
  "Children's Play Area",
  "Tot-Lot",
  "Ecology Trail",
  "Mindful Movement Area",
  "Garden Workspace",
  "Vine Trellis with sitout",
  "Living Corridor",
  "Garden Lounge",
  "Pollinator Garden",
  "Outdoor Gym",
  "Futsal Court with stepped seating",
  "Box Cricket",
  "Basketball Court",
  "Pickle Ball Court with stepped seating",
  "Oval Glade",
  "Native Tree Thicket",
  "Park Pavilion",
  "Sportsmen Plaza",
  "Recovery Lawn",
  "Aromatic Plants",
  "Heliconia Garden",
  "Medicinal Plant Beds",
  "Palm Plaza",
] as const;

export const SPORTS = [
  "FIFA-sized football pitch",
  "5 tennis courts",
  "8 badminton courts",
  "Beach volleyball",
  "Futsal Court with stepped seating",
  "Box Cricket",
  "Basketball Court",
  "Pickle Ball Court with stepped seating",
] as const;

export const LOCATION_HIGHLIGHTS = [
  {
    title: "Narayana Health",
    description: "World-class healthcare within reach",
    image: ASSETS.location.manipal,
  },
  {
    title: "Easy Access to Bellandur, ITPL & Electronic City",
    description: "Seamless connectivity to Bengaluru's employment hubs",
    image: ASSETS.location.centroMall,
  },
  {
    title: "15-Minute Drive to New Wipro HQ",
    description: "Minutes from Bengaluru's tech corridor",
    image: ASSETS.location.wipro,
  },
  {
    title: "Close to Cisco, Siemens & Biocon",
    description: "Proximity to global enterprise campuses",
    image: ASSETS.location.cisco,
  },
  {
    title: "Close to Infosys, HP & HCL",
    description: "Easy access for technology professionals",
    image: ASSETS.location.accenture,
  },
  {
    title: "Upcoming Metro Station",
    description: "Upcoming Metro Blue Line: Central Silkboard – KR Puram",
    image: ASSETS.location.metro,
  },
  {
    title: "Reputed International Schools",
    description: "Greenwood High, TISB, and more",
    image: ASSETS.location.greenwood,
  },
] as const;

export const LOCATION_LANDMARKS = [
  { name: "Manipal Hospitals", image: ASSETS.location.manipal },
  { name: "Greenwood High", image: ASSETS.location.greenwood },
  { name: "Wipro Campus", image: ASSETS.location.wipro },
  { name: "Cisco", image: ASSETS.location.cisco },
  { name: "Centro Mall", image: ASSETS.location.centroMall },
  { name: "Upcoming Metro Blue Line", image: ASSETS.location.metro },
  { name: "The International School Bangalore (TISB)", image: ASSETS.location.tisb },
] as const;

export const PHASE_DETAILS = {
  units: 1202,
  towers: 6,
  towerSpecs: [
    "Two towers of 36 floors with 3 parking levels",
    "Four towers of 38 floors with 4 parking levels",
  ],
  clubhouse: "2.5 Lakh Sq. Ft.",
  clubhouseArea: "7 acres",
} as const;

export const GALLERY_IMAGES = ASSETS.gallery;

export const TESTIMONIALS = ASSETS.testimonials;

export const OVERVIEW_IMAGES = [
  ASSETS.heroTowers,
  ASSETS.slider.web1,
  ASSETS.slider.web2,
  ASSETS.seaImg,
] as const;
