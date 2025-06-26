import FaqSection from '@/components/FaqSection'
import { Form } from '@/components/Form'
import { PriceHero } from '@/components/PriceHero'
import WaitlistSection from '@/components/Waitlist'
import React from 'react'

const page = () => {
  return (
    <main className="relative bg-black flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="  w-full ">
            <PriceHero />
            <WaitlistSection />
            <FaqSection />
            <Form />
            
            
        </div>
    </main>
  )
}

export default page