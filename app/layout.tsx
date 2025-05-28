import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Nav } from "@/components/Nav";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProxiFi",
  description: "ProxiFi Home",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          
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
