"use client";
import { useScroll, useTransform } from "motion/react";
import React from "react";
import { HeroParallax } from "./ui/HeroParallax"

export function Hero() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] dark:border dark:border-white/[0.1] relative pt-40 overflow-clip bg-black"
      ref={ref}
    >
      <HeroParallax
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-400 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-700 rounded-full opacity-20 blur-3xl"></div>
    </div>
  );
}
