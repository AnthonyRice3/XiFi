'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram, FaReddit, FaXTwitter, FaDiscord } from 'react-icons/fa6';
import { BookDemoModal } from '@/components/BookDemoModal';

const NAV = {
  Products: [
    { label: 'Hosted Proxies',  href: '/Proxies' },
    { label: 'Software',        href: '/Software' },
    { label: 'Proxy Manager',   href: '/proxy-manager' },
    { label: 'Plans & Pricing', href: '/Proxies#pricing' },
  ],
  Company: [
    { label: 'About Us',    href: '/AboutUs' },
    { label: 'Docs',        href: '/Docs' },
    { label: 'Contact Us',  href: '/Contact' },
    { label: 'Get Started', href: '/GetStarted' },
  ],
  Resources: [
    { label: 'Documentation',    href: '/Docs' },
    { label: 'Use Cases',        href: '/Docs#use-cases' },
    { label: 'Getting Started',  href: '/Docs#getting-started' },
    { label: 'Terms of Service', href: '/Docs#terms-of-service' },
  ],
};

const SOCIALS = [
  { icon: FaXTwitter,  href: 'https://x.com/proxifi',               label: 'X / Twitter' },
  { icon: FaLinkedin,  href: 'https://linkedin.com/company/proxifi', label: 'LinkedIn' },
  { icon: FaYoutube,   href: 'https://youtube.com/@proxifi',         label: 'YouTube' },
  { icon: FaFacebook,  href: 'https://facebook.com/proxifi',         label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com/proxifi',        label: 'Instagram' },
  { icon: FaReddit,    href: 'https://reddit.com/r/proxifi',         label: 'Reddit' },
  { icon: FaDiscord,   href: 'https://discord.gg/proxifi',           label: 'Discord' },
];

export default function Footer() {
  const [email,    setEmail]    = useState('');
  const [subDone,  setSubDone]  = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interest: 'general', source: '/footer' }),
      });
      setSubDone(true);
    } catch {
      // fail silently
    }
  }

  return (
    <>
      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}

      <footer className="bg-gradient-to-br from-black via-stone-950 to-black text-white px-6 lg:px-20 py-12 border-t border-white/10 text-sm">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Column 1: Logo + CTAs */}
          <div className="space-y-4">
            <div className="text-3xl font-bold text-white">ProXiFi</div>
            <Link
              href="/sign-up"
              className="block w-fit px-6 py-2 border border-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Sign Up
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="block w-fit px-6 py-2 bg-amber-500 rounded-lg hover:bg-amber-600 text-black font-semibold transition-colors"
            >
              Book a Demo
            </button>
            <div className="pt-4 space-y-1">
              <p className="text-sm text-white font-medium">Contact Sales</p>
              <a href="mailto:sales@proxifi.net" className="text-sm text-zinc-400 hover:text-amber-400 transition-colors">
                sales@proxifi.net
              </a>
            </div>
          </div>

          {/* Column 2: Social + Newsletter */}
          <div className="space-y-6 col-span-2">
            <p className="text-sm text-gray-400">
              ProXiFi delivers enterprise-grade mobile proxy infrastructure and management software, operated from the United States.
            </p>
            <div className="flex space-x-4 text-lg">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-amber-400 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <div className="pt-2">
              <p className="text-white font-medium mb-1">Stay in the Loop</p>
              <p className="text-sm text-gray-400 mb-3">
                Get early access, product updates, and release notes â€” no spam.
              </p>
              {subDone ? (
                <p className="text-amber-400 text-sm font-medium">You&apos;re subscribed â€” we&apos;ll be in touch!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="px-4 py-2 w-full rounded-l-md bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 text-black px-4 py-2 rounded-r-md hover:bg-amber-600 font-semibold transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Columns 3â€“5: Navigation */}
          <div className="col-span-2 grid grid-cols-3 gap-6">
            {Object.entries(NAV).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="font-semibold text-white mb-3">{heading}</h3>
                <ul className="space-y-2">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="text-gray-400 hover:text-amber-400 transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          <div>
            <h4 className="font-semibold">United States</h4>
            <p className="text-zinc-400 text-sm mt-1">1515 Market Street, Suite 1200 â€“ #822, Philadelphia PA 19102</p>
          </div>
          <div>
            <h4 className="font-semibold">United Kingdom</h4>
            <p className="text-zinc-400 text-sm mt-1">85 Great Portland St, London W1W 7LT</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 text-gray-500 text-xs flex flex-col md:flex-row justify-between items-center gap-3">
          <p>Â© 2026 ProXiFi | All Rights Reserved</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/Docs#terms-of-service" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            <Link href="/Docs#security"          className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <a href="mailto:support@proxifi.net"  className="hover:text-amber-400 transition-colors">Support</a>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span>All services online</span>
          </div>
        </div>
      </footer>
    </>
  );
}
