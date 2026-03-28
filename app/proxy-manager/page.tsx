"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconDeviceMobile,
  IconRefresh,
  IconCode,
  IconClock,
  IconServer,
  IconShield,
  IconWifi,
  IconBolt,
  IconUsers,
  IconDownload,
  IconTerminal2,
  IconPlugConnected,
  IconChartBar,
  IconLock,
  IconCheck,
  IconLoader2,
  IconCircleCheck,
  IconPlayerPlay,
} from "@tabler/icons-react";

// ─── Feature Grid ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <IconDeviceMobile className="w-6 h-6 text-amber-400" />,
    title: "Auto Device Discovery",
    description:
      "Plug in your USB dongles or Android phones and the software instantly detects every device, assigns proxy ports, and brings them online — zero manual configuration.",
  },
  {
    icon: <IconWifi className="w-6 h-6 text-amber-400" />,
    title: "HTTP & SOCKS5 Proxies",
    description:
      "Every connected device exposes both an HTTP and a SOCKS5 proxy endpoint simultaneously, compatible with all major browsers, automation tools, and anti-detect browsers.",
  },
  {
    icon: <IconRefresh className="w-6 h-6 text-amber-400" />,
    title: "Flexible IP Rotation",
    description:
      "Rotate any proxy's IP on demand with one click, on a configurable timer interval, or via a per-proxy API link your bots can trigger automatically.",
  },
  {
    icon: <IconCode className="w-6 h-6 text-amber-400" />,
    title: "Full Rotation API",
    description:
      "Each proxy exposes a rotation API endpoint compatible with AdsPower, MultiLogin, GenLogin, and any HTTP-capable automation stack. Hit it before each task for a fresh IP.",
  },
  {
    icon: <IconShield className="w-6 h-6 text-amber-400" />,
    title: "TCP Fingerprint Spoofing",
    description:
      "Mask your Linux server as Windows, macOS, or iOS at the OS level to bypass detection systems that cross-check User-Agent against TCP stack fingerprints.",
  },
  {
    icon: <IconLock className="w-6 h-6 text-amber-400" />,
    title: "DNS Leak Prevention",
    description:
      "Forces DNS resolution through the SIM card's own DNS servers, perfectly matching a real mobile handset and eliminating DNS leaks that reveal proxy usage.",
  },
  {
    icon: <IconUsers className="w-6 h-6 text-amber-400" />,
    title: "Multi-User Access Control",
    description:
      "Create separate user accounts with granular permissions. Assign specific proxies to specific users, set bandwidth limits, and manage access from a central dashboard.",
  },
  {
    icon: <IconChartBar className="w-6 h-6 text-amber-400" />,
    title: "Real-Time Monitoring",
    description:
      "Live dashboard showing connection status, carrier, signal strength, current IP, bytes sent/received, and uptime for every device in your rack.",
  },
  {
    icon: <IconBolt className="w-6 h-6 text-amber-400" />,
    title: "Bandwidth Management",
    description:
      "Set per-proxy bandwidth caps, view consumption graphs, and get alerts when devices approach their data limits — keeping your operation cost-predictable.",
  },
  {
    icon: <IconPlugConnected className="w-6 h-6 text-amber-400" />,
    title: "Bulk Export",
    description:
      "Export all proxy credentials (host:port:user:pass) in one click in any format — plain text, CSV, or JSON — ready to paste directly into your tools.",
  },
  {
    icon: <IconServer className="w-6 h-6 text-amber-400" />,
    title: "Self-Hosted & Private",
    description:
      "Runs on your own Windows or Linux server. Your proxy traffic never passes through our infrastructure — you own every device, IP, and byte of traffic.",
  },
  {
    icon: <IconTerminal2 className="w-6 h-6 text-amber-400" />,
    title: "CLI + REST API",
    description:
      "Headless management via command-line or REST API for full DevOps integration. Automate provisioning, rotation, and monitoring from your existing pipelines.",
  },
];

