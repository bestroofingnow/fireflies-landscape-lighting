import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Wrench, Zap, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Professional Installation",
  description:
    "Expert landscape lighting installation by trained technicians. Clean, hidden wiring, premium fixtures, and lifetime warranty. Serving Lake Norman and York County.",
};

const installationFeatures = [
  {
    icon: Wrench,
    title: "Expert Installation",
    description:
      "Our trained technicians install every fixture with precision and attention to detail.",
  },
  {
    icon: Zap,
    title: "Premium LED Fixtures",
    description:
      "We use only high-quality, energy-efficient LED fixtures built to last.",
  },
  {
    icon: Clock,
    title: "Timely Completion",
    description:
      "Most installations are completed in 1-2 days with minimal disruption to your routine.",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description:
      "We stand behind our work with a comprehensive lifetime warranty on installation.",
  },
];

const installationProcess = [
  {
    title: "Pre-Installation Prep",
    items: [
      "Review final design and fixture placement",
      "Mark utility lines and irrigation systems",
      "Prepare all fixtures and materials",
      "Coordinate installation timeline",
    ],
  },
  {
    title: "Installation Day",
    items: [
      "Position and install all fixtures",
      "Route wiring underground (hidden from view)",
      "Install transformer and controls",
      "Connect and test all components",
    ],
  },
  {
    title: "Final Touches",
    items: [
      "Aim and adjust all fixtures",
      "Program timers and smart controls",
      "Complete walkthrough with homeowner",
      "Clean up work area thoroughly",
    ],
  },
];

export default function InstallationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-card py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/sb38qzydzbfdynullyzs.webp"
            alt="Professional lighting installation"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-card" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/services"
              className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block"
            >
              &larr; Back to Services
            </Link>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Professional <span className="text-primary">Installation</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Expert installation by trained technicians who take pride in their
              work. Clean, hidden wiring and meticulous attention to every
              detail.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="glow-firefly-sm">
                <Link href="/get-estimate">
                  Schedule Your Installation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Features */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {installationFeatures.map((feature) => (
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

      {/* Installation Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Our Installation <span className="text-primary">Process</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A methodical approach ensures your installation is completed
              efficiently and to the highest standards.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {installationProcess.map((phase, index) => (
              <div
                key={phase.title}
                className="rounded-xl bg-card p-6 border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {phase.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">
                Our Quality <span className="text-primary">Promise</span>
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Hidden Wiring",
                  desc: "All wiring is carefully buried underground, completely hidden from view. We take care to avoid existing irrigation and utility lines.",
                },
                {
                  title: "Premium Components",
                  desc: "We use only commercial-grade transformers, high-quality LED fixtures, and durable wire connections built to last.",
                },
                {
                  title: "Clean Worksite",
                  desc: "We treat your property with respect. When we leave, you'll never know we were there (except for the beautiful lighting!).",
                },
                {
                  title: "Lifetime Warranty",
                  desc: "Our comprehensive warranty covers our workmanship for life. If something goes wrong with the installation, we'll fix it at no cost.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl bg-background p-6"
                >
                  <Check className="h-6 w-6 shrink-0 text-primary" />
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

      <CTA
        title="Ready for Professional Installation?"
        subtitle="Let our expert team bring your lighting design to life."
      />
    </>
  );
}
