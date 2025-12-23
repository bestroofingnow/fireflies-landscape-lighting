import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { FireflyCursor } from "@/components/FireflyCursor";
import { FloatingContactButton } from "@/components/ui/FloatingContactButton";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fireflieslandscapelighting.com"),
  title: {
    default: "Fireflies Landscape Lighting | Lake Norman & Charlotte Area",
    template: "%s | Fireflies Landscape Lighting",
  },
  description:
    "Professional landscape lighting design and installation in the Lake Norman area and York County. 10+ years experience, lifetime warranty, and free estimates. Call (803) 889-0096.",
  keywords: [
    "landscape lighting",
    "outdoor lighting",
    "landscape lighting design",
    "lighting installation",
    "Lake Norman",
    "Charlotte NC",
    "Mooresville NC",
    "Lake Wylie SC",
    "Fort Mill SC",
    "Rock Hill SC",
  ],
  authors: [{ name: "Fireflies Landscape Lighting" }],
  creator: "Fireflies Landscape Lighting",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fireflieslandscapelighting.com",
    siteName: "Fireflies Landscape Lighting",
    title: "Fireflies Landscape Lighting | Lake Norman & Charlotte Area",
    description:
      "Professional landscape lighting design and installation. 10+ years experience, lifetime warranty, and free estimates.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fireflies Landscape Lighting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fireflies Landscape Lighting | Lake Norman & Charlotte Area",
    description:
      "Professional landscape lighting design and installation. 10+ years experience, lifetime warranty, and free estimates.",
    images: ["/og-image.jpg"],
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
  verification: {
    // Add verification tokens when available
    // google: "verification-token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <FireflyCursor />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingContactButton />
      </body>
    </html>
  );
}
