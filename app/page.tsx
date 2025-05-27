import AboutUsSection from "@/components/About";
import { AboutHero } from "@/components/AboutHero";
import FeatureSection from "@/components/Features";
import GetStarted from "@/components/GetStarted";
import GetStartedHero from "@/components/GetStartedHero";

import UseCases from "@/components/UseCases";
import WhyProxy from "@/components/WhyProxy";
import Works from "@/components/Works";



export default function Home() {
  return (
      <main className="relative bg-black">
        <GetStartedHero />
        <GetStarted />
        <AboutUsSection />
        <Works />
        <FeatureSection />
        <AboutHero />
        <WhyProxy />
        <UseCases />
      </main>
  );
}
