"use client";

import { useEffect, useRef, useState } from "react";
import {
  IconBook2,
  IconBulb,
  IconAffiliate,
  IconMap2,
  IconChartBar,
  IconCpu,
  IconLayoutGrid,
  IconServer,
  IconShieldCheck,
  IconCertificate,
  IconRocket,
  IconCreditCard,
  IconCode,
  IconFileText,
  IconMenu2,
  IconX,
  IconCheck,
} from "@tabler/icons-react";

// ─── Sections definition ─────────────────────────────────────────────────────

const SECTIONS = [
  { id: "introduction",      label: "Introduction",                    icon: <IconBook2 size={16} /> },
  { id: "what-is-proxifi",   label: "What is ProXiFi?",               icon: <IconBulb size={16} /> },
  { id: "problem-solution",  label: "The Problem & The Solution",      icon: <IconAffiliate size={16} /> },
  { id: "use-cases",         label: "Use Cases & Industry Applications", icon: <IconAffiliate size={16} /> },
  { id: "roadmap",           label: "Roadmap",                         icon: <IconMap2 size={16} /> },
  { id: "financials",        label: "Financial Projections",           icon: <IconChartBar size={16} /> },
  { id: "technicals",        label: "The Technicals",                  icon: <IconCpu size={16} /> },
  { id: "core-features",     label: "Core Features",                   icon: <IconLayoutGrid size={16} /> },
  { id: "technical-design",  label: "Technical Design",                icon: <IconServer size={16} /> },
  { id: "security",          label: "Security & Compliance",           icon: <IconShieldCheck size={16} /> },
  { id: "sla",               label: "SLA",                             icon: <IconCertificate size={16} /> },
  { id: "getting-started",   label: "Getting Started",                 icon: <IconRocket size={16} /> },
  { id: "pricing",           label: "Plans & Pricing",                 icon: <IconCreditCard size={16} /> },
  { id: "api",               label: "Developers and API Access",       icon: <IconCode size={16} /> },
  { id: "tos",               label: "Terms of Service",                icon: <IconFileText size={16} /> },
];

