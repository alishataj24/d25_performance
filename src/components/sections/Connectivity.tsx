"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { PublicationImage } from "@/components/ui/PublicationImage";
import { SectionShell } from "@/components/ui/SectionShell";
import { LOCATION_HIGHLIGHTS, COPY, getChapter } from "@/lib/constants";

export function Connectivity() {
  const { connectivity } = COPY;
  const chapter = getChapter("connectivity")!;

  return (
    <SectionShell id="connectivity" chapter={chapter} tone="forest" className="!overflow-visible">
      <div className="max-w-3xl mb-14 md:mb-20">
        <TextReveal as="h2" className="h-section text-ivory mb-8">
          {connectivity.headline}
        </TextReveal>
        <p className="text-title text-ivory/50 font-light">{connectivity.subheadline}</p>
      </div>

      <div className="space-y-20 md:space-y-28">
        {LOCATION_HIGHLIGHTS.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end"
          >
            {i % 2 === 0 ? (
              <>
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="p-card p-card-interactive overflow-hidden">
                    <PublicationImage
                      src={item.image}
                      alt={item.title}
                      aspect={i === 0 ? "full" : "cinematic"}
                      sizes="60vw"
                      className="p-card-media"
                    />
                  </div>
                </div>
                <div className="lg:col-span-5 order-1 lg:order-2 pb-4 lg:pb-12">
                  <span className="text-[0.8rem] font-medium tracking-[0.2em] text-champagne block mb-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="h-card text-ivory mb-6">{item.title}</h3>
                  <p className="text-body text-ivory/55 !max-w-none leading-[1.85]">{item.description}</p>
                </div>
              </>
            ) : (
              <>
                <div className="lg:col-span-5 pb-4 lg:pb-12">
                  <span className="text-[0.8rem] font-medium tracking-[0.2em] text-champagne block mb-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="h-card text-ivory mb-6">{item.title}</h3>
                  <p className="text-body text-ivory/55 !max-w-none leading-[1.85]">{item.description}</p>
                </div>
                <div className="lg:col-span-7">
                  <div className="p-card p-card-interactive overflow-hidden">
                    <PublicationImage src={item.image} alt={item.title} aspect="tall" sizes="55vw" className="p-card-media" />
                  </div>
                </div>
              </>
            )}
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
