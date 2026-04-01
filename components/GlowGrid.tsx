"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/GlowEffect";

export function GlowGrid() {
  return (
    <ul className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-8 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 py-12">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 bg text-amber-400 dark:text-neutral-400" />}
        title="Real Mobile IPs"
        description="All proxies are powered by genuine SIM cards on real carrier networks—no datacenter or recycled IPs."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-amber-400 dark:text-neutral-400" />}
        title="Full API & Automation"
        description="Control sessions, rotate IPs, and manage proxies programmatically with our robust REST API."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-amber-400 dark:text-neutral-400" />}
        title="Privacy & Security"
        description="No logs, no leaks. All traffic is encrypted and isolated for your peace of mind."
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-amber-400 dark:text-neutral-400" />}
        title="Proxy Manager Software"
        description="Run your own proxy farm with our self-hosted manager—perfect for scaling and custom setups."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-amber-400 dark:text-neutral-400" />}
        title="Anti-Detection"
        description="Bypass blocks and avoid bans with true mobile fingerprints and automatic IP rotation."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-4 md:rounded-3xl md:p-6 bg-gradient-to-br from-black via-stone-950 to-black">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-4 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-zinc-200 md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-amber-400 md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
