"use client"


import { cn } from "@/lib/utils";
import { IconAdjustmentsBolt, IconCloud, IconCurrencyDollar, IconEaseInOut, IconHeart, IconHelp, IconRouteAltLeft, IconTerminal2 } from "@tabler/icons-react";

const FeatureSection = () => {

   const features = [
    {
      title: "Developer Ready",
      description:
        "Built for coders, scrapers, and automation engineers. Seamless integration with your stack.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Simple Setup",
      description:
        "Get started in minutes. No complex configs—just plug, proxy, and go.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Transparent Pricing",
      description:
        "No hidden fees, throttling, or overage traps. Just clean, predictable pricing.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Reliable Uptime",
      description:
        "Stay connected around the clock. We optimize for 99.99% uptime and consistent performance.",
      icon: <IconCloud />,
    },
    {
      title: "Secure by Design",
      description:
        "Device fingerprint masking, IP rotation, and traffic obfuscation come standard.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Expert Support",
      description:
        "Real help when you need it. Live chat and AI support agents always on standby.",
      icon: <IconHelp />,
    },
    {
      title: "Risk-Free Trial",
      description:
        "Try any plan with peace of mind. Full refunds available within the first 7 days.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Scalable Plans",
      description:
        "Start small or go enterprise. Plans grow with your needs—no switching headaches.",
      icon: <IconHeart />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-20 mx-auto bg-zinc-300 px-24">
      
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
};

export default FeatureSection

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-20 relative group/feature dark:border-neutral-800 bg-gradient-to-br from-black via-stone-950 to-black",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-amber-400 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-amber-400 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-black transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-amber-500 dark:text-amber-500">
          {title}
        </span>
      </div>
      <p className="text-sm text-white dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

