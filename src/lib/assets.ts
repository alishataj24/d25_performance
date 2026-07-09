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
  masterplan: `${LOCAL}/masterplan.png`,
  sportsHeroBanner: `${LOCAL}/sports-hero-banner.png`,
  video: `${LOCAL}/hero-video.mp4`,
  seaImg: `${LOCAL}/sea-img.png`,

  /** Premium architectural renders — use to avoid repeating heroTowers */
  renders: {
    aerial: `${LOCAL}/township-aerial.png`,
    poolDay: `${LOCAL}/pool-day.png`,
    poolDusk: `${LOCAL}/pool-dusk.png`,
    towers: `${LOCAL}/hero-towers.png`,
    phase3Lifestyle: `${LOCAL}/phase3-lifestyle.png`,
    lifeInside: `${LOCAL}/life-inside.png`,
    inquiryPanel: `${LOCAL}/inquiry-panel.png`,
  },

  slider: {
    web1: `${LOCAL}/slider-web1.png`,
    web2: `${LOCAL}/slider-web2.png`,
    mob1: `${LOCAL}/slider-web1.png`,
    mob2: `${LOCAL}/slider-web2.png`,
  },

  config: {
    conf2: `${LOCAL}/conf-conf2.webp`,
    conf3: `${LOCAL}/conf-conf3.webp`,
    creative1: `${LOCAL}/gallery-creative1.jpg`,
    creative2: `${LOCAL}/gallery-creative2.jpg`,
    creative3: `${LOCAL}/gallery-creative3.jpg`,
  },

  gallery: [
    `${LOCAL}/township-aerial.png`,
    `${LOCAL}/pool-day.png`,
    `${LOCAL}/pool-dusk.png`,
    `${LOCAL}/gallery-gal1.png`,
    `${LOCAL}/gallery-gal3.webp`,
    `${LOCAL}/gallery-gal4.webp`,
    `${LOCAL}/gallery-gal5.webp`,
    `${LOCAL}/gallery-gal6.png`,
    `${LOCAL}/gallery-creative1.jpg`,
    `${LOCAL}/gallery-creative2.jpg`,
    `${LOCAL}/conf-conf3.webp`,
    `${LOCAL}/gallery-5.webp`,
    `${LOCAL}/hero-towers.png`,
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
