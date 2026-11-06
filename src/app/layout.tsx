import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroThemeProvider } from "@/components/hero-theme-provider";

import { Suspense } from "react";
import ZairoLoader from "@/components/loader";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zairo International | Building Brands and Ventures",
  description:
    "Zairo International is a modern company that builds and operates brands across technology, marketing, commerce, and selective property ventures including Vacation Saga, Housing Saga, Tech Tunes, and Silken Knot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <HeroThemeProvider>
          <Header />
          <Suspense fallback={null}>
            <ZairoLoader />
          </Suspense>
          {children}
          <Footer />
        </HeroThemeProvider>
      </body>
    </html>
  );
}
