"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { SceneDirector } from "@/components/ui/SceneDirector";
import { TextReveal } from "@/components/ui/TextReveal";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { COPY, getChapter } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { ease, duration } from "@/lib/animations";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Keyword → line icon (lucide-style), so every amenity gets a fitting visual */
function AmenityIcon({ name, size = 22 }: { name: string; size?: number }) {
  const n = name.toLowerCase();
  const props = { width: size, height: size, viewBox: "0 0 24 24", ...S };

  if (n.includes("driveway") || n.includes("drop-off"))
    return (
      <svg {...props}>
        <path d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11" />
        <path d="M3 11h18v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-5z" />
        <circle cx="7" cy="14" r="1" />
        <circle cx="17" cy="14" r="1" />
      </svg>
    );
  if (n.includes("gym"))
    return (
      <svg {...props}>
        <path d="M6.5 6.5l11 11M4 8l2-2m12 12l2-2M8 4l2 2M14 18l2 2" />
        <path d="M4 8L2 10m20 4l-2 2" />
      </svg>
    );
  if (
    n.includes("cricket") ||
    n.includes("basketball") ||
    n.includes("futsal") ||
    n.includes("pickle") ||
    n.includes("volleyball") ||
    n.includes("court")
  )
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5v17M6 6c2 2 2 10 0 12M18 6c-2 2-2 10 0 12" />
      </svg>
    );
  if (n.includes("play") || n.includes("tot"))
    return (
      <svg {...props}>
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v6m0 0l-3 4m3-4l3 4M8 10h8" />
      </svg>
    );
  if (
    n.includes("trail") ||
    n.includes("movement") ||
    n.includes("reflex") ||
    n.includes("recovery") ||
    n.includes("corridor")
  )
    return (
      <svg {...props}>
        <path d="M7 8.5c-1 0-1.6.7-1.6 1.8 0 1.4.8 2.2.8 3.4 0 .8-.6 1.3-1.4 1.3M7 8.5c1 0 1.5.8 1.5 1.8 0 1.3-.7 2-.7 3.2" />
        <path d="M16 5.5c-1 0-1.6.7-1.6 1.8 0 1.4.8 2.2.8 3.4 0 .8-.6 1.3-1.4 1.3M16 5.5c1 0 1.5.8 1.5 1.8 0 1.3-.7 2-.7 3.2" />
      </svg>
    );
  if (n.includes("workspace"))
    return (
      <svg {...props}>
        <rect x="3" y="7" width="18" height="12" rx="1.5" />
        <path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M3 12h18" />
      </svg>
    );
  if (n.includes("lounge") || n.includes("pavilion") || n.includes("trellis"))
    return (
      <svg {...props}>
        <path d="M4 11V9a2 2 0 012-2h12a2 2 0 012 2v2" />
        <path d="M3 12a2 2 0 012 2v3m14-5a2 2 0 00-2 2v3M5 17h14M3 12h18" />
      </svg>
    );
  if (
    n.includes("garden") ||
    n.includes("pollinator") ||
    n.includes("heliconia") ||
    n.includes("aromatic") ||
    n.includes("medicinal") ||
    n.includes("plaza") ||
    n.includes("park") ||
    n.includes("glade") ||
    n.includes("thicket")
  )
    return (
      <svg {...props}>
        <circle cx="12" cy="9" r="2.2" />
        <path d="M12 9c0-2.5 1.5-4 3.5-4-.2 2.2-1.4 3.4-3.5 4zM12 9c0-2.5-1.5-4-3.5-4 .2 2.2 1.4 3.4 3.5 4zM12 11v9M9.5 16c-1.5-.3-2.5-1.2-3-2.6 1.6-.2 2.7.6 3 2.6zm5 0c1.5-.3 2.5-1.2 3-2.6-1.6-.2-2.7.6-3 2.6z" />
      </svg>
    );
  // default — leaf / green
  return (
    <svg {...props}>
      <path d="M5 19c0-8 5-13 14-13 0 9-5 14-13 14M5 19c1.5-4 4-6.5 8-8" />
    </svg>
  );
}

type Collection = {
  id: string;
  title: string;
  tagline: string;
  image: string;
  items: string[];
};

