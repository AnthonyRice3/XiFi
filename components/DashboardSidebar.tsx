"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/SidebarItems";
import {
  IconBrandTabler,
  IconCreditCard,
  IconFileDescription,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Dashboard",
      href: "/Dashboard",
      icon: <IconBrandTabler className="..." />,
    },
    {
      label: "ProXiFi",
      href: "/Dashboard/ProXiFi",
      icon: <IconUserBolt className="..." />,
    },
    {
      label: "Plans",
      href: "/Dashboard/Plans",
      icon: <IconCreditCard className="..." />,
    },
    {
      label: "Docs",
      href: "",
      icon: <IconFileDescription className="..." />,
    },
  ];
 
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full h-screen flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <UserButton 
                  appearance={{
                    elements: {
                      formButtonPrimary: {
                        fontSize: 14,
                        textTransform: 'none',
                        backgroundColor: '#FFFFFF',
                        '&:hover, &:focus, &:active': {
                          backgroundColor: '#49247A',
                        },
                      },
                    },
                  }}
                />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 overflow-auto">{children}</div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image alt="logo" src="/ProxifiLogo.jpg" width={25} height={25}  className="rounded-full"/>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        ProXiFi
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image alt="logo" src="/ProxifiLogo.jpg" width={25} height={25}  className="rounded-full"/>
    </Link>
  );
};


