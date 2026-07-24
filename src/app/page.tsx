import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navigation } from "@/components/layout/Navigation";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Arrival } from "@/components/sections/Arrival";
import { Philosophy } from "@/components/sections/Philosophy";
import { PlayManifesto } from "@/components/sections/PlayManifesto";
import { Vision } from "@/components/sections/Vision";
import { LifeInside } from "@/components/sections/LifeInside";
import { Experiences } from "@/components/sections/Experiences";
import { MasterPlan } from "@/components/sections/MasterPlan";
import { Residences } from "@/components/sections/Residences";
import { ModelHomes } from "@/components/sections/ModelHomes";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Location } from "@/components/sections/Location";
import { Finale } from "@/components/sections/Finale";

/**
 * Hero → Overview → Configuration → Modern Life Needs Play → Phase 3 →
 * Model Homes → Amenities → Master Plan → Gallery → Testimonials → Location → Finale.
 */
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main className="documentary pb-[calc(4rem+env(safe-area-inset-bottom,0px))] md:pb-24">
        <Arrival />
        <Philosophy />
        <Residences />
        <PlayManifesto />
        <Vision />
        <LifeInside />
        <ModelHomes />
        <Experiences />
        <MasterPlan />
        <Gallery />
        <Testimonials />
        <Location />
        <Finale />
      </main>
      <FloatingCTA />
    </>
  );
}