// ─── How It Works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    step: "01",
    title: "Purchase & Download",
    description:
      "Complete your one-time purchase and instantly receive a license key and download link for the latest installer. Supports Windows Server 2019+ and Ubuntu 20.04+.",
  },
  {
    step: "02",
    title: "Install on Your Server",
    description:
      "Run the installer on your dedicated server or VPS. The setup wizard walks you through port configuration, admin credentials, and SSL in under 5 minutes.",
  },
  {
    step: "03",
    title: "Connect Your Devices",
    description:
      "Plug in USB LTE modems or root-and-connect Android phones via USB. The software scans for devices every 30 seconds and brings new ones online automatically.",
  },
  {
    step: "04",
    title: "Proxies Go Live Instantly",
    description:
      "Each device is assigned sequential HTTP and SOCKS5 ports. The dashboard shows live status, current carrier IP, and uptime — no manual setup per device.",
  },
  {
    step: "05",
    title: "Configure Rotation & Users",
    description:
      "Set rotation schedules, link each proxy to an API endpoint, create user accounts, and assign devices. All managed from the clean web-based control panel.",
  },
  {
    step: "06",
    title: "Connect Your Tools",
    description:
      "Copy credentials into AdsPower, Multilogin, Puppeteer, or any other tool. Use the rotation API link for fully automated IP cycling before every session.",
  },
];

// ─── What You Get ─────────────────────────────────────────────────────────────

