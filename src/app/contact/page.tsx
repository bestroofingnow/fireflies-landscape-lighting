import { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Fireflies Landscape Lighting for a free estimate. Serving Lake Norman NC and York County SC. Call (803) 889-0096 or email us today.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Ready to transform your outdoor space? We&apos;d love to hear from
              you. Reach out for a free consultation and estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Phone */}
            <a
              href={`tel:${company.phone}`}
              className="group rounded-xl bg-background p-6 text-center hover:bg-muted transition-colors"
            >
              <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
              <p className="text-primary font-medium">{company.phoneDisplay}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Mon-Sat 8am-8pm
              </p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${company.email}`}
              className="group rounded-xl bg-background p-6 text-center hover:bg-muted transition-colors"
            >
              <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
              <p className="text-primary font-medium break-all text-sm">
                {company.email}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                We respond within 24 hours
              </p>
            </a>

            {/* Locations */}
            <div className="rounded-xl bg-background p-6 text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Service Areas
              </h3>
              <p className="text-sm text-muted-foreground">
                Lake Norman, NC
                <br />
                York County, SC
              </p>
            </div>

            {/* Hours */}
            <div className="rounded-xl bg-background p-6 text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Business Hours
              </h3>
              <p className="text-sm text-muted-foreground">
                Mon-Sat: {company.hours.weekdays}
                <br />
                Sun: {company.hours.sunday}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Contact Form CTA */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Request Your <span className="text-primary">Free Estimate</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Ready to transform your outdoor space? Fill out our estimate
                request form and we&apos;ll get back to you within 24 hours to
                schedule your free consultation.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Free, no-obligation estimate",
                  "Professional design consultation",
                  "Free nighttime demonstration",
                  "Flexible scheduling available",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" asChild className="glow-firefly-sm">
                <Link href="/get-estimate">
                  Get Your Free Estimate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Right: Direct Contact */}
            <div className="rounded-2xl bg-card p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Prefer to Reach Out Directly?
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Give Us a Call
                  </h4>
                  <a
                    href={`tel:${company.phone}`}
                    className="inline-flex items-center gap-2 text-lg text-primary hover:underline"
                  >
                    <Phone className="h-5 w-5" />
                    {company.phoneDisplay}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Available Monday-Saturday, 8am-8pm
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Send an Email
                  </h4>
                  <a
                    href={`mailto:${company.email}`}
                    className="inline-flex items-center gap-2 text-primary hover:underline break-all"
                  >
                    <Mail className="h-5 w-5 shrink-0" />
                    {company.email}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    We respond within 24 hours
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Follow Us
                  </h4>
                  <a
                    href={company.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <Facebook className="h-5 w-5" />
                    Facebook
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    See our latest projects and updates
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-2">
                    Office Locations
                  </h4>
                  {company.addresses.map((addr, i) => (
                    <p key={i} className="text-sm text-muted-foreground mb-2">
                      {addr.street && `${addr.street}, `}
                      {addr.city}, {addr.state} {addr.zip}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Our <span className="text-primary">Service Area</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Proudly serving Lake Norman and York County communities
            </p>
          </div>
          <div className="aspect-video max-w-4xl mx-auto rounded-2xl bg-muted flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 text-primary/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Map coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
