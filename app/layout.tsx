import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Nav } from "@/components/Nav";


const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://proxifi.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ProXiFi — Enterprise Mobile Proxy Platform",
    template: "%s | ProXiFi",
  },
  description:
    "Real 4G/5G mobile proxies powered by genuine SIM cards. Auto IP rotation, anti-detection, SOCKS5 & HTTP support. Built for scraping, automation, and marketing at scale.",
  keywords: [
    "mobile proxy",
    "4G proxy",
    "5G proxy",
    "residential proxy",
    "IP rotation",
    "web scraping proxy",
    "anti-detect proxy",
    "SOCKS5 proxy",
    "HTTP proxy",
    "ProXiFi",
    "proxy manager",
    "mobile IP",
  ],
  authors: [{ name: "ProXiFi" }],
  creator: "ProXiFi",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ProXiFi",
    title: "ProXiFi — Enterprise Mobile Proxy Platform",
    description:
      "Real 4G/5G mobile proxies powered by genuine SIM cards. Auto IP rotation, anti-detection, and blazing-fast speeds for scraping, automation & marketing.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ProXiFi — Enterprise Mobile Proxy Platform",
    description:
      "Real 4G/5G mobile proxies. Auto IP rotation, anti-detection & SOCKS5/HTTP. Built for serious automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "ProXiFi",
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
      description:
        "Enterprise mobile proxy platform powered by real 4G/5G SIM cards. Auto IP rotation, anti-detection, SOCKS5 & HTTP support.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      name: "ProXiFi",
      url: siteUrl,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={inter.className}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          
            <nav>
              <Nav />
            </nav>
            {children}
          
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
