import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, Shield, Users, Heart, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Fireflies Landscape Lighting - a locally owned company serving the Lake Norman area and York County with over 10 years of professional landscape lighting experience.",
};

const values = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "We take pride in every installation, ensuring each project meets our high standards of quality and craftsmanship.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "Honest pricing, transparent communication, and standing behind our work with a lifetime warranty.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "As local business owners, we're committed to serving our neighbors and enhancing our community.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "We love what we do. There's nothing better than seeing a customer's face light up when they see their transformed home.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-card py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/fireflies-landscape-lighting-hero-landscape-lighting-design.webp"
            alt="Professional landscape lighting"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-card" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              About <span className="text-primary">Fireflies</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We&apos;re a locally owned landscape lighting company passionate
              about transforming outdoor spaces throughout the Lake Norman area
              and York County.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Fireflies Landscape Lighting was founded with a simple
                  mission: to help homeowners discover the magic of
                  professional outdoor lighting. Just like the fireflies that
                  light up summer evenings across the Carolinas, we believe
                  outdoor lighting should create moments of wonder and beauty.
                </p>
                <p>
                  With over 10 years of experience in landscape lighting design
                  and installation, we&apos;ve helped hundreds of families
                  transform their homes. From elegant architectural uplighting
                  to cozy patio atmospheres, every project is an opportunity to
                  create something special.
                </p>
                <p>
                  As a locally owned business, we&apos;re not just contractors
                  - we&apos;re your neighbors. We understand the unique
                  character of Lake Norman lakefront properties, the charm of
                  historic Charlotte neighborhoods, and the welcoming feel of
                  York County communities.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/fireflies-landscape-lighting-video-02.webp"
                  alt="Landscape lighting showcase"
                  fill
                  className="object-cover"
                />
                {/* Overlay with stats */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <div className="text-6xl font-bold text-primary mb-2">10+</div>
                  <div className="text-xl text-foreground font-medium">
                    Years of Experience
                  </div>
                  <div className="text-muted-foreground mt-2">
                    Serving the Carolinas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              What Sets Us <span className="text-primary">Apart</span>
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Free Nighttime Demonstrations",
                  desc: "We set up temporary lighting so you can see exactly how your home will look before making any decisions.",
                },
                {
                  title: "Lifetime Warranty",
                  desc: "We stand behind our work. Our comprehensive lifetime warranty covers our workmanship and ensures your peace of mind.",
                },
                {
                  title: "Premium LED Technology",
                  desc: "We use only the highest quality LED fixtures that are energy-efficient, long-lasting, and produce beautiful warm light.",
                },
                {
                  title: "Custom Designs",
                  desc: "No cookie-cutter solutions. Every lighting design is tailored to your home's unique architecture and your personal preferences.",
                },
                {
                  title: "Local Expertise",
                  desc: "We know the Lake Norman area and York County. We understand local architecture, climate considerations, and community aesthetics.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl bg-background p-6"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Let&apos;s <span className="text-primary">Connect</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Ready to transform your outdoor space? We&apos;d love to hear from
              you.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="glow-firefly-sm">
                <Link href="/get-estimate">
                  Get Free Estimate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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

      <CTA />
    </>
  );
}
