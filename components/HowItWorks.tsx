'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';



export default function HIWSection() {
  return (
    <section className="relative py-20  text-white bg-white">
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
          <h2 className="text-4xl font-bold leading-tight mb-4 text-zinc-900">
            Empowering the Future of Proxies
          </h2>
          <p className="text-lg text-zinc-900 mb-6">
            At Proxidize, we are committed to building the most secure, flexible, and user-friendly proxy infrastructure in the world. Whether youre managing enterprise-scale operations or just getting started, our tools help you deploy with confidence.
          </p>
          <p className="text-lg text-zinc-900 mb-6">
            At Proxidize, we are committed to building the most secure, flexible, and user-friendly proxy infrastructure in the world. Whether youre managing enterprise-scale operations or just getting started, our tools help you deploy with confidence.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 text-sm font-semibold bg-amber-600 hover:bg-amber-500 rounded-lg shadow-md transition"
          >
            Learn More
          </Link>
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
            src="/5gcity.png"
            alt="About us illustration"
            className="w-full max-w-md mx-auto rounded-lg"
            width={150}
            height={150}
          />
        </motion.div>
      </div>

      

      {/* Glowing Background Effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-700 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-400 rounded-full opacity-20 blur-3xl"></div>
    </section>
  );
}
