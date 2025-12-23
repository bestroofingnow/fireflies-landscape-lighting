import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb, Wrench, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Professional landscape lighting design and installation services. Custom designs, expert installation, and lifetime warranty. Serving Lake Norman and York County.",
};

const additionalServices = [
  {
    title: "Holiday Lighting",
    description:
      "Professional seasonal lighting installation for a festive, hassle-free holiday display.",
  },
  {
    title: "Maintenance & Repairs",
    description:
      "Keep your lighting system performing beautifully with our maintenance packages.",
  },
  {
    title: "Smart Controls",
    description:
      "Control your lighting from your smartphone with advanced smart home integration.",
  },
  {
    title: "LED Upgrades",
    description:
      "Upgrade your existing lighting to energy-efficient, long-lasting LED technology.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              From initial design consultation to professional installation, we
              handle every aspect of your landscape lighting project with
              expertise and care.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {company.services.map((service) => {
              const Icon = service.slug === "design" ? Lightbulb : Wrench;
              return (
                <div
                  key={service.slug}
                  className="rounded-2xl bg-background p-8 border border-border"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <Check className="h-5 w-5 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full sm:w-auto">
                    <Link href={`/services/${service.slug}`}>
                      Learn More About {service.title.split(" ")[0]}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Additional <span className="text-primary">Services</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Beyond our core services, we offer a range of specialized
              solutions to meet all your outdoor lighting needs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service) => (
              <div
                key={service.title}
                className="rounded-xl bg-card p-6 border border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Our <span className="text-primary">Process</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              From first contact to finished installation, here&apos;s what you
              can expect when working with Fireflies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                step: 1,
                title: "Free Consultation",
                desc: "We visit your property, discuss your vision, and assess the best approach for your lighting design.",
              },
              {
                step: 2,
                title: "Custom Design",
                desc: "We create a tailored lighting plan that highlights your home's best features and meets your goals.",
              },
              {
                step: 3,
                title: "Nighttime Demo",
                desc: "We set up temporary lighting so you can see exactly how your property will look at night.",
              },
              {
                step: 4,
                title: "Professional Installation",
                desc: "Our expert team installs your lighting system with attention to every detail.",
              },
              {
                step: 5,
                title: "Final Walkthrough",
                desc: "We review everything together and make any adjustments to ensure your complete satisfaction.",
              },
            ].map((item, index) => (
              <div key={item.step} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  {index < 4 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
