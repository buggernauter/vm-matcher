import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StyledComponentsRegistry } from "@/lib/styled-components-registry";
import { getMetadataBase } from "@/server/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "WC Games",
  authors: [{ name: "WC Games" }],
  creator: "WC Games",
  description:
    "Fotbolls-VM 2026 med spelschema, svenska tider, resultat, gruppspel och slutspel.",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { type: "image/x-icon", url: "/favicon.ico" },
      { type: "image/svg+xml", url: "/icon.svg" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  metadataBase: getMetadataBase(),
  openGraph: {
    description:
      "Fotbolls-VM 2026 med spelschema, svenska tider, resultat, gruppspel och slutspel.",
    images: [
      {
        alt: "WC Games generic soccer ball social share image",
        height: 630,
        url: "/og-image.png",
        width: 1200,
      },
    ],
    locale: "sv_SE",
    siteName: "WC Games",
    title: "WC Games",
    type: "website",
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
    },
    index: true,
  },
  title: {
    default: "WC Games",
    template: "%s | WC Games",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Fotbolls-VM 2026 med spelschema, svenska tider, resultat, gruppspel och slutspel.",
    images: ["/twitter-image.png"],
    title: "WC Games",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
