import React from 'react'
import AboutSectionWrapper from '@/components/AboutSection'
import { AboutHero } from '@/components/AboutHero'
import Experience from '@/components/Experience'
import Manifesto from '@/components/Manifesto'
import { TimelineSection } from '@/components/Timeline'
import TeamSection from '@/components/TeamSection'

const page = () => {
  return (
    <main className="relative bg-gradient-to-br from-black via-stone-950 to-black flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <AboutHero />
        <Manifesto />
        <AboutSectionWrapper />
        <TimelineSection />
        <TeamSection />
        <Experience />
    </main>
  )
}

export default page