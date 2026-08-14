// app/layout.tsx
import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tremonte.info"), // CHANGE THIS if your domain is different
  title: {
    default: "Tremonte.info",
    template: "%s | Tremonte.info",
  },
  description: "Your blog description goes here.", // CHANGE THIS
  openGraph: {
    title: "Tremonte.info",
    description: "Web development, systems design, and the art of debugging. Notes, guides, and deep dives from a developer building thoughtful software.",
    url: "https://tremonte.info",
    siteName: "Tremonte.info",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tremonte.info",
    description: "Web development, systems design, and the art of debugging. Notes, guides, and deep dives from a developer building thoughtful software.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(fraunces.variable, plexMono.variable, plexSans.variable)}>
      <body className="bg-background text-foreground font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}