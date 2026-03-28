"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconCheck, IconX, IconLoader2, IconDeviceMobile, IconRefresh, IconShield,
  IconWifi, IconCode, IconClock, IconBuildingStore, IconBolt, IconNetwork,
  IconFingerprint, IconServer, IconLock, IconMessage,
} from "@tabler/icons-react";

// ─── Feature list ─────────────────────────────────────────────────────────────

const FEATURE_SECTIONS = [
  {
    title: "Automatic Proxy Generation",
    icon: <IconDeviceMobile className="w-6 h-6 text-amber-400" />,
    description:
      "Plug in your USB dongles or Android phones and the panel discovers them automatically, creates HTTP & SOCKS5 proxies, and displays live status — no manual config needed.",
  },
  {
    title: "IP Rotation — Button, API & Timer",
    icon: <IconRefresh className="w-6 h-6 text-amber-400" />,
    description:
      "Rotate any modem's IP on demand with one click, via an API link your bots can hit automatically, or on a configurable interval timer — all three methods included.",
  },
  {
    title: "API Link Suite for Automation",
    icon: <IconCode className="w-6 h-6 text-amber-400" />,
    description:
      "Each proxy exposes a rotation API endpoint compatible with AdsPower, MultiLogin, GenLogin and any HTTP-capable bot. Start every task with a fresh mobile IP.",
  },
  {
    title: "Scheduled IP Rotation",
    icon: <IconClock className="w-6 h-6 text-amber-400" />,
    description:
      "Configure a rotation interval (e.g. every 15 seconds) and your proxies cycle through fresh IPs automatically without any manual trigger or bot integration.",
  },
  {
    title: "TCP / OS Fingerprint Spoofing",
    icon: <IconFingerprint className="w-6 h-6 text-amber-400" />,
    description:
      "Bypass detection systems that compare User-Agent against OS-level TCP fingerprints. Mask your Linux server as Windows, macOS, or iOS for full anti-detection coverage.",
  },
  {
    title: "DNS Faker — No DNS Leaks",
    icon: <IconServer className="w-6 h-6 text-amber-400" />,
    description:
      "Forces DNS resolution through the SIM/dongle's own DNS servers, matching a real mobile phone exactly and eliminating the DNS leaks that expose proxy usage.",
  },
  {
    title: "VPN per Modem (OpenVPN / WireGuard)",
    icon: <IconNetwork className="w-6 h-6 text-amber-400" />,
    description:
      "Each dongle gets its own VPN tunnel. Expose the proxy through OpenVPN or WireGuard so any device on the network can use it with full UDP support.",
  },
  {
    title: "SOCKS5 with Full UDP Support",
    icon: <IconWifi className="w-6 h-6 text-amber-400" />,
    description:
      "Unlike most proxy servers, our SOCKS5 implementation passes UDP packets — essential for QUIC, HTTP/3, WebRTC, and modern web fingerprinting resistance.",
  },
  {
    title: "Password & IP Whitelist Auth",
    icon: <IconLock className="w-6 h-6 text-amber-400" />,
    description:
      "Assign per-port credentials or whitelist specific IPs so only your tools access the proxies. Full auth control per individual proxy port.",
  },
  {
    title: "Whitelist / Blacklist Websites",
    icon: <IconShield className="w-6 h-6 text-amber-400" />,
    description:
      "Restrict which destinations each proxy can reach. Set per-proxy allowlists for target sites or block specific domains to enforce usage policies.",
  },
  {
    title: "Proxy Selling Features",
    icon: <IconBuildingStore className="w-6 h-6 text-amber-400" />,
    description:
      "Generate hundreds of shared ports per modem, group modems into pools, apply custom auth per port, and use the selling API to integrate into your own storefront.",
  },
  {
    title: "SMS / USSD Utilities",
    icon: <IconMessage className="w-6 h-6 text-amber-400" />,
    description:
      "Check SIM balance, view phone number, top up data plans, and read/send SMS through the panel — no need to physically touch each dongle.",
  },
  {
    title: "Real-Time Traffic & Access Logs",
    icon: <IconBolt className="w-6 h-6 text-amber-400" />,
    description:
      "Stream live logs showing date, port, modem, remote IP, destination domain, HTTP status, and bytes transferred. Filter and export logs from the dashboard.",
  },
];

