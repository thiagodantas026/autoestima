import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { brand } from "@/components/autoestima/data";
import "./globals.css";

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

/* Domínio onde a página fica publicada, para os links partilhados (WhatsApp,
   Instagram) mostrarem a imagem e o título certos: GitHub Pages com
   GITHUB_PAGES=1, senão o domínio de produção que a Vercel passa ao build. */
const pages = process.env.GITHUB_PAGES === "1";
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = pages
  ? "https://thiagodantas026.github.io"
  : host
    ? `https://${host}`
    : "https://autoestima.vercel.app";
const pagePath = pages ? "/autoestima/" : "/";

/* Pré-visualização para a cliente aprovar: fora do Google até mudar para false */
const PREVIEW = true;

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
