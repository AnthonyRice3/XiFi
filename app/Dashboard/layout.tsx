import { Inter } from "next/font/google";
import { Providers } from "../Providers";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
