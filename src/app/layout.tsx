import type { Metadata, Viewport } from "next";
import { Cinzel, EB_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/content";
import ThemeProvider from "@/components/ThemeProvider";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — The Wizard's Portfolio`,
  description: profile.tagline,
  keywords: [
    profile.name,
    "Portfolio",
    "AI Engineer",
    "Software Engineer",
    "Machine Learning",
    "ASU",
    "Arizona State University",
    "Computer Science",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — The Wizard's Portfolio`,
    description: profile.tagline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — The Wizard's Portfolio`,
    description: profile.tagline,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${garamond.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
