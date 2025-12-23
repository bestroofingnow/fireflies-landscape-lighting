import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View our portfolio of landscape lighting projects. See how Fireflies Landscape Lighting has transformed homes throughout Lake Norman and York County.",
};

// Placeholder gallery items - in production these would come from a CMS or database
const galleryCategories = [
  {
    name: "Architectural Uplighting",
    count: 12,
    description: "Showcase your home's facade with dramatic uplighting",
  },
  {
    name: "Path & Walkway",
    count: 8,
    description: "Safe, elegant pathway illumination",
  },
  {
    name: "Garden Accents",
    count: 10,
    description: "Highlight trees, plants, and landscaping features",
  },
  {
    name: "Outdoor Living",
    count: 6,
    description: "Create ambiance for patios and entertaining spaces",
  },
  {
    name: "Lakefront Properties",
    count: 5,
    description: "Specialized lighting for Lake Norman waterfront homes",
  },
  {
    name: "Holiday Lighting",
    count: 4,
    description: "Festive seasonal lighting designs",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Our <span className="text-primary">Work</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Browse our portfolio of landscape lighting projects throughout the
              Lake Norman area and York County. Each project is custom designed
              to enhance the unique character of the home.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryCategories.map((category) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-2xl bg-muted aspect-[4/3] flex items-end"
              >
                {/* Placeholder - would be replaced with actual images */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="relative p-6 w-full">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary">
                      {category.count} projects
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Full Gallery Coming Soon
            </h2>
            <p className="text-muted-foreground mb-8">
              We&apos;re currently building out our full project gallery. In the
              meantime, check out our{" "}
              <a
                href="https://www.facebook.com/profile.php?id=100083281122004"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Facebook page
              </a>{" "}
              to see our latest work, or try our AI visualizer to see how
              lighting could transform your home.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild className="glow-firefly-sm">
                <Link href="/visualizer">
                  Try the AI Visualizer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/get-estimate">Request Free Estimate</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
