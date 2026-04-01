import type { Metadata } from "next";
import React from 'react'

// import Manifesto from '@/components/Manifesto'

import { Hero } from '@/components/Hero'
import MissionVision from '@/components/MissionVision'
import AboutSectionWrapper from '@/components/AboutSection'

import { GlowGrid } from '@/components/GlowGrid'
import Cta from '@/components/Cta'

export const metadata: Metadata = {
  alternates: { canonical: "/AboutUs" },
  title: "About Us",
  description:
    "Learn about ProXiFi — the team and mission behind the most advanced mobile proxy platform. Real 4G/5G cellular infrastructure for automation, scraping & marketing.",
  openGraph: {
    title: "About ProXiFi",
    description:
      "Meet the team building the future of mobile proxies. Enterprise-grade 4G/5G proxy infrastructure.",
  },
};

const page = () => {
  return (
    <main className="relative w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-8">
      <Hero />
      <MissionVision />
      <GlowGrid />
      <AboutSectionWrapper />
      <Cta />
    </main>
  );
};

export default page