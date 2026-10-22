import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { brand } from "@/components/autoestima/data";
import { homePath, hosting, siteUrl } from "@/lib/site";
import "./globals.css";
import "@/components/autoestima/autoestima.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--ae-serif",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--ae-sans",
});

const pagePath = homePath;

/* Só o site real (autoestimahairbody.pt) aparece no Google; as
   pré-visualizações (GitHub Pages, Vercel) ficam de fora para não duplicar */
const PREVIEW = !hosting;

const title = "Autoestima Hair & Body · Salão de beleza em Odivelas e Pontinha";
const description =
  "O espaço onde a sua beleza se destaca. Cabelo, tranças africanas, estética avançada, unhas e cosméticos num só lugar, com até três profissionais a cuidar de si ao mesmo tempo.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e0c12",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: pagePath },
  openGraph: {
    type: "website",
    title,
    description,
    url: pagePath,
    siteName: brand.fullName,
    images: [{ url: "/autoestima/og.jpg", width: 1200, height: 630, alt: brand.fullName }],
    locale: "pt_PT",
  },
  twitter: { card: "summary_large_image", title, description, images: ["/autoestima/og.jpg"] },
  robots: PREVIEW ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
