"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    quarter: "Q2 2025",
    title: "Platform Launch",
    description: "Official launch with core features and early adopters onboard.",
  },
  {
    quarter: "Q3 2025",
    title: "User Growth & Integrations",
    description: "Expand user base and integrate with third-party tools.",
  },
  {
    quarter: "Q4 2025",
    title: "Performance Optimizations",
    description: "Enhance speed, stability, and backend infrastructure.",
  },
  {
    quarter: "Q1 2026",
    title: "Global Expansion",
    description: "Roll out globally and scale customer success operations.",
  },
  {
    quarter: "Q2 2025",
    title: "Platform Launch",
    description: "Official launch with core features and early adopters onboard.",
  },
  {
    quarter: "Q3 2025",
    title: "User Growth & Integrations",
    description: "Expand user base and integrate with third-party tools.",
  },
  {
    quarter: "Q4 2025",
    title: "Performance Optimizations",
    description: "Enhance speed, stability, and backend infrastructure.",
  },
  
];

export default function UseCases() {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });

  const x = useTransform(scrollXProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section className="relative overflow-x-auto py-20  dark:bg-gray-950 bg-black">
      {/* <h2 className="text-3xl font-bold text-center mb-16 text-amber-400 dark:text-white">
        Who Are Mobile Proxies For?
      </h2> */}
      <div ref={ref} className="">
        <motion.div
          style={{ x }}
          className="flex space-x-10 min-w-[200%] px-10"
        >
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              className=" w-[300px] bg-amber-100 dark:bg-amber-900 rounded-xl shadow-lg p-6"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="text-sm font-bold text-amber-600">{item.quarter}</p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