/** 28 amenities, curated into cinematic collections you explore one at a time. */
const COLLECTIONS: Collection[] = [
  {
    id: "sport",
    title: "Sport & Play",
    tagline: "Where the body comes alive.",
    image: ASSETS.renders.sportsArena,
    items: [
      "Outdoor Gym",
      "Futsal Court with stepped seating",
      "Box Cricket",
      "Basketball Court",
      "Pickle Ball Court with stepped seating",
      "Oval Glade",
      "Sportsmen Plaza",
    ],
  },
  {
    id: "gardens",
    title: "Gardens & Biodiversity",
    tagline: "A living, breathing landscape.",
    image: ASSETS.renders.treePlaza,
    items: [
      "Pollinator Garden",
      "Aromatic Plants",
      "Heliconia Garden",
      "Medicinal Plant Beds",
      "Native Tree Thicket",
      "Vine Trellis with sitout",
      "Garden Lounge",
    ],
  },
  {
    id: "wellness",
    title: "Wellness & Movement",
    tagline: "Slow down. Restore. Breathe.",
    image: ASSETS.renders.eldersPlaza,
    items: [
      "Mindful Movement Area",
      "Elders Plaza with Reflexology Trail",
      "Recovery Lawn",
      "Ecology Trail",
      "Living Corridor",
    ],
  },
  {
    id: "family",
    title: "Family & Community",
    tagline: "Room for every generation.",
    image: ASSETS.renders.yogaDeck,
    items: [
      "Children's Play Area",
      "Tot-Lot",
      "Pocket Park",
      "Garden Workspace",
    ],
  },
  {
    id: "arrival",
    title: "Plazas & Arrival",
    tagline: "A grand welcome, every day.",
    image: ASSETS.renders.dropOff,
    items: [
      "Rain Tree Plaza",
      "Palm Plaza",
      "Park Pavilion",
      "Podium Driveway",
      "Podium Drop-off",
    ],
  },
];

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
};
const listItem = {
  hidden: { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.normal, ease: ease.out } },
};

