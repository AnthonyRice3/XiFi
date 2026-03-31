import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/proxy-manager" },
  title: "Proxy Manager — Self-Hosted Software",
  description:
    "Run your own mobile proxy operation with ProXiFi Proxy Manager. Turn USB LTE modems into a managed proxy pool with IP rotation, API access & multi-user controls. One-time purchase.",
  openGraph: {
    title: "ProXiFi Proxy Manager — Self-Hosted Mobile Proxy Software",
    description:
      "Self-hosted proxy management software. IP rotation, API access, multi-user controls. One-time $1,500 purchase.",
  },
};

export default function ProxyManagerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
