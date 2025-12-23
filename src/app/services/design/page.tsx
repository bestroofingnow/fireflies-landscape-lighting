import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Lightbulb, Palette, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Landscape Lighting Design",
  description:
    "Custom landscape lighting design services. Professional site assessment, 3D visualization, and expert design tailored to your home. Free consultations available.",
};

const designFeatures = [
  {
    icon: Lightbulb,
    title: "Professional Site Assessment",
    description:
      "We evaluate your property's architecture, landscaping, and existing features to create the perfect lighting plan.",
  },
  {
    icon: Palette,
    title: "Custom Lighting Layout",
    description:
      "Every design is tailored to your home's unique characteristics and your personal preferences.",
  },
  {
    icon: Eye,
    title: "Free Nighttime Demonstration",
    description:
      "See exactly how your lighting will look before installation with our temporary lighting setup.",
  },
  {
    icon: Sparkles,
    title: "AI Visualization",
    description:
      "Use our AI-powered tool to preview different lighting styles on your own photos.",
  },
];

const lightingTypes = [
  {
    name: "Architectural Uplighting",
    description:
      "Highlight your home's facade, columns, and architectural features with dramatic uplighting.",
  },
  {
    name: "Path & Walkway Lighting",
    description:
      "Create safe, welcoming pathways with elegant fixtures that guide visitors to your door.",
  },
  {
    name: "Garden & Accent Lighting",
    description:
      "Showcase trees, shrubs, and landscaping features with carefully positioned accent lights.",
  },
  {
    name: "Outdoor Living Lighting",
    description:
      "Transform patios, decks, and entertaining areas into inviting nighttime spaces.",
  },
  {
    name: "Security Lighting",
    description:
      "Illuminate entry points and dark areas for enhanced safety and peace of mind.",
  },
  {
    name: "Water Feature Lighting",
    description:
      "Make fountains, pools, and water features shimmer with underwater and perimeter lighting.",
  },
];

export default function DesignPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/services"
              className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block"
            >
              &larr; Back to Services
            </Link>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Landscape Lighting <span className="text-primary">Design</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Every stunning lighting installation starts with a thoughtful
              design. We create custom lighting plans that enhance your home's
              architecture and highlight its best features.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="glow-firefly-sm">
                <Link href="/get-estimate">
                  Get Free Design Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/visualizer">Try AI Visualizer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Features */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Our Design <span className="text-primary">Process</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We take a comprehensive approach to ensure your lighting design
              perfectly complements your home.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {designFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl bg-background p-6 text-center"
              >
                <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lighting Types */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Types of <span className="text-primary">Lighting</span> We Design
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              From subtle accents to dramatic statements, we offer a full range
              of lighting styles.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lightingTypes.map((type) => (
              <div
                key={type.name}
                className="rounded-xl bg-card p-6 border border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {type.name}
                </h3>
                <p className="text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">
                What&apos;s <span className="text-primary">Included</span>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Comprehensive property evaluation",
                "Custom lighting layout design",
                "Fixture selection guidance",
                "Energy usage estimates",
                "Free nighttime demonstration",
                "Detailed project proposal",
                "No-obligation consultation",
                "Design revision options",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg bg-background p-4"
                >
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Ready to Start Designing?"
        subtitle="Schedule your free design consultation and see how landscape lighting can transform your home."
      />
    </>
  );
}