export function Experiences() {
  const { amenities } = COPY;
  const chapter = getChapter("amenities")!;
  const [active, setActive] = useState(0);
  const current = COLLECTIONS[active];

  // Keep the active mobile pill centered in the strip only — never scroll the page
  const pillsRef = useRef<HTMLDivElement>(null);
  const prevActive = useRef(active);
  useEffect(() => {
    const container = pillsRef.current;
    const el = container?.children[active] as HTMLElement | undefined;
    if (!container || !el) return;

    // Skip mount so mobile landing stays on the hero banner
    if (prevActive.current === active) return;
    prevActive.current = active;

    const left = el.offsetLeft - (container.clientWidth - el.clientWidth) / 2;
    container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  // Cursor-driven parallax + tilt for the image stage
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.3 });
  const imgX = useTransform(sx, [-0.5, 0.5], ["-16px", "16px"]);
  const imgY = useTransform(sy, [-0.5, 0.5], ["-16px", "16px"]);
  const rotY = useTransform(sx, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotX = useTransform(sy, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="amenities" className="relative bg-canvas overflow-hidden">
      {/* Ambient light wash reacting to the palette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_78%_18%,rgba(122,92,50,0.08),transparent_60%)]" />

      <SceneDirector sceneId="amenities">
        <div className="section-padding px-container relative z-[1]">
          <div className="mx-frame">
            {/* Editorial masthead */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-[640px]">
                <span className="kicker mb-6">
                  {chapter.title}
                </span>
                <TextReveal as="h2" className="h-section text-forest">
                  {amenities.headline}
                </TextReveal>
              </div>
            </div>

            {/* How-to affordance so the interaction is obvious */}
            <div className="mt-7 hidden items-center gap-2.5 lg:flex">
              <span className="h-px w-8 bg-bronze/40" aria-hidden />
              <span className="whitespace-nowrap text-[0.85rem] tracking-[0.02em] text-grey-600">
                Move your mouse over a collection below to see what&apos;s inside
              </span>
              <motion.span
                aria-hidden
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="text-bronze"
              >
                →
              </motion.span>
            </div>

            {/* Mobile collection switcher (tap) */}
            <div className="mt-10 flex flex-col gap-3 lg:hidden">
              <div
                ref={pillsRef}
                data-lenis-prevent
                className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {COLLECTIONS.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setActive(i)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-[0.78rem] tracking-[0.02em] transition-colors duration-300 ${
                      i === active
                        ? "border-bronze bg-bronze text-ivory"
                        : "border-bronze/25 text-grey-600"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>

              {/* Position indicator — shows how many collections there are */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  {COLLECTIONS.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => setActive(i)}
                      aria-label={`Show ${c.title}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? "w-5 bg-bronze" : "w-1.5 bg-bronze/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-[0.72rem] tracking-[0.04em] text-grey-500">
                  {active + 1} / {COLLECTIONS.length} · swipe to explore
                </span>
              </div>
            </div>

            {/* Interactive triptych: index · stage · living list */}
            <div className="mt-8 lg:mt-16 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
              {/* 01 — Index (desktop only) */}
              <div className="hidden lg:col-span-3 lg:block">
                <ul className="flex h-full flex-col justify-center">
                  {COLLECTIONS.map((c, i) => {
                    const isActive = i === active;
                    return (
                      <li key={c.id}>
                        <button
                          onMouseEnter={() => setActive(i)}
                          onFocus={() => setActive(i)}
                          onClick={() => setActive(i)}
                          className="group relative flex w-full items-center gap-4 border-b border-forest/10 py-5 pl-5 text-left"
                        >
                          {isActive && (
                            <motion.span
                              layoutId="amenity-active-bar"
                              className="absolute left-0 top-1/2 h-9 w-[3px] -translate-y-1/2 rounded-full bg-bronze"
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                          )}
                          <span
                            className={`w-7 text-[0.7rem] tabular-nums tracking-[0.1em] transition-colors duration-300 ${
                              isActive ? "text-bronze" : "text-grey-600/50"
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <motion.span
                            animate={{ x: isActive ? 6 : 0 }}
                            transition={{ type: "spring", stiffness: 320, damping: 30 }}
                            className={`flex-1 text-[clamp(1.05rem,1.4vw,1.35rem)] font-light leading-tight tracking-[-0.01em] transition-colors duration-300 ${
                              isActive
                                ? "text-forest"
                                : "text-grey-600/70 group-hover:text-forest"
                            }`}
                          >
                            {c.title}
                          </motion.span>
                          <span className="flex items-center gap-2">
                            <span
                              className={`text-[0.72rem] tabular-nums transition-colors duration-300 ${
                                isActive ? "text-bronze" : "text-grey-600/40"
                              }`}
                            >
                              {c.items.length}
                            </span>
                            <motion.span
                              aria-hidden
                              animate={{
                                opacity: isActive ? 1 : 0,
                                x: isActive ? 0 : -6,
                              }}
                              transition={{ duration: 0.3, ease: ease.out }}
                              className="text-bronze"
                            >
                              →
                            </motion.span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                  <li className="relative border-b border-forest/10 py-5 pl-5">
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-9 w-[3px] -translate-y-1/2 rounded-full bg-bronze"
                    />
                    <span className="text-[clamp(1.05rem,1.4vw,1.35rem)] font-medium italic leading-tight tracking-[-0.01em] text-bronze">
                      and many more
                    </span>
                  </li>
                </ul>
              </div>

              {/* 02 — Cinematic stage with masked reveal + cursor tilt */}
              <div className="lg:col-span-5" style={{ perspective: 1200 }}>
                <motion.div
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card-lg)] shadow-[var(--shadow-float)]"
                >
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={current.id}
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      animate={{ clipPath: "inset(0 0 0% 0)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: ease.cinematic }}
                      className="absolute inset-0"
                    >
                      <motion.div className="absolute inset-[-8%]" style={{ x: imgX, y: imgY }}>
                        <HighQualityImage
                          src={current.image}
                          alt={current.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="!object-cover !object-center"
                        />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,26,20,0.05)_0%,transparent_35%,rgba(18,26,20,0.72)_100%)]" />

                  {/* Caption locked to the stage */}
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: duration.normal, ease: ease.out }}
                      >
                        <span className="text-caption tracking-[0.16em] text-ivory/60">
                          {`0${active + 1} / 0${COLLECTIONS.length}`}
                        </span>
                        <p className="mt-2 text-[clamp(1.5rem,2.4vw,2.1rem)] font-light leading-[1.1] tracking-[-0.01em] text-ivory">
                          {current.title}
                        </p>
                        <p className="mt-1 text-[0.92rem] italic text-ivory/70">
                          {current.tagline}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* 03 — Living list of the active collection */}
              <div className="lg:col-span-4">
                <div className="flex h-full flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={current.id}
                      variants={listContainer}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                      {current.items.map((item) => (
                        <motion.li
                          key={item}
                          variants={listItem}
                          className="group flex items-center gap-4 border-b border-forest/10 py-3.5"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bronze/25 bg-white text-forest transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-bronze/70 group-hover:text-bronze group-hover:shadow-[0_10px_24px_rgba(122,92,50,0.16)]">
                            <AmenityIcon name={item} />
                          </span>
                          <span className="text-[0.95rem] leading-snug text-grey-600 transition-colors duration-300 group-hover:text-forest">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SceneDirector>
    </section>
  );
}
