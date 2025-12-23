import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, getCitiesByState } from "@/data/cities";
import { company } from "@/data/company";
import { CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Fireflies Landscape Lighting serves the Lake Norman area in NC and York County in SC. View all cities we service including Charlotte, Mooresville, Lake Wylie, Fort Mill, and more.",
};

export default function ServiceAreasPage() {
  const ncCities = getCitiesByState("NC");
  const scCities = getCitiesByState("SC");

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Areas We <span className="text-primary">Serve</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Professional landscape lighting services throughout the Lake
              Norman area and York County. Local experts who know your
              neighborhood and understand the unique character of each
              community.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="glow-firefly-sm">
                <Link href="/get-estimate">Get Free Estimate</Link>
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

      {/* Cities Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* North Carolina */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    North Carolina
                  </h2>
                  <p className="text-muted-foreground">Lake Norman Area</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {ncCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/service-areas/${city.slug}`}
                    className="group flex items-center justify-between rounded-xl bg-background p-4 transition-all hover:bg-muted hover:shadow-md"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary">
                        {city.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {city.county || "NC"}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>

            {/* South Carolina */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    South Carolina
                  </h2>
                  <p className="text-muted-foreground">York County</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {scCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/service-areas/${city.slug}`}
                    className="group flex items-center justify-between rounded-xl bg-background p-4 transition-all hover:bg-muted hover:shadow-md"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary">
                        {city.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {city.county || "SC"}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Our <span className="text-primary">Coverage Area</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We proudly serve homeowners throughout the greater Charlotte
              metro area, spanning both North and South Carolina.
            </p>
          </div>
          <div className="aspect-video max-w-4xl mx-auto rounded-2xl bg-card flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 text-primary/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Interactive map coming soon
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Serving Lake Norman, Charlotte, and York County
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Ready for Beautiful Landscape Lighting?"
        subtitle="Contact us today for a free estimate. We serve all communities in the Lake Norman area and York County."
      />
    </>
  );
}
