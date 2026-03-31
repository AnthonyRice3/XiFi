import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your ProXiFi account to manage proxies, view usage, and access your dashboard.",
  robots: { index: false, follow: false },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