const INCLUDES = [
  "Lifetime software license — no subscription",
  "Unlimited devices on your server",
  "Unlimited user accounts",
  "Free updates for 12 months",
  "Full REST API and CLI access",
  "Private installation — runs on your hardware",
  "Detailed setup documentation",
  "One-time onboarding call (45 min)",
  "60-day email support included",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProxyManagerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : null;
  const success = searchParams?.get("success") === "1";
  const canceled = searchParams?.get("canceled") === "1";

  async function handlePurchase() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/proxy-manager/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      router.push(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="bg-black text-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
        <span className="inline-block mb-4 px-4 py-1 rounded-full border border-amber-600/60 text-amber-400 text-xs font-semibold uppercase tracking-widest">
          Self-Hosted Software
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Run Your Own{" "}
          <span className="text-amber-400">Mobile Proxy</span>{" "}
          Operation
        </h1>
        <p className="text-lg text-zinc-400 max-w-3xl mx-auto mb-10">
          ProXiFi Proxy Manager is installed on your server and turns USB LTE modems or Android devices into a
          fully-managed mobile proxy pool — with IP rotation, API access, multi-user controls, and real-time
          monitoring. One-time purchase. You own it forever.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            {loading && <IconLoader2 size={20} className="animate-spin" />}
            {!loading && <IconBolt size={20} />}
            Purchase — $1,500 one-time
          </button>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 border border-zinc-700 hover:border-amber-500 text-zinc-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            <IconPlayerPlay size={18} /> See How It Works
          </a>
        </div>
        {error && (
          <p className="mt-4 text-red-400 text-sm">{error}</p>
        )}
        {canceled && !success && (
          <p className="mt-4 text-zinc-400 text-sm">Payment canceled — your card was not charged.</p>
        )}
        {success && (
          <div className="mt-6 inline-flex items-center gap-2 bg-green-900/40 border border-green-600 text-green-300 px-6 py-3 rounded-xl">
            <IconCircleCheck size={20} /> Payment successful! Check your email for your license key and download link.
          </div>
        )}
      </section>

      {/* ── What You Get ─────────────────────────────────────────────── */}
      <section className="bg-stone-950 border-y border-zinc-800 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-2xl font-bold text-white mb-8">Everything Included — One Price</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INCLUDES.map((item) => (
              <div key={item} className="flex items-center gap-3 text-zinc-300 text-sm">
                <IconCheck size={16} className="text-amber-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-3">What the Software Does</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A complete mobile proxy management platform you deploy once and control entirely.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="border border-zinc-800 rounded-2xl p-6 bg-gradient-to-br from-black via-stone-950 to-black hover:border-amber-600/50 transition-colors"
            >
              <div className="mb-4 p-2 bg-amber-950/30 rounded-xl w-fit">{f.icon}</div>
              <h3 className="text-white font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-stone-950 border-y border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-zinc-400">From purchase to a live proxy pool in under 30 minutes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-950/40 border border-amber-700/40 flex items-center justify-center text-amber-400 font-extrabold text-sm">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requirements ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">System Requirements</h2>
          <p className="text-zinc-400">Any modern server or VPS with USB access will work.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-zinc-800 rounded-2xl p-6 bg-gradient-to-br from-black via-stone-950 to-black">
            <div className="flex items-center gap-3 mb-4">
              <IconDownload className="text-amber-400" size={22} />
              <h3 className="text-white font-semibold">Windows</h3>
            </div>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><IconCheck size={14} className="text-amber-400" /> Windows Server 2019 / 2022 or Windows 10/11</li>
              <li className="flex items-center gap-2"><IconCheck size={14} className="text-amber-400" /> 4 GB RAM minimum (8 GB recommended)</li>
              <li className="flex items-center gap-2"><IconCheck size={14} className="text-amber-400" /> 2 CPU cores minimum</li>
              <li className="flex items-center gap-2"><IconCheck size={14} className="text-amber-400" /> USB 2.0+ ports or USB hub</li>
              <li className="flex items-center gap-2"><IconCheck size={14} className="text-amber-400" /> Outbound internet access</li>
            </ul>
          </div>
          <div className="border border-zinc-800 rounded-2xl p-6 bg-gradient-to-br from-black via-stone-950 to-black">
            <div className="flex items-center gap-3 mb-4">
              <IconTerminal2 className="text-amber-400" size={22} />
              <h3 className="text-white font-semibold">Linux</h3>
            </div>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><IconCheck size={14} className="text-amber-400" /> Ubuntu 20.04 / 22.04 / Debian 11+</li>
              <li className="flex items-center gap-2"><IconCheck size={14} className="text-amber-400" /> 4 GB RAM minimum (8 GB recommended)</li>
              <li className="flex items-center gap-2"><IconCheck size={14} className="text-amber-400" /> 2 CPU cores minimum</li>
              <li className="flex items-center gap-2"><IconCheck size={14} className="text-amber-400" /> USB 2.0+ ports or USB hub (with udev rules)</li>
              <li className="flex items-center gap-2"><IconCheck size={14} className="text-amber-400" /> Root or sudo access for initial setup</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Compatible Devices ───────────────────────────────────────── */}
      <section className="bg-stone-950 border-y border-zinc-800 py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Compatible Devices</h2>
          <p className="text-zinc-400 mb-8 text-sm max-w-xl mx-auto">
            Works with any USB LTE/5G modem or Android 8+ phone in USB tethering mode.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Huawei E3372", "ZTE MF833", "Alcatel IK41", "Franklin T9", "Quectel EC25", "Android (USB Tether)", "Sierra Wireless", "Micromax 4G", "Netgear LB1120"].map((d) => (
              <span key={d} className="px-4 py-2 rounded-full border border-zinc-700 text-zinc-300 text-sm">
                {d}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full border border-amber-600/50 text-amber-400 text-sm">+ More</span>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Run Your Own Proxy Farm?</h2>
        <p className="text-zinc-400 mb-8 text-lg">
          One purchase. Unlimited devices. Full control. Deploy in minutes on your own infrastructure.
        </p>
        <div className="inline-block border border-amber-600/40 rounded-2xl p-8 bg-gradient-to-br from-amber-950/20 via-stone-950 to-black mb-8">
          <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">One-Time License</p>
          <p className="text-6xl font-extrabold text-amber-400 mb-1">$1,500</p>
          <p className="text-zinc-500 text-sm">No recurring fees. No per-device charges.</p>
        </div>
        <br />
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="flex items-center gap-2 mx-auto bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-bold px-12 py-4 rounded-xl text-lg transition-colors"
        >
          {loading && <IconLoader2 size={20} className="animate-spin" />}
          {!loading && <IconBolt size={20} />}
          Purchase Proxy Manager — $1,500
        </button>
        {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
        <p className="mt-4 text-zinc-600 text-xs">Secure checkout via Stripe. License delivered instantly by email.</p>
      </section>

    </main>
  );
}
