"use client";

// import { motion } from "framer-motion";
// import { Users, Target } from "lucide-react";
import MagicButton from "./MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from '@/data';
import Image from "next/image";
import Link from "next/link";

export default function Cta() {
  return (
    <section className=" py-16 px-4 sm:px-8 lg:px-24 bg-black">
      {/* background grid */}
      

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw] text-amber-200">
          Ready to take <span className="text-amber-500">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <Link href="/Proxies">
          <MagicButton
            title="Join Community"
            icon={<FaLocationArrow />}
            position="right"
          />
        </Link>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          All Rights Reserved Proxify
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <a href={info.link} title="info" >
              <Image 
              src={info.img} 
              alt="icons" 
              width={20} 
              height={20} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
