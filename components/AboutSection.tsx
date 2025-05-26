import React from "react";
import { Marquee } from "./Marquee";

interface AboutSectionProps {
  videoId: string;
  title: string;
  description: string;
  description2: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({  title, description, description2 }) => {
  return (
    <section className="relative mx-auto my-10 flex max-w-7xl flex-col h-full md:flex-row items-center justify-center gap-6 p-6 bg-gradient-to-bl from-amber-500 to-amber-700 rounded-2xl shadow-md">
      {/* Left Side: YouTube Video */}
      <div className="w-auto md:w-1/2 md:h-full text-center ">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-slate-800 text-base leading-7 font-semibold">{description}</p>
        <br />
        <p className="text-slate-800 text-base leading-7 font-semibold">{description2}</p>
      </div>

      {/* Right Side: Info */}
      <div className="w-full h-full md:w-1/2 space-y-4 ">
      <div className="w-full h-1/3">
      <Marquee />
        </div>
      </div>
    </section>
  );
};

export default function AboutSectionWrapper() {
  return (
    <AboutSection
      videoId="KiBLMK7_ObE"
      title="Proxify"
      description="hi welcome to proxifi hi welcome to proxifi hi welcome to proxifi hi welcome to proxifi Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.

Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.

Morbi in sem quis dui placerat ornare. Pellentesque odio nisi euismod in pharetra a ultricies in diam. Sed arcu. Cras consequat.

Praesent dapibus neque id cursus faucibus tortor neque egestas auguae eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi tincidunt quis accumsan porttitor facilisis luctus metus.

"

    description2="hi welcome to proxifi hi welcome to proxifi hi welcome to proxifi hi welcome to proxifi Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.

Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.

Morbi in sem quis dui placerat ornare.Phasellus Nam mmodo a sodales sit amet nisi. Praesent dapibus neque id cursus faucibus tortor neque egestas auguae eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi tincidunt quis accumsan porttitor facilisis luctus metus.

Phasellus Nam mmodo a sodales sit amet nisi."
    />
    
  );
}
