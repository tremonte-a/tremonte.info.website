import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PageTransition from '@/components/page-transition'; 
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Self-hosted font files (see app/fonts/) — avoids fetching from Google Fonts
// at build time, which fails in network-restricted CI/container environments.
const fraunces = localFont({
  variable: "--font-fraunces",
  display: "swap",
  src: [
    {
      path: "./fonts/fraunces-variable.woff2",
      weight: "400 600",
      style: "normal",
    },
    {
      path: "./fonts/fraunces-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
});

const plexMono = localFont({
  variable: "--font-plex-mono",
  display: "swap",
  src: [
    { path: "./fonts/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
});

const plexSans = localFont({
  variable: "--font-plex-sans",
  display: "swap",
  src: [
    {
      path: "./fonts/ibm-plex-sans-variable.woff2",
      weight: "400 600",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Angelo Tremonte — Training, Tech Support, Automation & Production",
  description:
    "30 years of hands-on technical expertise. Training, tech support, data analytics & automation, video and audio production for small businesses and nonprofits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexMono.variable} ${plexSans.variable}`}>
      <body className="relative min-h-screen bg-paper text-ink antialiased">
        <div className="bg-grain bg-noise" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
			<PageTransition>{children}</PageTransition>
		  </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
