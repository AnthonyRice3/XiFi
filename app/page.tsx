import type { Metadata } from "next";
import AboutUsSection from "@/components/About";
import { AboutHero } from "@/components/AboutHero";
import GetStartedHero from "@/components/GetStartedHero";
import WhyProxy from "@/components/WhyProxy";
import { HomePriceCard } from "@/components/Works";

export const metadata: Metadata = {
  title: "ProXiFi — Enterprise Mobile Proxy Platform",
  description:
    "Real 4G/5G mobile proxies on genuine SIM cards. Auto IP rotation, anti-detection, and blazing-fast speeds for scraping, automation & marketing at scale.",
  openGraph: {
    title: "ProXiFi — Enterprise Mobile Proxy Platform",
    description:
      "Real 4G/5G mobile proxies. Auto rotation, anti-detection & SOCKS5/HTTP. Built for serious automation.",
  },
};



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
