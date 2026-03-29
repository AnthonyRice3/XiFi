"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/NavMenu";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Nav() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Proxies",
      link: "/Proxies",
    },
    {
      name: "Software",
      link: "/Software",
    },
    {
      name: "Proxy Manager",
      link: "/proxy-manager",
    },
    {
      name: "Docs",
      link: "/Docs",
    },
    {
      name: "About",
      link: "/AboutUs",
    },
    {
      name: "Contact",
      link: "/Contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full bg-black py-12">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody className="bg-zinc-400">
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </NavbarButton>
            <SignedIn>
              <NavbarButton href="/Dashboard" variant="primary">Dashboard</NavbarButton>
            </SignedIn>
            <SignedOut>
              <NavbarButton href="/sign-up" variant="primary">Sign Up</NavbarButton>
            </SignedOut>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-black"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                <SignedIn>
                      <UserButton />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton forceRedirectUrl="/Dashboard" />
                    </SignedOut>
              </NavbarButton>
              <SignedIn>
                <NavbarButton
                  href="/Dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Dashboard
                </NavbarButton>
              </SignedIn>
              <SignedOut>
                <NavbarButton
                  href="/sign-up"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Sign Up
                </NavbarButton>
              </SignedOut>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      

      {/* Navbar */}
    </div>
  );
}


