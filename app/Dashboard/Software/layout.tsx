import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Licenses",
};

export default function SoftwareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
