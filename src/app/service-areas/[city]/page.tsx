import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Star,
  Award,
  Shield,
  FileText,
  Moon,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, getCityBySlug, City } from "@/data/cities";
import { company } from "@/data/company";
import { CTA } from "@/components/sections";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

// Generate static params for all city pages
export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

// Generate metadata for each city
export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: "City Not Found",
    };
  }

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `https://fireflieslandscapelighting.com/service-areas/${city.slug}`,
    },
  };
}

// FAQ data generator for each city
function getFAQs(city: City) {
  return [
    {
      question: `How much does landscape lighting cost in ${city.name}?`,
      answer: `Landscape lighting projects in ${city.name} typically range from $2,500 to $10,000+ depending on the size of your property and complexity of the design. We offer free estimates so you can get an accurate quote for your specific project.`,
    },
    {
      question: `Do you offer free estimates in ${city.name}?`,
      answer: `Yes! We provide completely free, no-obligation estimates for all ${city.name} homeowners. We'll visit your property, discuss your vision, and provide a detailed quote.`,
    },
    {
      question: `What areas near ${city.name} do you serve?`,
      answer: `In addition to ${city.name}, we serve ${city.nearbyAreas.join(", ")}, and many other communities in the ${city.stateAbbr === "NC" ? "Lake Norman area" : "York County region"}.`,
    },
    {
      question: `How long does landscape lighting installation take in ${city.name}?`,
      answer: `Most residential landscape lighting installations in ${city.name} can be completed in 1-2 days. Larger or more complex projects may take 3-5 days. We'll provide a timeline during your consultation.`,
    },
    {
      question: `Do you offer a warranty on landscape lighting in ${city.name}?`,
      answer: `Yes! We offer a lifetime warranty on all our landscape lighting installations in ${city.name}. This covers our workmanship and ensures your lighting system performs beautifully for years to come.`,
    },
    {
      question: `Can I see how the lighting will look before installation?`,
      answer: `Absolutely! We offer free nighttime demonstrations for ${city.name} homeowners. We'll set up temporary lights so you can see exactly how your landscape lighting will look before committing to the installation.`,
    },
  ];
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const faqs = getFAQs(city);

  // JSON-LD Schema for city page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Fireflies Landscape Lighting - ${city.name}`,
    description: city.metaDescription,
    url: `https://fireflieslandscapelighting.com/service-areas/${city.slug}/`,
    telephone: company.phone,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: city.state,
      },
    },
    parentOrganization: {
      "@id": "https://fireflieslandscapelighting.com/#organization",
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Landscape Lighting Installation",
        description:
          "Professional outdoor lighting design and installation services",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <ol className="flex items-center gap-2 text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/service-areas" className="hover:text-primary">
                    Service Areas
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground">{city.name}</li>
              </ol>
            </nav>

            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-primary font-medium">
                {city.name}, {city.stateAbbr}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {city.h1}
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Professional outdoor lighting design & installation in{" "}
              {city.name}, {city.state}. Transform your home with beautiful,
              energy-efficient landscape lighting from Fireflies.
            </p>

            {/* Rating badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(company.rating.value)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {company.rating.value} stars ({company.rating.count} reviews on
                Google)
              </span>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="glow-firefly-sm">
                <Link href="/get-estimate">Get Your Free Estimate</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${company.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {company.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">
            Why {city.name} Homeowners Choose{" "}
            <span className="text-primary">Fireflies</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Award,
                title: "10+ Years Experience",
                desc: "Over a decade of professional expertise",
              },
              {
                icon: Shield,
                title: "Lifetime Warranty",
                desc: "We stand behind our work",
              },
              {
                icon: FileText,
                title: "Free Estimates",
                desc: "No-obligation consultations",
              },
              {
                icon: Moon,
                title: "Free Nighttime Demos",
                desc: "See it before you commit",
              },
            ].map((prop) => (
              <div
                key={prop.title}
                className="flex items-start gap-4 rounded-xl bg-background p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <prop.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{prop.title}</h3>
                  <p className="text-sm text-muted-foreground">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-4">
            Our <span className="text-primary">Services</span> in {city.name}
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            From initial design to professional installation, we handle every
            aspect of your landscape lighting project.
          </p>
          <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {company.services.map((service) => (
              <div
                key={service.slug}
                className="rounded-xl bg-card p-6 border border-border"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/services/${service.slug}`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Serving {city.name} and{" "}
              {city.county || `${city.stateAbbr === "NC" ? "the Lake Norman Area" : "York County"}`}
            </h2>
            <p className="text-muted-foreground mb-6">
              As a locally owned and operated landscape lighting company, we
              understand the unique character of {city.name} homes and
              neighborhoods. Our team has helped homeowners throughout{" "}
              {city.county || "the area"} transform their outdoor spaces with
              professional lighting solutions.
            </p>
            <p className="text-muted-foreground">
              Whether you live in a historic home, a modern build, or a
              lakefront property, we have the expertise to create a custom
              lighting design that enhances your home&apos;s architecture and
              landscape features.
            </p>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      {city.nearbyAreas.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Also Serving Areas Near {city.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {city.nearbyAreas.map((area) => {
                const nearbyCity = cities.find((c) => c.name === area);
                return nearbyCity ? (
                  <Link
                    key={area}
                    href={`/service-areas/${nearbyCity.slug}`}
                    className="rounded-full bg-card px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    {area}, {nearbyCity.stateAbbr}
                  </Link>
                ) : (
                  <span
                    key={area}
                    className="rounded-full bg-card px-4 py-2 text-sm text-muted-foreground"
                  >
                    {area}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">
            Frequently Asked Questions About{" "}
            <span className="text-primary">Landscape Lighting</span> in{" "}
            {city.name}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-6 border border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title={`Ready to Transform Your ${city.name} Home?`}
        subtitle={`Get a free estimate and see how landscape lighting can enhance your ${city.name} property's beauty and security.`}
      />
    </>
  );
}
