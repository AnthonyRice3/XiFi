'use client';

import { useState } from 'react';
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram, FaReddit, FaXTwitter, FaDiscord } from 'react-icons/fa6';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-gradient-to-br from-black via-stone-950 to-black text-white px-6 lg:px-20 py-12 border-t border-white/10 text-sm">
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Column 1: Logo + CTA */}
        <div className="space-y-4">
          <div className="text-3xl font-bold text-white">
            <span className="text-white">ProXIFI</span>
          </div>
          <button className="block w-fit px-6 py-2 border border-purple-500 rounded-lg hover:bg-purple-600">
            Start for Free
          </button>
          <button className="block w-fit px-6 py-2 bg-amber-500 rounded-lg hover:bg-amber-600 text-black">
            Book a Demo
          </button>
          <div className="pt-4">
            <p className="text-sm text-white">Contact Sales</p>
            <p className="text-sm text-white">sales@proXIFI.com</p>
          </div>
        </div>

        {/* Column 2: Social + Newsletter */}
        <div className="space-y-6 col-span-2">
          <p className="text-sm text-gray-400">
            All ProXIFI hardware is assembled and shipped from the United States and the Netherlands.
          </p>
          <div className="flex space-x-4 text-lg p-2">
            <FaXTwitter className='hover:text-xl cursor-pointer' />
            <FaLinkedin className='hover:text-xl cursor-pointer'/>
            <FaYoutube className='hover:text-xl cursor-pointer'/>
            <FaFacebook className='hover:text-xl cursor-pointer'/>
            <FaInstagram className='hover:text-xl cursor-pointer'/>
            <FaReddit className='hover:text-xl cursor-pointer'/>
            <FaDiscord className='hover:text-xl cursor-pointer'/>
          </div>

          <div className="pt-6">
            <p className="text-white font-medium">Stay in the Loop</p>
            <p className="text-sm text-gray-400">
              Receive quarterly updates about important new features, events, and releases.
            </p>
            <div className="flex mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="px-4 py-2 w-full rounded-l-md bg-transparent border border-white/20 text-white placeholder-white/50"
              />
              <button className="bg-amber-500 text-black px-4 py-2 rounded-r-md hover:bg-amber-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Column 3–5: Navigation */}
        <div className="col-span-2 grid grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-white mb-2">Pricing</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Software</li>
              <li>Hardware</li>
              <li>Mobile Proxies</li>
              <li>Residential Proxies</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Company</h3>
            <ul className="space-y-1 text-gray-300">
              <li>About Us</li>
              <li>Manifesto</li>
              <li>Careers</li>
              <li>Referral Program</li>
              <li>Contact Us</li>
              <li>Brand Guidelines</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Resources</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Proxy Server</li>
              <li>Use Cases</li>
              <li>Antidetect Browser</li>
              <li>Blog</li>
              <li>Whitepapers</li>
              <li>Case Studies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
        <div>
          <h4 className="font-semibold">United States</h4>
          <p>1515 Market Street, Suite 1200 – #822, Philadelphia PA 19102</p>
        </div>
        <div>
          <h4 className="font-semibold">United Kingdom</h4>
          <p>85 Great Portland St, London W1W 7LT</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-12 pt-6 text-gray-500 text-xs flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 ProXIFI | All Rights Reserved</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Accessibility Statement</a>
          <a href="#">EULA</a>
        </div>
        <div className="mt-2 md:mt-0 flex items-center gap-2 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>All services are online</span>
        </div>
      </div>
    </footer>
  );
}
