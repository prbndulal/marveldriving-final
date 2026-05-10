import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Using Plus Jakarta Sans for everything
import "./globals.css";
import { clsx } from "clsx";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ScrollToTop";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marvel Driving and Transport | NDIS Transport & Driving Services Sydney",
  description: "Empowering Independence through safe, professional and supportive transport and driving services. NDIS registered provider.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={clsx(
          plusJakarta.variable, // Added variable class
          plusJakarta.className,
          "antialiased font-sans flex flex-col min-h-screen"
        )}
      >
        <AuthProvider>
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
