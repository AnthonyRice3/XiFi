import React from "react";
// import { Marquee } from "./Marquee";

import { Magnifier } from "./Magnifier";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

interface AboutSectionProps {
  videoId: string;
  description: string;
  description2: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({  description, description2 }) => {
  return (
    <section className="relative w-full max-w-4xl mx-auto flex pt-12 px-2 sm:px-4 md:px-8 flex-col h-full md:flex-row items-center justify-center gap-6 p-4 bg-black rounded-t-3xl shadow-md ">
      {/* Left Side: YouTube Video */}
      <div className="w-full md:w-1/2 md:h-full text-center px-2 sm:px-4 md:px-8">
        <TextGenerateEffect words="Privacy. Performance. ProXiFi!"
            className="text-center text-[32px] md:text-5xl lg:text-6xl " />
        <p className="text-zinc-500 text-base leading-8 font-semibold">{description}</p>
        <br />
        <p className="text-zinc-500 text-base leading-8 font-semibold">{description2}</p>
      </div>

      {/* Right Side: Info */}
      <div className="w-full h-full md:w-1/2 space-y-4 ">
        <div className="w-full h-1/3">
          <Magnifier />
        </div>
      </div>
    </section>
  );
};

export default function AboutSectionWrapper() {
  return (
    <AboutSection
      videoId="KiBLMK7_ObE"
      description="ProXiFi is built by a passionate team of engineers, network specialists, and privacy advocates. We believe in empowering businesses and individuals with real, reliable, and ethical mobile proxies. Our backgrounds span telecom, cybersecurity, and large-scale automation—giving us the expertise to deliver a platform that's both robust and user-friendly."
      description2="We're committed to transparency, innovation, and customer success. Every feature is designed in-house, and we pride ourselves on responsive support and continuous improvement. Whether you're a solo developer or a global enterprise, our team is here to help you unlock the full potential of mobile proxy technology."
    />
  );
}
