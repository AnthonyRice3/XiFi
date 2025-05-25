"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/NavbarMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <div className="relative w-full flex items-center justify-center bg-black">
      <NavbarSelect className="top-10 " />
      <p className="text-amber-500 dark:text-black ">
        Welcome to XiFi, Token Address Coming Soon....
      </p>
    </div>
  );
}

function NavbarSelect({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem  setActive={setActive} active={active} item="Home">
            <HoveredLink href="/">Home</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Support">
          <div className="flex flex-col space-y-4 text-sm ">
            
            <HoveredLink href="/GetStarted">Getting Started</HoveredLink>
            <HoveredLink href="/ProXiFi">ProxiFi</HoveredLink>
            <HoveredLink href="/About">About</HoveredLink>
            <HoveredLink href="/Contact">Contact</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Mobile Proxies"
              href="/Proxies"
              src="/3g.png"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Hardware"
              href="https://tailwindmasterkit.com"
              src="/4g.png"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Software"
              href="https://gomoonbeam.com"
              src="/4g.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Custom Solutions"
              href="https://userogue.com"
              src="/5g.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="WhitePaper">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/Services">Hobby</HoveredLink>
            <HoveredLink href="/Projects">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
