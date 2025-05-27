"use client";

import { motion } from "framer-motion";
import { Users, Target } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-stone-800"
        >
          Our Mission and Vision Statement
        </motion.h2>
        <p className="text-stone-500 mt-4 max-w-2xl mx-auto text-base">
          Discover our future goals and commitment to innovation, service, and excellence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-start space-x-4"
        >
          <div className="bg-gradient-to-br from-black via-stone-950 to-black text-white p-6 rounded-xl shadow-md flex flex-col items-center ml-44 min-h-20">
            <Target className="w-8 h-8 text-amber-400 mb-2 " />
            <h3 className="text-xl font-semibold mb-2">Vision</h3>
            <p className="text-sm text-center">
              To become the largest web solutions provider by offering globally recognized services through innovative design and high standards.
            </p>
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-start space-x-4"
        >
          <div className="bg-gradient-to-bl from-amber-500 to-amber-700 text-black p-6 rounded-xl shadow-md flex flex-col items-center mr-44 min-h-20">
            <Users className="w-8 h-8 text-stone-900 mb-2 " />
            <h3 className="text-xl font-semibold mb-2">Mission</h3>
            <p className="text-sm text-center">
              To deliver customer-centric, results-focused, and cost-effective solutions for clients worldwide through innovation and dedication.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        
      </motion.div>
    </section>
  );
}
