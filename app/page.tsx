import AboutUsSection from "@/components/About";

import { Features } from "@/components/Features";
import { GetStarted } from "@/components/GetStarted";
import { GlowGrid } from "@/components/GlowGrid";
import { Hero } from "@/components/Hero";
import HIWSection from "@/components/HowItWorks";
import { MaskText } from "@/components/MaskText";
import UseCases from "@/components/UseCases";
import WhyProxy from "@/components/WhyProxy";
import Works from "@/components/Works";



export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="relative bg-gradient-to-br from-black via-stone-950 to-black ">
        <Hero />
        <GetStarted />
        <AboutUsSection />
        
        <Works />
        <Features />
        <HIWSection />
        
        <MaskText />
        <GlowGrid />
        <WhyProxy />
        <UseCases />
        {/* <Cta /> */}
      </main>
      
    // </div>
  );
}
