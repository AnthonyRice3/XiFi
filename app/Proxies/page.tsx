"use client";

import DynamicPricingEndpoints from "@/components/DynamicPricingEndpoints";
// import BigGrid from "@/components/BigGrid";
import DynamicPricingGBs from "@/components/DynamicPricingGBs";
import PriceCard from "@/components/PriceCard";
import { Sparkles } from "@/components/Sparkles";
import Spreadsheet from "@/components/Spreadsheet";

export default function Proxies() {
  return (
    <main className="relative bg-black">
        
        <Sparkles />
        <DynamicPricingGBs />
        <DynamicPricingEndpoints />
        <PriceCard />
        <Spreadsheet /> 
      
    </main>
  );
}
