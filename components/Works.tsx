"use client";

import { Carousel } from "./ui/Carousel";



export function HomePriceCard() {
  const slideData = [
    {
      title: "Mobile Proxies",
      button: "Buy Now",
      src: "/images/mystic-mountains.jpg",
    },
    {
      title: "5G Proxies",
      button: "Buy Now",
      src: "/images/neon-nights.jpg",
    },
    {
      title: "Proxy Management Software",
      button: "Buy Now",
      src: "/images/urban-dreams.jpg",
    },
    {
      title: "Custom Plans",
      button: "Buy Now",
      src: "/images/desert-whispers.jpg",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
