import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProXiFi Software — Proxy Management Plans",
  description:
    "ProXiFi proxy management software plans — Starter (free), Basic, Premium & Business. Auto proxy generation, IP rotation, Android device management & more.",
  openGraph: {
    title: "ProXiFi Software Plans",
    description:
      "Proxy management software from free to enterprise. Auto proxy generation, rotation, Android device management.",
  },
};

export default function SoftwareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
