import AboutUsSection from "@/components/About";
import { AboutHero } from "@/components/AboutHero";
import GetStartedHero from "@/components/GetStartedHero";
import WhyProxy from "@/components/WhyProxy";
import { HomePriceCard } from "@/components/Works";



export default function Home() {
  return (
      <main className="bg-black">
        <GetStartedHero />
        
        <AboutUsSection />
        <HomePriceCard />
        
        <AboutHero />
        <WhyProxy />
        {/* <UseCases /> */}
      </main>
  );
}
