"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/Lamp";
 
export function PriceHero() {
  return (
    <LampContainer>
        <div className="h-full w-full dark:bg-black   dark:bg-grid-white/[0.3] bg-grid-green-200/5 absolute top-0 left-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-b from-amber-200 to-amber-900 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Need a Custom Solution?  
          </motion.h1>
      </div>
    </LampContainer>
  );
}