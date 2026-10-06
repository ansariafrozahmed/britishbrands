import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = process.env.SITE_URL || "https://britishbrandsly.com";
const SITE_NAME = "BRITISH BRANDS";
const OG_IMAGE =
  "https://images.nifsperfume.com/ChatGPT%20Image%20Sep%2013%2C%202026%2C%2005_51_40%20PM.jpeg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "BRITISH BRANDS — Luxury Fragrances at Honest Prices",
    template: "%s — BRITISH BRANDS",
  },

  description:
    "Discover a curated selection of luxury fragrances in Libya. Explore British Brands's collection of premier fragrance houses.",

  applicationName: SITE_NAME,

  keywords: [
    "British Brands",
    "BRITISH BRANDS",
    "perfume",
    "luxury perfume",
    "Eau de Parfum",
    "EDP",
    "long lasting perfume",
    "perfume for men",
    "perfume for women",
    "unisex perfume",
    "fragrance retailer",
    "premium perfume",
    "luxury perfume store",
    "fragrances libya",
  ],

  authors: [
    {
      name: "BRITISH BRANDS",
      url: SITE_URL,
    },
  ],

  creator: "BRITISH BRANDS",
  publisher: "BRITISH BRANDS",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,

    title: "BRITISH BRANDS — Luxury Fragrances at Honest Prices",

    description:
      "A premier fragrance retailer in Libya. Discover a curated collection of luxury perfumes and distinctive scents.",

    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "BRITISH BRANDS — Luxury Fragrances",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "BRITISH BRANDS — Luxury Fragrances at Honest Prices",

    description:
      "A premier fragrance retailer in Libya. Discover a curated collection of luxury perfumes.",

    images: [
      {
        url: OG_IMAGE,
        alt: "BRITISH BRANDS — Luxury Fragrances",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  manifest: "/site.webmanifest",

  category: "shopping",

  referrer: "origin-when-cross-origin",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
