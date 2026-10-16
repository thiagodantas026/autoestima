import Autoestima from "@/components/autoestima/Autoestima";
import { brand, categories, links, spaces } from "@/components/autoestima/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: brand.fullName,
  slogan: brand.slogan,
  url: links.site,
  foundingDate: String(brand.since),
  sameAs: [links.instagram],
  department: spaces.map((s) => ({
    "@type": "BeautySalon",
    name: `${brand.name} ${s.city}`,
    address: { "@type": "PostalAddress", addressLocality: s.city, addressCountry: "PT" },
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços",
    itemListElement: categories.map((c) => ({
      "@type": "OfferCatalog",
      name: c.label,
      itemListElement: c.services.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    })),
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Autoestima year={new Date().getFullYear()} />
    </>
  );
}
