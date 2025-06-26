'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { label: 'Gigabits Used', value: '10,000+' },
  { label: 'Uptime Guarantee', value: '99.99%' },
  { label: 'Sq Miles Covered', value: '250k+' },
];

export default function AboutUsSection() {
  return (
    <section className="relative py-20  text-white bg-black">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
      <Image
        src="/footer-grid.svg"
        alt="grid"
        width={1000} // Adjust this width to your actual layout needs
        height={1000} // Adjust this height as well
        className="w-full h-full opacity-50 object-cover"
      />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold leading-tight mb-4 text-amber-700">
            What is ProXiFI?
          </h2>
          <p className="text-lg text-stone-300 mb-6">
            ProXiFi is a mobile IPaaS solution for high-performance automation, data scraping, and digital marketing workflows. By leveraging cellular network infrastructure and delivering decentralized mobile access, ProXiFi delivers accurate fingerprint-friendly IP addresses that are highly effective at bypassing detection systems, CAPTCHAs, and TCP OS fingerprinting
          </p>
          <p className="text-lg text-stone-300 mb-6">
            Our platform is tailored for developers, marketers, and businesses needing reliable, scalable access to mobile IPs—without traditional proxy services&apos; noise, complexity, or limitations.
          </p>
          
        </motion.div>

        {/* Image / Illustration */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image
            src="/svgs/11.svg"
            alt="About us illustration"
            className="w-full max-w-md mx-auto"
            width={150}
            height={150}
          />
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        className="mt-16 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-stone-800 rounded-xl py-6 px-4 shadow-inner border border-stone-700">
            <h3 className="text-3xl font-bold text-amber-400">{stat.value}</h3>
            <p className="mt-2 text-sm text-stone-400">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Glowing Background Effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-400 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-700 rounded-full opacity-20 blur-3xl"></div>
    </section>
  );
}
