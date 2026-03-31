import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../Providers";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | ProXiFi Dashboard",
  },
  description: "Manage your ProXiFi mobile proxies, subscriptions, and support tickets from your dashboard.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DashboardSidebar>
            {children}
          </DashboardSidebar>
        </Providers>
      </body>
    </html>
  );
}
