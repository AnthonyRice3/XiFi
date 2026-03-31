import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started — Join the Closed Beta",
  description:
    "ProXiFi is in closed beta. Join the waitlist to get priority access to real 4G/5G mobile proxies with auto IP rotation, anti-detection, and developer-first APIs.",
  openGraph: {
    title: "Get Started with ProXiFi — Closed Beta",
    description:
      "Join the ProXiFi waitlist. Priority access, early-bird pricing, and direct support from the founding team.",
  },
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
