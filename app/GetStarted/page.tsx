"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconCheck,
  IconDeviceMobile,
  IconRefresh,
  IconShield,
  IconBolt,
  IconCode,
  IconCloud,
  IconWorld,
  IconLock,
  IconChevronRight,
  IconArrowRight,
  IconX,
  IconMail,
  IconUser,
  IconLoader2,
  IconCircleCheck,
} from "@tabler/icons-react";

// ─── Waitlist Modal ───────────────────────────────────────────────────────────

const INTERESTS = [
  { value: "proxy_service", label: "Hosted Proxy Service" },
  { value: "proxy_manager", label: "Proxy Manager Software" },
  { value: "both", label: "Both" },
  { value: "general", label: "Just keeping tabs" },
];

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("proxy_service");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      if (data.alreadyJoined) setAlreadyJoined(true);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10"
        >
          <IconX size={20} />
        </button>

        <div className="bg-gradient-to-r from-amber-950/60 to-zinc-900 px-6 py-5 border-b border-zinc-700">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
            Closed Beta
          </p>
          <h2 className="text-white text-xl font-extrabold">
            Join the ProXiFi Waitlist
          </h2>
        </div>

        <div className="px-6 py-6">
          {done ? (
            <div className="text-center py-4">
              <IconCircleCheck size={48} className="text-amber-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-bold mb-2">
                {alreadyJoined ? "Already on the list!" : "You're in!"}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {alreadyJoined
                  ? "This email is already on our waitlist. We'll be in touch soon."
                  : `We sent a confirmation to ${email}. We'll reach out when your early access spot opens.`}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Name
                </label>
                <div className="relative">
                  <IconUser size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Email <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <IconMail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  I&apos;m interested in
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INTERESTS.map((i) => (
                    <button
                      key={i.value}
                      type="button"
                      onClick={() => setInterest(i.value)}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium text-left transition-colors ${
                        interest === i.value
                          ? "border-amber-500 bg-amber-950/40 text-amber-300"
                          : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
                      }`}
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading && <IconLoader2 size={16} className="animate-spin" />}
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Features Data ────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <IconDeviceMobile className="w-6 h-6" />,
    title: "Real Mobile IPs",
    description:
      "Every proxy runs on a genuine cellular connection — 4G/5G SIM cards, not datacenter spoofs. You get IPs that look and behave exactly like a real phone.",
  },
  {
    icon: <IconRefresh className="w-6 h-6" />,
    title: "Automatic IP Rotation",
    description:
      "Rotate on a timer, per request, or on demand via API. Fresh residential-grade IPs with zero manual intervention.",
  },
  {
    icon: <IconShield className="w-6 h-6" />,
    title: "Anti-Detection Built In",
    description:
      "TCP fingerprint spoofing, DNS leak prevention, and OS-level masking defeat the most advanced bot detection systems.",
  },
  {
    icon: <IconBolt className="w-6 h-6" />,
    title: "Blazing Fast Speeds",
    description:
      "Low-latency 5G connections deliver sub-100ms response times. No throttling, no bandwidth caps on dedicated plans.",
  },
  {
    icon: <IconCode className="w-6 h-6" />,
    title: "Developer-First API",
    description:
      "Full REST API for rotation, monitoring, and user management. Compatible with Puppeteer, Playwright, AdsPower, and more.",
  },
  {
    icon: <IconCloud className="w-6 h-6" />,
    title: "Hosted & Self-Hosted",
    description:
      "Use our managed proxy service or deploy our Proxy Manager software on your own server. Full flexibility.",
  },
  {
    icon: <IconWorld className="w-6 h-6" />,
    title: "Global Coverage",
    description:
      "Mobile IPs across multiple US carriers and expanding internationally. Target specific regions for geo-sensitive tasks.",
  },
  {
    icon: <IconLock className="w-6 h-6" />,
    title: "Enterprise-Grade Security",
    description:
      "Encrypted tunnels, per-user access controls, and detailed traffic logs. Your data never passes through shared infrastructure.",
  },
];

// ─── Timeline Data ────────────────────────────────────────────────────────────

const BETA_PERKS = [
  "Priority access before public launch",
  "Locked-in early-bird pricing",
  "Direct line to the founding team",
  "Shape the product with your feedback",
  "Free onboarding session",
  "Extended trial period",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GetStarted() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="relative bg-black text-white overflow-hidden">
      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}

      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        {/* Background glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-800/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-amber-600/50 bg-amber-950/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Closed Beta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            The Future of{" "}
            <span className="text-amber-400">Mobile Proxies</span>{" "}
            Is Almost Here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            ProXiFi is currently in closed beta. We&apos;re onboarding users in waves — join the waitlist to reserve your spot and be first in line when we open the doors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
            >
              Join the Waitlist <IconChevronRight size={18} />
            </button>
            <Link
              href="/Docs"
              className="flex items-center gap-2 border border-zinc-700 hover:border-amber-500 text-zinc-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Read the Docs <IconArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 text-zinc-600 text-sm"
          >
            No credit card required. We&apos;ll notify you when your spot opens.
          </motion.p>
        </div>
      </section>

      {/* ── About Section ──────────────────────────────────────────── */}
      <section className="relative py-24 px-6 border-t border-zinc-800">
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3 block">
              About ProXiFi
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
              Real Mobile IPs.{" "}
              <span className="text-amber-400">Zero Compromises.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              ProXiFi is a mobile IP-as-a-Service platform purpose-built for automation, web scraping, ad verification, and digital marketing. We operate real cellular devices on 4G and 5G networks — delivering genuine mobile IP addresses that pass the strictest fingerprinting and detection systems.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Unlike datacenter or residential proxies, our IPs come directly from carrier networks. That means accurate OS-level TCP fingerprints, proper DNS resolution through mobile resolvers, and the trust scores that only real mobile traffic can achieve.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "99.99%", label: "Uptime" },
                { value: "5G", label: "Speeds" },
                { value: "24/7", label: "Support" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-extrabold text-amber-400">{stat.value}</p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-amber-950/20 via-zinc-900 to-black border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-white text-xl font-bold mb-6">
                Why Closed Beta?
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                We&apos;re rolling out access in controlled waves to ensure every user gets a premium experience. During beta, you&apos;ll work directly with our team, help shape the product, and lock in pricing that won&apos;t be available after launch.
              </p>
              <h4 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                Beta Member Perks
              </h4>
              <ul className="space-y-3">
                {BETA_PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-zinc-300">
                    <IconCheck size={16} className="text-amber-400 shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-8 w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                Claim Your Spot <IconChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Section ───────────────────────────────────────── */}
      <section className="relative py-24 px-6 border-t border-zinc-800">
        <div className="absolute -right-40 top-0 w-80 h-80 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3 block">
              What You Get
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Built for <span className="text-amber-400">Serious</span> Use Cases
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              From web scraping to ad verification, ProXiFi proxies are engineered for the workflows that matter. Here&apos;s what&apos;s under the hood.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group border border-zinc-800 rounded-2xl p-6 bg-gradient-to-br from-black via-stone-950 to-black hover:border-amber-600/50 transition-colors"
              >
                <div className="mb-4 p-2.5 bg-amber-950/30 rounded-xl w-fit text-amber-400 group-hover:bg-amber-950/50 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/Docs"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors"
            >
              Explore full documentation <IconArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-amber-600/30 bg-gradient-to-br from-amber-950/20 via-zinc-900 to-black p-12 text-center">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
            <span className="relative inline-block mb-4 px-3 py-1 rounded-full border border-amber-600/50 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Limited Spots
            </span>
            <h2 className="relative text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              Don&apos;t Miss the Beta
            </h2>
            <p className="relative text-zinc-400 text-base max-w-lg mx-auto mb-8 leading-relaxed">
              We&apos;re onboarding in small waves. Join the waitlist now to lock in early-bird pricing and get priority access when your wave opens.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="relative inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
            >
              Join the Waitlist <IconChevronRight size={18} />
            </button>
            <p className="relative mt-4 text-zinc-600 text-xs">
              No spam. No credit card. Just early access.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
