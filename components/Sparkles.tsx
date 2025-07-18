"use client";
import React from "react";
import { SparklesCore } from "../components/ui/SparklesCore";

export function Sparkles() {
  return (
    <div className="h-[40rem] py-12 w-ful flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-400 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-700 rounded-full opacity-20 blur-3xl"></div>
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-zinc-200 relative z-20 pt-60">
        Let&apos;s ProXiFi
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-amber-100 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-amber-100 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,yellow)]"></div>
      </div>
    </div>
  );
}