// ─── Section heading helper ───────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-zinc-800 pb-4">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-bold text-amber-400 mt-8 mb-3">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-zinc-400 leading-relaxed mb-4">{children}</p>;
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-4">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
          <IconCheck size={15} className="text-amber-400 mt-0.5 shrink-0" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-stone-900 text-amber-400 uppercase text-xs">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left border-b border-zinc-800 font-semibold tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-black" : "bg-stone-950"}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-zinc-300 border-b border-zinc-800/50">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Badge({ children, color = "amber" }: { children: React.ReactNode; color?: "amber" | "zinc" | "green" | "blue" }) {
  const colors = {
    amber: "bg-amber-900/40 text-amber-300 border-amber-700/50",
    zinc:  "bg-zinc-800 text-zinc-300 border-zinc-700",
    green: "bg-green-900/40 text-green-300 border-green-700/50",
    blue:  "bg-blue-900/40 text-blue-300 border-blue-700/50",
  };
  return (
    <span className={`inline-block border text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
}

// ─── All Content Sections ─────────────────────────────────────────────────────

function Introduction() {
  return (
    <>
      <SectionHeading>Introduction</SectionHeading>
      <P>
        Welcome to the official ProXiFi documentation. This document serves as the authoritative reference for
        understanding the ProXiFi platform — its mission, architecture, product offerings, technical design, and
        commercial model.
      </P>
      <P>
        ProXiFi is a mobile proxy infrastructure platform built for operators, developers, and businesses that
        require authentic, high-trust mobile IP addresses at scale. Unlike datacenter or residential proxies,
        ProXiFi routes traffic exclusively through real SIM-connected mobile devices, producing IP addresses
        that are indistinguishable from a real smartphone on a carrier network.
      </P>
      <P>
        This documentation covers both the hosted proxy service (where ProXiFi manages the hardware) and the
        ProXiFi Proxy Manager software (where operators run their own device fleets on their own servers).
      </P>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Hosted Proxy Service", desc: "Managed proxies — shared or dedicated, billed monthly." },
          { label: "Proxy Manager Software", desc: "Self-hosted software to run your own proxy operation." },
          { label: "REST API", desc: "Full programmatic access for automation and integration." },
        ].map((c) => (
          <div key={c.label} className="border border-zinc-800 rounded-xl p-4 bg-stone-950">
            <p className="text-amber-400 font-semibold text-sm mb-1">{c.label}</p>
            <p className="text-zinc-500 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function WhatIsProXiFi() {
  return (
    <>
      <SectionHeading>What is ProXiFi?</SectionHeading>
      <P>
        ProXiFi is a dual-product mobile proxy platform. At its core it provides two things: a managed
        mobile proxy service for end users who want ready-to-use mobile IPs, and a software product for
        operators who want to build and run their own proxy farms.
      </P>
      <SubHeading>Managed Proxy Service</SubHeading>
      <P>
        Users subscribe to a shared or dedicated mobile proxy plan and receive HTTP and SOCKS5 credentials
        that route through real SIM-connected Android devices. Proxies can be rotated on demand, on a timer,
        or via the rotation API. The ProXiFi dashboard provides real-time connection status, usage metrics,
        and one-click IP rotation.
      </P>
      <SubHeading>Proxy Manager Software</SubHeading>
      <P>
        A self-hosted software suite that operators install on their own Windows or Linux server. It discovers
        USB-connected LTE modems and Android phones, assigns proxy ports, manages IP rotation, controls
        multi-user access, and exposes a REST API — turning any device rack into a production proxy operation
        with no per-device configuration.
      </P>
      <SubHeading>Who It&apos;s For</SubHeading>
      <Ul items={[
        "Performance marketers running accounts across ad platforms",
        "E-commerce operators managing inventory bots and price scrapers",
        "Automation agencies running anti-detect browser workflows",
        "Data engineers collecting public web data at scale",
        "Proxy resellers looking for white-label infrastructure",
        "Security researchers testing geo-dependent application behavior",
      ]} />
    </>
  );
}

function ProblemSolution() {
  return (
    <>
      <SectionHeading>The Problem & The Solution</SectionHeading>
      <SubHeading>The Problem</SubHeading>
      <P>
        Modern web platforms — ad networks, social media, e-commerce sites, and financial services — have
        invested heavily in proxy detection. Datacenter IP ranges are blocked by default on most major
        platforms. Residential proxies are frequently flagged due to shared abuse history, inconsistent
        geolocation, and mismatched TCP fingerprints. Even premium proxy providers often deliver IPs that
        are already burned before you receive them.
      </P>
      <P>
        For operators running at scale, a flagged or banned proxy means lost work, chargebacks on ad spend,
        and compromised data integrity. The market has long needed a proxy solution that is genuinely
        indistinguishable from a real mobile user at every layer of inspection.
      </P>
      <SubHeading>The Solution</SubHeading>
      <P>
        ProXiFi routes all traffic through real SIM-connected mobile devices on major carrier networks.
        Every connection originates from a genuine mobile IP, carries the correct carrier DNS, passes OS-level
        TCP fingerprint checks, and presents realistic mobile network metadata. No heuristic or ML-based
        detection layer can distinguish a ProXiFi proxy from an actual smartphone user.
      </P>
      <Table
        headers={["Property", "Datacenter", "Residential", "ProXiFi Mobile"]}
        rows={[
          ["IP origin",         "Cloud provider ASN",    "ISP residential",     "Mobile carrier ASN"],
          ["TCP fingerprint",   "Linux server",          "Mixed / inconsistent","Real mobile OS"],
          ["DNS",               "Datacenter DNS",        "Mixed",               "Carrier SIM DNS"],
          ["Block rate",        "High",                  "Medium",              "Very Low"],
          ["Rotation control",  "Limited",               "Limited",             "Full — button/API/timer"],
          ["Geo accuracy",      "Poor",                  "Medium",              "Carrier-accurate"],
        ]}
      />
    </>
  );
}

function UseCases() {
  return (
    <>
      <SectionHeading>Use Cases & Industry Applications</SectionHeading>
      <P>
        Mobile proxies are required in any workflow where platform trust, geo-accuracy, or anti-detection
        is critical. Below are the primary verticals ProXiFi serves today.
      </P>
      {[
        {
          title: "Digital Advertising",
          items: [
            "Managing multiple ad accounts on Meta, TikTok, and Google without triggering account linking",
            "Verifying ad placements and creative rendering by geo",
            "Warming new ad accounts with authentic mobile traffic",
          ],
        },
        {
          title: "E-Commerce & Retail Automation",
          items: [
            "Sneaker and limited-release retail bots requiring undetected checkout sessions",
            "Price monitoring and competitor intelligence scraping",
            "Multi-account store management with isolated sessions",
          ],
        },
        {
          title: "Social Media Management",
          items: [
            "Operating multiple brand or creator accounts from a single machine",
            "Scheduling and automation tools for Instagram, Twitter/X, LinkedIn",
            "Audience research and engagement analysis across regions",
          ],
        },
        {
          title: "Web Scraping & Data Engineering",
          items: [
            "Collecting public search engine data without CAPTCHA interruptions",
            "Geographic content and pricing data for market research",
            "Real estate listing aggregation and financial data collection",
          ],
        },
        {
          title: "Security Research",
          items: [
            "Testing geo-dependent features and access controls",
            "Simulating real mobile user sessions for QA and penetration testing",
            "Verifying CDN and WAF rules from different carrier ASNs",
          ],
        },
      ].map((section) => (
        <div key={section.title}>
          <SubHeading>{section.title}</SubHeading>
          <Ul items={section.items} />
        </div>
      ))}
    </>
  );
}

function Roadmap() {
  const phases = [
    {
      phase: "Q2 2026",
      status: "In Progress",
      color: "amber" as const,
      items: [
        "Launch hosted proxy service (Starter, Growth, Standard, Premium plans)",
        "Release Proxy Manager v1.0 (Windows + Linux)",
        "Full REST API for rotation and proxy management",
        "Dashboard — real-time proxy monitoring",
      ],
    },
    {
      phase: "Q3 2026",
      status: "Planned",
      color: "zinc" as const,
      items: [
        "5G modem support and carrier selection per proxy",
        "Proxy pool health scoring and auto-replacement",
        "Webhook events for rotation and status changes",
        "White-label reseller portal",
      ],
    },
    {
      phase: "Q4 2026",
      status: "Planned",
      color: "zinc" as const,
      items: [
        "Mobile SDK for iOS and Android app integration",
        "Geographic city-level targeting",
        "Scraper API — structured data extraction layer built on proxy stack",
        "Enterprise SLA tier with dedicated account management",
      ],
    },
    {
      phase: "Q1 2027",
      status: "Research",
      color: "blue" as const,
      items: [
        "AI-assisted rotation scheduling based on platform detection patterns",
        "Carrier-specific routing rules (AT&T, T-Mobile, Verizon isolation)",
        "Distributed proxy orchestration across multiple server nodes",
        "Compliance and audit logging suite for regulated industries",
      ],
    },
  ];

  return (
    <>
      <SectionHeading>Roadmap</SectionHeading>
      <P>
        The ProXiFi roadmap prioritizes product-market fit in the core proxy market before expanding into
        adjacent infrastructure and data products. All dates are targets and subject to change.
      </P>
      <div className="space-y-6">
        {phases.map((p) => (
          <div key={p.phase} className="border border-zinc-800 rounded-xl p-6 bg-gradient-to-br from-black via-stone-950 to-black">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white font-bold text-lg">{p.phase}</span>
              <Badge color={p.color}>{p.status}</Badge>
            </div>
            <Ul items={p.items} />
          </div>
        ))}
      </div>
    </>
  );
}

function Financials() {
  return (
    <>
      <SectionHeading>Financial Projections</SectionHeading>
      <P>
        ProXiFi operates a dual revenue model: recurring monthly subscriptions for the hosted proxy service,
        and one-time license sales for the Proxy Manager software. The following projections are based on
        conservative adoption assumptions and do not account for enterprise or white-label contracts.
      </P>
      <SubHeading>Revenue Streams</SubHeading>
      <Table
        headers={["Product", "Model", "Price", "Margin Profile"]}
        rows={[
          ["Starter Proxy",         "Monthly subscription", "$55/mo",    "~60% after infrastructure"],
          ["Growth Proxy",          "Monthly subscription", "$70/mo",    "~65% after infrastructure"],
          ["Standard Proxy",        "Monthly subscription", "$90/mo",    "~72% after infrastructure"],
          ["Premium Proxy",         "Monthly subscription", "$105/mo",   "~74% after infrastructure"],
          ["Proxy Manager License", "One-time",             "$1,500",    "~85% (software only)"],
        ]}
      />
      <SubHeading>Year 1 Targets</SubHeading>
      <Table
        headers={["Metric", "6 Months", "12 Months"]}
        rows={[
          ["Active proxy subscribers", "50",      "200"],
          ["Proxy Manager licenses sold", "10",   "40"],
          ["Monthly Recurring Revenue", "$3,250", "$15,250"],
          ["Annual License Revenue", "$15,000",   "$60,000"],
          ["Combined Annual Revenue", "~$54K",    "~$243K"],
        ]}
      />
      <P>
        These projections assume organic growth through SEO, community channels, and direct outreach to
        automation and digital marketing communities. Enterprise contracts and reseller agreements are not
        included and represent upside to these numbers.
      </P>
    </>
  );
}

function Technicals() {
  return (
    <>
      <SectionHeading>The Technicals</SectionHeading>
      <P>
        ProXiFi&apos;s technical architecture is built on three pillars: real mobile hardware, a proxy
        orchestration layer, and a management control plane. Each layer is designed for reliability,
        horizontal scalability, and security-by-default.
      </P>
      <SubHeading>Hardware Layer</SubHeading>
      <P>
        The hardware fleet consists of USB LTE/5G modems (Huawei, ZTE, Quectel, Sierra Wireless) and
        rooted/tethered Android 8+ phones. Devices are connected to Linux servers via USB hubs. Each device
        maintains a persistent cellular data connection to its carrier network.
      </P>
      <SubHeading>Proxy Layer</SubHeading>
      <P>
        Each connected device is assigned sequential HTTP (port 10000+) and SOCKS5 (port 20000+) proxy
        endpoints. Traffic is routed through the device&apos;s cellular interface using OS-level network
        namespace isolation, ensuring no cross-device traffic leakage.
      </P>
      <SubHeading>Control Plane</SubHeading>
      <P>
        The Proxy Manager control plane is a Node.js service that monitors device health, handles rotation
        requests, enforces bandwidth quotas, and exposes the management REST API. The web dashboard
        communicates with the control plane over authenticated WebSocket connections for real-time status
        updates.
      </P>
      <SubHeading>Cloud Infrastructure (Hosted Service)</SubHeading>
      <Ul items={[
        "Device servers: bare-metal Linux with USB hub connectivity",
        "Control plane: containerized Node.js on managed cloud (auto-scaling)",
        "Database: MongoDB Atlas (multi-region replication)",
        "Auth: Clerk — JWT-based session management",
        "Payments: Stripe — PCI-DSS compliant checkout and webhooks",
        "CDN: Vercel Edge Network for the web application layer",
      ]} />
    </>
  );
}

function CoreFeatures() {
  const features = [
    { name: "Auto Device Discovery", desc: "Devices connected via USB are detected within 30 seconds and brought online automatically with no manual port assignment." },
    { name: "HTTP & SOCKS5 Support", desc: "Every proxy exposes both protocols simultaneously. Connect any browser, bot, or tool with standard proxy authentication." },
    { name: "IP Rotation — 3 Methods", desc: "Rotate on demand (dashboard button), on a configurable timer interval, or via a per-proxy API link callable by any HTTP client." },
    { name: "Full REST API", desc: "Programmatic access to list proxies, trigger rotation, check status, and manage users. Full API reference in the Developers section." },
    { name: "TCP Fingerprint Spoofing", desc: "Mask the Linux server's TCP stack as Windows, macOS, or iOS to defeat OS-level proxy detection without modifying the client." },
    { name: "Carrier DNS — No Leaks", desc: "All DNS resolution goes through the SIM's own carrier DNS servers, matching a real mobile device and eliminating DNS leak vectors." },
    { name: "Multi-User Access Control", desc: "Create user accounts with granular proxy assignment. Each user sees only their assigned proxies and cannot affect others." },
    { name: "Real-Time Monitoring", desc: "Live dashboard tiles showing carrier, signal strength, current IP, bytes transferred, last rotation time, and uptime per device." },
    { name: "Bandwidth Management", desc: "Set per-proxy data caps with configurable alerts. Usage graphs show daily and monthly consumption per device." },
    { name: "Bulk Credential Export", desc: "Export all proxy credentials as host:port:user:pass in plain text, CSV, or JSON with a single click." },
    { name: "Self-Hosted Option", desc: "The Proxy Manager software runs entirely on your own infrastructure. Traffic never passes through ProXiFi's servers." },
    { name: "CLI + REST API (Software)", desc: "Headless operation via CLI or REST API for full DevOps and CI/CD integration in automated environments." },
  ];

  return (
    <>
      <SectionHeading>Core Features</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f) => (
          <div key={f.name} className="border border-zinc-800 rounded-xl p-4 bg-gradient-to-br from-black via-stone-950 to-black">
            <p className="text-amber-400 font-semibold text-sm mb-1">{f.name}</p>
            <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function TechnicalDesign() {
  return (
    <>
      <SectionHeading>Technical Design</SectionHeading>
      <SubHeading>Network Architecture</SubHeading>
      <P>
        Each device server runs an instance of the ProXiFi device daemon. The daemon uses <code className="bg-zinc-800 text-amber-300 px-1.5 py-0.5 rounded text-xs">network namespaces</code> (Linux) or <code className="bg-zinc-800 text-amber-300 px-1.5 py-0.5 rounded text-xs">routing tables</code> (Windows) to bind each proxy process to a specific device interface, preventing any cross-device routing.
      </P>
      <SubHeading>Proxy Process Model</SubHeading>
      <P>
        Each device spawns an isolated proxy process listening on its assigned HTTP and SOCKS5 ports. Authentication is enforced at the proxy process level with per-user credentials. Credential rotation is handled atomically — new credentials are active before old ones are invalidated.
      </P>
      <SubHeading>IP Rotation Flow</SubHeading>
      <ol className="list-decimal list-inside space-y-2 text-zinc-400 text-sm mb-4 ml-2">
        <li>Rotation request received (dashboard, timer, or API call)</li>
        <li>Device daemon sends AT command or ADB command to the modem/phone to drop and re-establish the data connection</li>
        <li>New carrier IP assigned by DHCP from the carrier network</li>
        <li>Proxy process rebinds to new interface IP</li>
        <li>Rotation event logged with timestamp, old IP, and new IP</li>
        <li>Webhook fired (if configured) with rotation payload</li>
      </ol>
      <SubHeading>Data Model</SubHeading>
      <Table
        headers={["Collection", "Key Fields", "Purpose"]}
        rows={[
          ["users",         "clerkUserId, email, stripeCustomerId",                      "User identity and billing link"],
          ["subscriptions", "userId, plan, status, stripeSubscriptionId, billingPeriod", "Active proxy subscriptions"],
          ["proxies",       "userId, host, httpPort, socks5Port, username, password, status", "Assigned proxy credentials"],
          ["softwarelicenses", "userId, plan, licenseKey, downloadToken, billingCycle",  "Software license records"],
        ]}
      />
      <SubHeading>Authentication Flow</SubHeading>
      <P>
        All web requests are authenticated via Clerk JWTs. API routes validate the JWT on every request using the Clerk SDK. Stripe webhooks are verified using HMAC-SHA256 signature validation against <code className="bg-zinc-800 text-amber-300 px-1.5 py-0.5 rounded text-xs">STRIPE_WEBHOOK_SECRET</code> before any database writes occur.
      </P>
    </>
  );
}

function Security() {
  return (
    <>
      <SectionHeading>Security & Compliance</SectionHeading>
      <SubHeading>Data Security</SubHeading>
      <Ul items={[
        "All data in transit encrypted via TLS 1.2+ (enforced at Vercel edge and MongoDB Atlas)",
        "MongoDB Atlas encrypts all data at rest using AES-256",
        "Proxy credentials are stored hashed — plaintext passwords never persisted after provisioning",
        "Clerk handles all authentication — ProXiFi never stores plaintext passwords",
        "Stripe handles all payment data — ProXiFi is never in scope for PCI-DSS cardholder data",
      ]} />
      <SubHeading>Payment Compliance</SubHeading>
      <P>
        All payment processing is delegated to Stripe, a PCI-DSS Level 1 certified payment processor.
        ProXiFi&apos;s Stripe integration uses Stripe Checkout (hosted payment page) to ensure cardholder
        data never touches ProXiFi servers. Webhook authenticity is verified via Stripe&apos;s HMAC
        signature before processing any event.
      </P>
      <SubHeading>Access Control</SubHeading>
      <Ul items={[
        "Role-based access: users can only access their own proxies and licenses",
        "All API routes protected by Clerk authentication middleware",
        "Stripe customer isolation — users can only modify their own subscriptions",
        "Proxy Manager user accounts support per-device permission assignment",
      ]} />
      <SubHeading>Infrastructure Security</SubHeading>
      <Ul items={[
        "Device servers are not publicly addressable — only inbound proxy ports are exposed",
        "Admin control plane requires VPN or SSH tunnel access",
        "Automated dependency scanning via GitHub Dependabot",
        "Environment secrets managed via Vercel encrypted environment variables",
      ]} />
    </>
  );
}

function SLA() {
  return (
    <>
      <SectionHeading>SLA</SectionHeading>
      <P>
        ProXiFi commits to the following service level targets for the hosted proxy service. These targets
        apply to the proxy availability and management dashboard uptime.
      </P>
      <Table
        headers={["Plan", "Uptime Target", "Support Response", "Rotation Guarantee"]}
        rows={[
          ["Starter",  "99.0%", "48 hours (email)",      "Best effort"],
          ["Growth",   "99.2%", "24 hours (email)",      "Best effort"],
          ["Standard", "99.5%", "12 hours (email)",      "< 60 seconds"],
          ["Premium",  "99.9%", "4 hours (priority)",    "< 30 seconds"],
        ]}
      />
      <SubHeading>Exclusions</SubHeading>
      <P>
        SLA commitments do not apply to downtime caused by: scheduled maintenance (announced 48 hours in
        advance), carrier network outages outside ProXiFi&apos;s control, force majeure events, or customer
        misconfiguration.
      </P>
      <SubHeading>Credits</SubHeading>
      <P>
        If uptime falls below the committed target in any calendar month, affected customers are eligible
        for a pro-rated service credit applied to the following billing cycle. Credits must be requested
        within 30 days of the incident via support@proxifi.net.
      </P>
    </>
  );
}

function GettingStarted() {
  return (
    <>
      <SectionHeading>Getting Started</SectionHeading>
      <SubHeading>Hosted Proxy Service</SubHeading>
      <ol className="list-decimal list-inside space-y-3 text-zinc-400 text-sm mb-6 ml-2">
        <li>Create an account at <span className="text-amber-400">proxifi.net/sign-up</span></li>
        <li>Navigate to Dashboard → Plans and select your plan</li>
        <li>Complete checkout via Stripe (card payment)</li>
        <li>Your proxy credentials appear in Dashboard → ProXiFi within seconds of payment confirmation</li>
        <li>Copy your <code className="bg-zinc-800 text-amber-300 px-1 rounded text-xs">host:port:username:password</code> into your tool of choice</li>
        <li>Use Dashboard → ProXiFi to rotate your IP on demand</li>
      </ol>
      <SubHeading>Proxy Manager Software</SubHeading>
      <ol className="list-decimal list-inside space-y-3 text-zinc-400 text-sm mb-6 ml-2">
        <li>Purchase at <span className="text-amber-400">proxifi.net/proxy-manager</span></li>
        <li>Receive your license key and download link by email</li>
        <li>Run the installer on your Windows or Linux server</li>
        <li>Connect USB LTE modems or Android phones via USB</li>
        <li>Open the web dashboard (default: <code className="bg-zinc-800 text-amber-300 px-1 rounded text-xs">http://localhost:8080</code>)</li>
        <li>Devices appear automatically — proxies are live within 30 seconds of connection</li>
      </ol>
      <SubHeading>Connecting to Your Tools</SubHeading>
      <Table
        headers={["Tool", "Setting", "Value"]}
        rows={[
          ["AdsPower / MultiLogin",  "Proxy type",   "HTTP or SOCKS5"],
          ["AdsPower / MultiLogin",  "Host",         "Your proxy host"],
          ["AdsPower / MultiLogin",  "Port",         "Your assigned port"],
          ["AdsPower / MultiLogin",  "Username",     "Your proxy username"],
          ["AdsPower / MultiLogin",  "Password",     "Your proxy password"],
          ["Puppeteer / Playwright", "args",         "--proxy-server=http://user:pass@host:port"],
        ]}
      />
    </>
  );
}

function Pricing() {
  return (
    <>
      <SectionHeading>Plans & Pricing</SectionHeading>
      <SubHeading>Hosted Proxy Service</SubHeading>
      <Table
        headers={["Plan", "Price", "Type", "Users", "Data", "API Access"]}
        rows={[
          ["Starter",  "$55/mo",  "Shared",    "1–3", "5GB",       "Not included"],
          ["Growth",   "$70/mo",  "Shared",    "1–2", "15GB",      "Not included"],
          ["Standard", "$90/mo",  "Dedicated", "1",   "Unlimited", "Included"],
          ["Premium",  "$105/mo", "Dedicated", "1",   "Unlimited", "Included + Priority"],
        ]}
      />
      <SubHeading>Proxy Manager Software</SubHeading>
      <Table
        headers={["Product", "Price", "License", "Devices", "Updates"]}
        rows={[
          ["ProXiFi Proxy Manager", "$1,500", "Lifetime", "Unlimited", "12 months free"],
        ]}
      />
      <SubHeading>All Plans Include</SubHeading>
      <Ul items={[
        "HTTP and SOCKS5 proxy support",
        "Dashboard access and real-time monitoring",
        "Auto IP rotation capabilities",
        "Cancel any time (subscriptions)",
        "Secure checkout via Stripe",
      ]} />
      <P>
        All prices are in USD. Subscriptions are billed monthly and can be canceled at any time from
        Dashboard → Billing. The Proxy Manager is a one-time purchase with no recurring fees.
      </P>
    </>
  );
}

function DevelopersAPI() {
  return (
    <>
      <SectionHeading>Developers and API Access</SectionHeading>
      <P>
        ProXiFi exposes a REST API for proxy management, IP rotation, and account operations.
        API access is available on Standard and Premium plans for the hosted service, and included
        with all Proxy Manager software licenses.
      </P>
      <SubHeading>Authentication</SubHeading>
      <P>
        All API requests require a Bearer token in the Authorization header. Tokens are generated
        from Dashboard → API Keys (coming Q3 2026). During beta, API access is via session cookie
        on authenticated dashboard routes.
      </P>
      <SubHeading>Base URL</SubHeading>
      <div className="bg-zinc-900 rounded-xl p-4 mb-6 font-mono text-sm text-amber-300 border border-zinc-700">
        https://proxifi.net/api
      </div>
      <SubHeading>Endpoints</SubHeading>
      <Table
        headers={["Method", "Endpoint", "Description"]}
        rows={[
          ["GET",  "/proxies",                       "List all proxies for the authenticated user"],
          ["POST", "/proxies/[proxyId]/rotate",      "Trigger an IP rotation for a specific proxy"],
          ["GET",  "/subscription",                  "Get the current proxy subscription details"],
          ["POST", "/stripe/checkout",               "Create a Stripe checkout session for a proxy plan"],
          ["POST", "/stripe/portal",                 "Open the Stripe billing portal for subscription management"],
          ["POST", "/software/checkout",             "Create a checkout session for a software license"],
          ["GET",  "/software/license",              "List all software licenses for the authenticated user"],
          ["POST", "/proxy-manager/checkout",        "Create a checkout session for the Proxy Manager software"],
        ]}
      />
      <SubHeading>Example — Rotate a Proxy</SubHeading>
      <div className="bg-zinc-900 rounded-xl p-4 mb-6 font-mono text-sm text-zinc-300 border border-zinc-700 overflow-x-auto">
        <span className="text-amber-400">POST</span> /api/proxies/proxy_abc123/rotate<br />
        <span className="text-zinc-500">Authorization: Bearer &lt;token&gt;</span><br />
        <br />
        <span className="text-green-400">{"// Response"}</span><br />
        {"{"}<br />
        {"  "}<span className="text-blue-300">&quot;success&quot;</span>{": true,"}<br />
        {"  "}<span className="text-blue-300">&quot;newIp&quot;</span>{": "}<span className="text-amber-300">&quot;104.28.xx.xx&quot;</span><br />
        {"}"}
      </div>
      <SubHeading>Rate Limits</SubHeading>
      <Table
        headers={["Plan", "Requests / minute", "Rotation calls / hour"]}
        rows={[
          ["Standard", "60",  "120"],
          ["Premium",  "300", "Unlimited"],
        ]}
      />
    </>
  );
}

function TermsOfService() {
  return (
    <>
      <SectionHeading>Terms of Service</SectionHeading>
      <P>
        Last updated: March 2026. By accessing or using ProXiFi services you agree to these terms.
        If you do not agree, do not use the service.
      </P>
      <SubHeading>1. Acceptable Use</SubHeading>
      <P>
        ProXiFi services may only be used for lawful purposes. You may not use ProXiFi to:
      </P>
      <Ul items={[
        "Violate any applicable local, state, national, or international law or regulation",
        "Conduct unauthorized access or attacks against any system, network, or device",
        "Send unsolicited bulk email (spam) or engage in phishing campaigns",
        "Scrape or harvest personal data in violation of GDPR, CCPA, or other privacy laws",
        "Engage in fraud, identity theft, or impersonation",
        "Circumvent security measures of systems you do not own or have authorization to access",
      ]} />
      <SubHeading>2. Account Responsibilities</SubHeading>
      <P>
        You are responsible for all activity that occurs under your account. You must maintain the
        confidentiality of your credentials and notify ProXiFi immediately of any unauthorized use
        at support@proxifi.net.
      </P>
      <SubHeading>3. Payment & Refunds</SubHeading>
      <P>
        Subscription fees are billed monthly in advance and are non-refundable except as required
        by law. One-time software licenses are non-refundable after the download link has been
        accessed. ProXiFi reserves the right to modify pricing with 30 days notice to active subscribers.
      </P>
      <SubHeading>4. Service Availability</SubHeading>
      <P>
        ProXiFi provides the service on an &ldquo;as is&rdquo; basis. We do not guarantee uninterrupted or
        error-free service. SLA credits, where applicable, represent the sole remedy for downtime.
      </P>
      <SubHeading>5. Termination</SubHeading>
      <P>
        ProXiFi reserves the right to suspend or terminate accounts that violate these terms without
        prior notice. Upon termination, your right to access the service ceases immediately. No
        refunds will be issued for terminated accounts.
      </P>
      <SubHeading>6. Limitation of Liability</SubHeading>
      <P>
        To the maximum extent permitted by law, ProXiFi&apos;s total liability for any claim arising
        from use of the service shall not exceed the amount paid by you in the 30 days preceding
        the claim. ProXiFi is not liable for indirect, incidental, or consequential damages.
      </P>
      <SubHeading>7. Governing Law</SubHeading>
      <P>
        These terms are governed by the laws of the United States. Disputes shall be resolved by
        binding arbitration in accordance with the AAA Commercial Arbitration Rules.
      </P>
      <SubHeading>8. Contact</SubHeading>
      <P>
        For questions regarding these terms, contact us at{" "}
        <a href="mailto:support@proxifi.net" className="text-amber-400 hover:underline">support@proxifi.net</a>.
      </P>
    </>
  );
}

// ─── Section content map ─────────────────────────────────────────────────────

const SECTION_CONTENT: Record<string, React.ReactNode> = {
  "introduction":     <Introduction />,
  "what-is-proxifi":  <WhatIsProXiFi />,
  "problem-solution": <ProblemSolution />,
  "use-cases":        <UseCases />,
  "roadmap":          <Roadmap />,
  "financials":       <Financials />,
  "technicals":       <Technicals />,
  "core-features":    <CoreFeatures />,
  "technical-design": <TechnicalDesign />,
  "security":         <Security />,
  "sla":              <SLA />,
  "getting-started":  <GettingStarted />,
  "pricing":          <Pricing />,
  "api":              <DevelopersAPI />,
  "tos":              <TermsOfService />,
};

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* ── Mobile top bar ───────────────────────────────────────── */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-black border-b border-zinc-800">
        <span className="text-amber-400 font-bold text-sm">ProXiFi Docs</span>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="text-zinc-400 hover:text-white"
        >
          {mobileOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
        </button>
      </div>

      {/* ── Mobile sidebar overlay ───────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-sm pt-14 overflow-y-auto">
          <nav className="px-4 py-4 space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  activeSection === s.id
                    ? "bg-amber-900/40 text-amber-300 font-semibold"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <span className="shrink-0 opacity-70">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="flex flex-1 max-w-7xl mx-auto w-full">

        {/* ── Desktop sidebar ──────────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-zinc-800 pt-8 pb-6 px-4">
          <div className="mb-6 px-3">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-1">Documentation</p>
            <p className="text-amber-400 font-bold text-base">ProXiFi</p>
          </div>
          <nav className="space-y-0.5 flex-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  activeSection === s.id
                    ? "bg-amber-900/40 text-amber-300 font-semibold border-l-2 border-amber-500 rounded-l-none"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <span className="shrink-0 opacity-70">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 px-3 pt-4 border-t border-zinc-800">
            <p className="text-xs text-zinc-600">ProXiFi © {new Date().getFullYear()}</p>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-10 lg:py-14 overflow-y-auto">
          {SECTIONS.map(({ id }) => (
            <section
              key={id}
              id={id}
              ref={(el) => { sectionRefs.current[id] = el; }}
              className="mb-20 scroll-mt-6"
            >
              {SECTION_CONTENT[id]}
            </section>
          ))}
        </main>

      </div>
    </div>
  );
}
