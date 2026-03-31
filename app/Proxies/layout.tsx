import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/Proxies" },
  title: "Mobile Proxy Plans & Pricing",
  description:
    "Compare ProXiFi mobile proxy plans — Starter, Growth, Standard & Premium. Shared and dedicated 4G/5G proxies with auto IP rotation. No hidden fees.",
  openGraph: {
    title: "ProXiFi Proxy Plans & Pricing",
    description:
      "Shared and dedicated 4G/5G mobile proxies starting at $55/mo. Auto IP rotation, HTTP & SOCKS5, no hidden fees.",
  },
};

export default function ProxiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
