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
      name: "About",
      link: "/AboutUs",
    },
    {
      name: "Contact",
      link: "/Contact",
    },
    {
      name: "Dash",
      link: "/Dashboard",
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
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </NavbarButton>
            <NavbarButton href="" variant="primary">White Paper</NavbarButton>
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
                className="relative text-black dark:text-neutral-300"
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
                                    </SignedIn>
                                    <SignedOut>
                                      <SignInButton />
                                    </SignedOut>
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                White Paper
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      

      {/* Navbar */}
    </div>
  );
}


