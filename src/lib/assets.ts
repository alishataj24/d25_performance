const LOCAL = "/assets";
const REMOTE = "https://district25.nambiarbuilders.com";

export function remote(path: string): string {
  return `${REMOTE}/${path.replace(/^\//, "")}`;
}

export const ASSETS = {
  // High-quality local assets
  logo: `${LOCAL}/logo-nav.png`,
  logoIcon: `${LOCAL}/logo-icon.png`,
  logoFull: `${LOCAL}/logo.png`,
  logoLight: `${LOCAL}/logo-district25-light.png`,
  nambiarBuilders: `${LOCAL}/nambiar-builders.png`,
  nambiarBuildersWhite: `${LOCAL}/nambiar-builders-white.png`,
  heroTowers: `${LOCAL}/hero-towers.png`,
  masterplan: `${LOCAL}/masterplan-hires.png`,
  sportsHeroBanner: `${LOCAL}/sports-hero-banner.png`,
  video: `${LOCAL}/hero-video.mp4`,
  seaImg: `${LOCAL}/sea-img.png`,

  /** Premium architectural renders — use to avoid repeating heroTowers */
  renders: {
    aerial: `${LOCAL}/township-aerial-night.jpg`,
    poolDay: `${LOCAL}/pool-day.png`,
    poolDusk: `${LOCAL}/pool-dusk.png`,
    towers: `${LOCAL}/hero-towers.png`,
    phase3Lifestyle: `${LOCAL}/phase3-lifestyle.png`,
    lifeInside: `${LOCAL}/life-inside.png`,
    dropOff: `${LOCAL}/drop-off-day.png`,
    sportsArena: `${LOCAL}/sports-arena.jpg`,
    gardenLounge: `${LOCAL}/garden-lounge.jpg`,
    treePlaza: `${LOCAL}/tree-plaza.jpg`,
    yogaDeck: `${LOCAL}/yoga-deck.jpg`,
    eldersPlaza: `${LOCAL}/elders-plaza.jpg`,
    inquiryPanel: `${LOCAL}/inquiry-panel.png`,
  },

  slider: {
    /** Desktop landscape creatives (original — used across site) */
    web1: `${LOCAL}/slider-web1.png`,
    web2: `${LOCAL}/slider-web2.png`,
    web3: `${LOCAL}/banner-desk-elevation-v2.png`,
    web4: `${LOCAL}/banner-desk-interior-v2.png`,
    /** Desktop hero — all same size 1024×460 */
    desk1: `${LOCAL}/banner-desk-1.png`,
    desk2: `${LOCAL}/banner-desk-2.png`,
    desk3: `${LOCAL}/banner-desk-3.png`,
    desk4: `${LOCAL}/banner-desk-4-v5.png`,
    /** Mobile hero — all same size 682×1024 */
    mob1: `${LOCAL}/banner-mob-1.png`,
    mob2: `${LOCAL}/banner-mob-2.png`,
    mob3: `${LOCAL}/banner-mob-3.png`,
  },

  config: {
    conf2: `${LOCAL}/conf-conf2.webp`,
    conf3: `${LOCAL}/conf-conf3.webp`,
    creative1: `${LOCAL}/gallery-creative1.jpg`,
    creative2: `${LOCAL}/gallery-creative2.jpg`,
    creative3: `${LOCAL}/gallery-creative3.jpg`,
    // Interior mock-ups — one per configuration card
    interior2bhk: `${LOCAL}/interior-2bhk.jpg`,
    interior3bhk2t: `${LOCAL}/interior-3bhk-2t.jpg`,
    interior3bhk3t: `${LOCAL}/interior-3bhk-3t.jpg`,
    interior4bhk: `${LOCAL}/interior-4bhk.jpg`,
    interior45bhk: `${LOCAL}/interior-45bhk.jpg`,
  },

  gallery: [
    `${LOCAL}/gallery-gal3.webp`,        // clubhouse at sunset — strong opener
    `${LOCAL}/pool-dusk.png`,
    `${LOCAL}/gallery-beach-volleyball.jpg`,
    `${LOCAL}/drop-off-day.png`,          // arrival canopy
    `${LOCAL}/gallery-gal5.webp`,
    `${LOCAL}/gallery-pet-park.jpg`,      // pet park (aerial)
    `${LOCAL}/gallery-gal1.png`,          // rooftop playground
    `${LOCAL}/gallery-sports.jpg`,
    `${LOCAL}/gallery-gal4.webp`,         // lap pool
    `${LOCAL}/gallery-maidaan.jpg`,       // maidaan — evening event lawn
    `${LOCAL}/gallery-swimming-pool.jpg`,
    `${LOCAL}/conf-conf3.webp`,           // interior — variety
    `${LOCAL}/gallery-balcony.jpg`,       // balcony detail at sunset
    `${LOCAL}/gallery-gal6.png`,          // towers + pool — dramatic closer
  ],

  // Remote assets (icons, location, testimonials)
  favicon: remote("images/favicon.png"),
  brochure: remote("images/brochure.pdf"),
  whatsapp: remote("images/whatsapp.png"),
  patch: remote("images/patch.png"),
  footerTop: remote("images/footertop.webp"),
  locationMap: remote("images/location.svg"),

  icons: {
    clubhouse: remote("images/icon/1.png"),
    clubhouseAcres: remote("images/icon/2.png"),
    retail: remote("images/icon/3.png"),
    villa: remote("images/icon/4.png"),
    trees: remote("images/icon/5.png"),
  },

  testimonials: [
    remote("images/fam.webp"),
    remote("images/thumb.webp"),
    remote("images/raman.webp"),
    remote("images/new-test1.jpeg"),
    remote("images/new-test2.jpeg"),
  ],

  location: {
    tisb: remote("images/locs/1.jpg"),
    greenwood: remote("images/locs/3.jpg"),
    centroMall: remote("images/locs/4.jpg"),
    metro: remote("images/locs/7.jpg"),
    railway: remote("images/locs/6.jpg"),
    wipro: remote("images/locs/8.jpg"),
    cisco: remote("images/locs/9.jpg"),
    accenture: remote("images/locs/10.jpg"),
    manipal: remote("images/locs/11.jpg"),
  },
} as const;
