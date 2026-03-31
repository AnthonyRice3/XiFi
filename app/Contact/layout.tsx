import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/Contact" },
  title: "Contact & Support",
  description:
    "Get in touch with the ProXiFi team. Submit a support ticket, browse FAQs, or join our waitlist for early access to enterprise mobile proxies.",
  openGraph: {
    title: "Contact ProXiFi",
    description:
      "Submit a support ticket, browse FAQs, or join our waitlist for early access.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
