import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your ProXiFi account to get started with real 4G/5G mobile proxies, auto IP rotation, and developer-first tools.",
  robots: { index: false, follow: false },
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
