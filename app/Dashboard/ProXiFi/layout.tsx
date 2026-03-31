import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Proxies",
};

export default function ProXiFiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
