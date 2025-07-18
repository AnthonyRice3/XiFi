import React from 'react'
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";

import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { WavyBackground } from "./ui/WavyBackground";


const GetStartedHero = () => {
  return (
    <div className=''>
       <WavyBackground >
      

      <div className="flex justify-center relative z-10">
        <div className=" flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-2xl text-center text-zinc-400 max-w-150 pt-12 md:text-xl">
            Instantly scale your scraping, marketing, and development workflows with real mobile IPs. It&apos;s not a noun it&apos;s a Verb. 
          </p>
          
          
          <div className="pb-48 md:hidden">
          <TextGenerateEffect
            words="Privacy. Performance. Proxify!"
            className="text-center text-[40px] md:text-5xl lg:text-6xl "
          />
          </div>
          {/* <p className="py-4 pt-44 mt-4 text-2xl text-zinc-400 md:text-lg">
          <ColourfulText text="ProxiFi! " /> 
           join Our Waitlist, Be The First To Get Our Fast & Secure Proxies. 
          </p>   */}
          {/* <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
                      {companies.map((company) => (
                        <React.Fragment key={company.id}>
                          <div className="flex md:max-w-60 max-w-32 gap-2">
                            <Image
                              src={company.img}
                              alt={company.name}
                              className="md:w-10 w-5"
                              width={150}
                              height={150}
                            />
                            <Image
                              src={company.nameImg}
                              alt={company.name}
                              width={company.id === 4 || company.id === 5 ? 100 : 150}
                              className="md:w-24 w-20"
                              
                              height={150}
                            />
                          </div>
                        </React.Fragment>
                      ))}
                    </div> */}
          <a href="/Contact" title='Get Started'>
            <MagicButton
              title="Join Waitlist"
              icon={<FaLocationArrow />}
              position="right"
            />
            
          </a>
          <div>
            
          </div>
        </div>
      </div>
      </WavyBackground>
    
    </div>
  );
};

export default GetStartedHero;