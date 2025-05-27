'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Experience from './Experience';



export default function WhyProxy() {
  return (
    <section className="relative pb-2  text-white bg-black">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
            <Image
              src="/footer-grid.svg"
              alt="grid"
              width={1000} // Adjust this width to your actual layout needs
              height={1000} // Adjust this height as well
              className="w-full h-full opacity-50 object-cover"
            />
            </div>
      <div className="w-full absolute left-0 -bottom-72 min-h-96 z-[-10]">
      <Image
        src="/footer-grid.svg"
        alt="grid"
        width={100} // Adjust this width to your actual layout needs
        height={500} // Adjust this height as well
        className="w-full h-full opacity-50 object-cover "
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
          <h2 className="text-4xl font-bold leading-tight mb-4 text-white">
            Empowering the <span className='text-amber-500'>Future</span>  of Proxies
          </h2>
          <p className="text-lg text-zinc-100 mb-6">
            At Proxidize, we are committed to building the most secure, flexible, and user-friendly proxy infrastructure in the world. Whether youre managing enterprise-scale operations or just getting started, our tools help you deploy with confidence.
          </p>
          <p className="text-lg text-zinc-100 mb-6 pb-4">
            At Proxidize, we are committed to building the most secure, flexible, and user-friendly proxy infrastructure in the world. Whether youre managing enterprise-scale operations or just getting started, our tools help you deploy with confidence.
          </p>
          <p className="text-lg text-zinc-100 mb-6 pb-4">
            At Proxidize, we are committed to building the most secure, flexible, and user-friendly proxy infrastructure in the world. Whether youre managing enterprise-scale operations or just getting started, our tools help you deploy with confidence.
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
          <Experience />
          
        </motion.div>
      </div>
    </section>
  );
}
