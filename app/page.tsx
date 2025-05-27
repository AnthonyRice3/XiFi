import AboutUsSection from "@/components/About";
import { AboutHero } from "@/components/AboutHero";

import Cta from "@/components/Cta";
import FeatureSection from "@/components/Features";
import GetStarted from "@/components/GetStarted";
import GetStartedHero from "@/components/GetStartedHero";
import UseCases from "@/components/UseCases";
import WhyProxy from "@/components/WhyProxy";
import Works from "@/components/Works";



export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="relative bg-black">
        <GetStartedHero />
        <GetStarted />
        <AboutUsSection />
        
        <Works />
        <FeatureSection />
        <AboutHero />
        {/* <HIWSection /> */}
        
        {/* <MaskText /> */}
        {/* <GlowGrid /> */}
        <WhyProxy />
        <UseCases />
        <Cta />
      </main>
      
    // </div>
  );
}
