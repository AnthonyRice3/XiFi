"use client";

import BigGrid from "@/components/BigGrid";
import DynamicPricing from "@/components/DynamicPrice";
import PriceCard from "@/components/PriceCard";
import { Sparkles } from "@/components/Sparkles";
import Spreadsheet from "@/components/Spreadsheet";
import WhyProxy from "@/components/WhyProxy";

export default function Proxies() {
  return (
    <main className="relative bg-gradient-to-br from-black via-stone-950 to-black ">
        
        <Sparkles />
        
        <BigGrid />
        <DynamicPricing />
        <PriceCard />
        <WhyProxy />
        <Spreadsheet /> 
      
    </main>
  );
}
