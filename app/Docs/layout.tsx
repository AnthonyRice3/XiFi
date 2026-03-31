import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/Docs" },
  title: "Documentation",
  description:
    "ProXiFi documentation — setup guides, API reference, integration tutorials for Puppeteer, Playwright, AdsPower & more. Everything you need to get started with mobile proxies.",
  openGraph: {
    title: "ProXiFi Docs",
    description:
      "Setup guides, API reference & integration tutorials for ProXiFi mobile proxies.",
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