// ─── Pricing plans ────────────────────────────────────────────────────────────

type BillingCycle = "monthly" | "quarterly" | "lifetime";

interface SoftwarePlan {
  id: "starter" | "basic" | "premium" | "business";
  name: string;
  tagline: string;
  prices: Record<BillingCycle, number | null>;
  modems: string;
  highlight: boolean;
  features: { label: string; included: boolean }[];
}

const PLANS: SoftwarePlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Free forever",
    prices: { monthly: 0, quarterly: 0, lifetime: 0 },
    modems: "Up to 3 modems",
    highlight: false,
    features: [
      { label: "Auto proxy generation", included: true },
      { label: "HTTP & SOCKS5 proxies", included: true },
      { label: "Manual IP rotation", included: true },
      { label: "Scheduled & API rotation", included: false },
      { label: "Android device management", included: false },
      { label: "VPN per modem", included: false },
      { label: "TCP fingerprint spoofing", included: false },
      { label: "DNS Faker", included: false },
      { label: "Auth & access control", included: false },
      { label: "Traffic logs", included: false },
      { label: "Proxy selling features", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    id: "basic",
    name: "Basic",
    tagline: "Personal use & automation",
    prices: { monthly: 29, quarterly: 69, lifetime: 199 },
    modems: "Up to 10 modems",
    highlight: false,
    features: [
      { label: "Auto proxy generation", included: true },
      { label: "HTTP & SOCKS5 proxies", included: true },
      { label: "Manual IP rotation", included: true },
      { label: "Scheduled & API rotation", included: true },
      { label: "Android device management", included: true },
      { label: "VPN per modem", included: false },
      { label: "TCP fingerprint spoofing", included: false },
      { label: "DNS Faker", included: false },
      { label: "Auth & access control", included: true },
      { label: "Traffic logs", included: true },
      { label: "Proxy selling features", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Power users & anti-detection",
    prices: { monthly: 49, quarterly: 119, lifetime: 349 },
    modems: "Up to 30 modems",
    highlight: true,
    features: [
      { label: "Auto proxy generation", included: true },
      { label: "HTTP & SOCKS5 proxies", included: true },
      { label: "Manual IP rotation", included: true },
      { label: "Scheduled & API rotation", included: true },
      { label: "Android device management", included: true },
      { label: "VPN per modem", included: true },
      { label: "TCP fingerprint spoofing", included: true },
      { label: "DNS Faker", included: true },
      { label: "Auth & access control", included: true },
      { label: "Traffic logs", included: true },
      { label: "Proxy selling features", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Sell proxies to your customers",
    prices: { monthly: 99, quarterly: 239, lifetime: 699 },
    modems: "Up to 100 modems",
    highlight: false,
    features: [
      { label: "Auto proxy generation", included: true },
      { label: "HTTP & SOCKS5 proxies", included: true },
      { label: "Manual IP rotation", included: true },
      { label: "Scheduled & API rotation", included: true },
      { label: "Android device management", included: true },
      { label: "VPN per modem", included: true },
      { label: "TCP fingerprint spoofing", included: true },
      { label: "DNS Faker", included: true },
      { label: "Auth & access control", included: true },
      { label: "Traffic logs", included: true },
      { label: "Proxy selling features", included: true },
      { label: "Priority support", included: true },
    ],
  },
];

function PriceDisplay({ plan, cycle }: { plan: SoftwarePlan; cycle: BillingCycle }) {
  const price = plan.prices[cycle];
  if (price === 0) return <span className="text-5xl font-extrabold">Free</span>;
  if (price === null) return <span className="text-2xl font-bold text-zinc-500">N/A</span>;
  return (
    <>
      <span className="text-5xl font-extrabold">${price}</span>
      <span className="text-zinc-400 ml-2 text-sm">
        {cycle === "lifetime" ? "one-time" : cycle === "quarterly" ? "/ 3 months" : "/ month"}
      </span>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SoftwarePage() {
  const router = useRouter();
  const [cycle, setCycle] = useState<BillingCycle>("quarterly");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handlePurchase(planId: SoftwarePlan["id"], billingCycle: BillingCycle) {
    setLoading(`${planId}_${billingCycle}`);
    setError(null);
    try {
      const res = await fetch("/api/software/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, billingCycle }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.free) { router.push(data.redirect); return; }
      router.push(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          PROXY MANAGEMENT SOFTWARE
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Run Your Own<br />Mobile Proxy Farm
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
          Install ProXiFi Software on your hardware, plug in USB dongles or Android phones,
          and instantly get a fully managed HTTP/SOCKS5 proxy panel with IP rotation,
          anti-detection, and a built-in reseller API.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#pricing" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl transition-all">
            See Pricing
          </a>
          <a href="#features" className="border border-zinc-700 hover:border-zinc-500 text-white px-6 py-3 rounded-xl transition-all">
            View Features
          </a>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Everything You Need</h2>
        <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
          One panel. Every feature. From basic proxy generation to enterprise selling.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURE_SECTIONS.map((f) => (
            <div
              key={f.title}
              className="bg-gradient-to-br from-zinc-900 via-stone-950 to-black border border-zinc-800 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                {f.icon}
                <h3 className="font-semibold text-white text-sm">{f.title}</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Software Pricing</h2>
        <p className="text-zinc-400 text-center mb-8 max-w-xl mx-auto">
          One-time setup on your own server. No per-IP fees. Unlimited rotations.
        </p>

        {/* Billing toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
            {(["monthly", "quarterly", "lifetime"] as BillingCycle[]).map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                  cycle === c
                    ? "bg-amber-500 text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {c === "quarterly" ? "Quarterly (save ~20%)" : c === "lifetime" ? "Lifetime" : "Monthly"}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-8 max-w-md mx-auto rounded-xl bg-red-900/40 border border-red-700 p-4 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl p-6 border ${
                plan.highlight
                  ? "border-amber-500 bg-gradient-to-br from-amber-950/30 via-stone-950 to-black"
                  : "border-zinc-800 bg-gradient-to-br from-zinc-900 via-stone-950 to-black"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-3 py-0.5 rounded-full">
                  MOST POPULAR
                </span>
              )}

              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              <p className="text-zinc-500 text-xs mb-4">{plan.tagline}</p>

              <div className="mb-1">
                <PriceDisplay plan={plan} cycle={cycle} />
              </div>
              <p className="text-zinc-500 text-xs mb-5">{plan.modems}</p>

              <button
                onClick={() => handlePurchase(plan.id, cycle)}
                disabled={loading !== null}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all mb-6 ${
                  plan.highlight
                    ? "bg-amber-500 hover:bg-amber-400 text-black"
                    : plan.id === "starter"
                    ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === `${plan.id}_${cycle}` ? (
                  <><IconLoader2 className="w-4 h-4 animate-spin" /> Processing...</>
                ) : plan.id === "starter" ? (
                  "Get Started Free"
                ) : (
                  "Get License"
                )}
              </button>

              <div className="border-t border-zinc-800 pt-5 space-y-2 flex-1">
                {plan.features.map((f) => (
                  <div key={f.label} className="flex items-center gap-2">
                    {f.included ? (
                      <IconCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    ) : (
                      <IconX className="w-3.5 h-3.5 text-zinc-700 flex-shrink-0" />
                    )}
                    <span className={`text-xs ${f.included ? "text-zinc-300" : "text-zinc-600"}`}>
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-8">
          All plans are a one-time software license per server. No per-IP or per-request fees. Payments via Stripe.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
        <div className="space-y-4">
          {[
            {
              q: "Does the license include hardware?",
              a: "No — you supply your own USB LTE dongles, Android phones, or 5G CPE devices. The software license covers the management panel only.",
            },
            {
              q: "How many proxies does each modem provide?",
              a: "One modem = one mobile IP at a time. With the Business plan you can share a single modem port across hundreds of connections simultaneously.",
            },
            {
              q: "Can I rotate the IP? How do I get hundreds of IPs?",
              a: "Yes — each rotation requests a new IP from the carrier. More modems = more simultaneous unique IPs. IP pools grow linearly with hardware.",
            },
            {
              q: "How do I install the software?",
              a: "After purchase you receive a license key and a download link for the installer. Full documentation and install guides are in our Docs section.",
            },
            {
              q: "Can I upgrade my plan later?",
              a: "Yes — upgrade at any time from your Dashboard. You will be charged the pro-rated difference for the remaining billing period.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-semibold text-white text-sm mb-2">{q}</h3>
              <p className="text-zinc-400 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

