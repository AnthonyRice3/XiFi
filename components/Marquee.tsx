"use client";
import { ThreeDMarquee } from "@/components/ui/Marquee";

export function Marquee() {
  const images = [
    "/svgs/15.svg",
    "/svgs/16.svg",
    "/svgs/17.svg",
    "/svgs/18.svg",
    "/svgs/15.svg",
    "/svgs/16.svg",
    "/svgs/17.svg",
    "/svgs/18.svg",
    "/svgs/15.svg",
    "/svgs/16.svg",
    "/svgs/17.svg",
    "/svgs/18.svg",
    "/svgs/15.svg",
    "/svgs/16.svg",
    "/svgs/17.svg",
    "/svgs/18.svg",
    "/svgs/15.svg",
    "/svgs/16.svg",
    "/svgs/17.svg",
    "/svgs/18.svg",
    "/svgs/15.svg",
    "/svgs/16.svg",
    "/svgs/17.svg",
    "/svgs/18.svg",
    "/svgs/15.svg",
    "/svgs/16.svg",
    "/svgs/17.svg",
    "/svgs/18.svg",
    "/svgs/15.svg",
    "/svgs/16.svg",
    "/svgs/17.svg",
    "/svgs/18.svg",
    "/svgs/15.svg",
    "/svgs/16.svg",
    "/svgs/17.svg",
    "/svgs/18.svg",
    "/svgs/15.svg",
    "/svgs/16.svg",
    "/svgs/17.svg",
    "/svgs/18.svg"
  ];
  return (
    <div className="mx-auto rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
