"use client";

import DynamicPricingEndpoints from "@/components/DynamicPricingEndpoints";
// import BigGrid from "@/components/BigGrid";
import DynamicPricingGBs from "@/components/DynamicPricingGBs";
import { Marquee } from "@/components/Marquee";
import PriceCard from "@/components/PriceCard";
import { Sparkles } from "@/components/Sparkles";
import Spreadsheet from "@/components/Spreadsheet";

export default function Proxies() {
  return (
    <main className="bg-black">
        
        <Sparkles />
        <DynamicPricingGBs />
        <DynamicPricingEndpoints />
        <PriceCard />
        <Spreadsheet /> 
        <Marquee />
    </main>
  );
}
