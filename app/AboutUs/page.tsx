import React from 'react'

// import Manifesto from '@/components/Manifesto'

import { Hero } from '@/components/Hero'
import MissionVision from '@/components/MissionVision'
import AboutSectionWrapper from '@/components/AboutSection'

import { GlowGrid } from '@/components/GlowGrid'
import Cta from '@/components/Cta'

const page = () => {
  return (
    <main className="relative ">
        <Hero />
        <MissionVision />
        <GlowGrid />
        <AboutSectionWrapper />
        
        <Cta />
    </main>
  )
}

export default page