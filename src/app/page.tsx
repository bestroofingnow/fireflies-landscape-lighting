import {
  Hero,
  ValueProps,
  Services,
  VisualizerPromo,
  Gallery,
  ServiceAreas,
  Testimonials,
  CTA,
} from "@/components/sections";
import { company } from "@/data/company";

// JSON-LD Schema for homepage
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://fireflieslandscapelighting.com/#organization",
  name: company.name,
  image: "https://fireflieslandscapelighting.com/logo.webp",
  url: "https://fireflieslandscapelighting.com",
  telephone: company.phone,
  email: company.email,
  address: company.addresses.map((addr) => ({
    "@type": "PostalAddress",
    streetAddress: addr.street || undefined,
    addressLocality: addr.city,
    addressRegion: addr.state,
    postalCode: addr.zip,
    addressCountry: "US",
  })),
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.0977,
    longitude: -81.0254,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  areaServed: [
    {
      "@type": "City",
      name: "Charlotte",
      sameAs: "https://en.wikipedia.org/wiki/Charlotte,_North_Carolina",
    },
    {
      "@type": "City",
      name: "Mooresville",
      sameAs: "https://en.wikipedia.org/wiki/Mooresville,_North_Carolina",
    },
    {
      "@type": "City",
      name: "Lake Wylie",
      sameAs: "https://en.wikipedia.org/wiki/Lake_Wylie,_South_Carolina",
    },
    {
      "@type": "City",
      name: "Fort Mill",
      sameAs: "https://en.wikipedia.org/wiki/Fort_Mill,_South_Carolina",
    },
    {
      "@type": "City",
      name: "Rock Hill",
      sameAs: "https://en.wikipedia.org/wiki/Rock_Hill,_South_Carolina",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: company.rating.value.toString(),
    reviewCount: company.rating.count.toString(),
  },
  sameAs: [company.social.facebook],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ValueProps />
      <Services />
      <VisualizerPromo />
      <Gallery />
      <ServiceAreas />
      <Testimonials />
      <CTA />
    </>
  );
}
