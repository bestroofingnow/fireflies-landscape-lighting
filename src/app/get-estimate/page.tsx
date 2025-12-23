"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Check,
  Shield,
  Award,
  Moon,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { company } from "@/data/company";
import { cities } from "@/data/cities";

export default function GetEstimatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    message: "",
    services: [] as string[],
    preferredContact: "phone",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would send this to your backend
    console.log("Form submitted:", formData);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-muted-foreground mb-8">
              We&apos;ve received your request for a free estimate. One of our
              team members will contact you within 24 hours to schedule your
              consultation.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Need to reach us sooner?
              </p>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${company.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {company.phoneDisplay}
                </a>
              </Button>
            </div>
            <div className="mt-8">
              <Link href="/" className="text-primary hover:underline">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-card py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Get Your <span className="text-primary">Free Estimate</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Fill out the form below and we&apos;ll contact you within 24 hours
              to schedule your free consultation and nighttime demonstration.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Contact Information
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Info */}
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Property Information
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="address">Property Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <select
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Select your city</option>
                        {cities.map((city) => (
                          <option key={city.slug} value={city.name}>
                            {city.name}, {city.stateAbbr}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Contact Method</Label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === "phone"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                preferredContact: e.target.value,
                              })
                            }
                            className="text-primary"
                          />
                          <span className="text-sm">Phone</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === "email"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                preferredContact: e.target.value,
                              })
                            }
                            className="text-primary"
                          />
                          <span className="text-sm">Email</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Services Interested In
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Architectural Uplighting",
                      "Path & Walkway Lighting",
                      "Garden & Plant Lighting",
                      "Outdoor Living Lighting",
                      "Security Lighting",
                      "Complete Lighting Package",
                    ].map((service) => (
                      <label
                        key={service}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                          formData.services.includes(service)
                            ? "border-primary bg-primary/10"
                            : "border-border bg-background hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                          className="sr-only"
                        />
                        <div
                          className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                            formData.services.includes(service)
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {formData.services.includes(service) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Tell Us About Your Project (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Describe your outdoor space and what you're hoping to achieve with landscape lighting..."
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full glow-firefly-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Free Estimate
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to be contacted by
                  Fireflies Landscape Lighting regarding your estimate request.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Value Props */}
              <div className="rounded-2xl bg-background p-6 border border-border">
                <h3 className="font-bold text-foreground mb-4">
                  What&apos;s Included
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Check,
                      title: "Free Consultation",
                      desc: "Professional site assessment",
                    },
                    {
                      icon: Moon,
                      title: "Nighttime Demo",
                      desc: "See the lighting before you commit",
                    },
                    {
                      icon: Award,
                      title: "Custom Design",
                      desc: "Tailored to your home",
                    },
                    {
                      icon: Shield,
                      title: "Lifetime Warranty",
                      desc: "We stand behind our work",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call CTA */}
              <div className="rounded-2xl bg-primary/10 p-6 border border-primary/20 text-center">
                <h3 className="font-bold text-foreground mb-2">
                  Prefer to Call?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak directly with our team
                </p>
                <a
                  href={`tel:${company.phone}`}
                  className="inline-flex items-center gap-2 text-xl font-bold text-primary"
                >
                  <Phone className="h-5 w-5" />
                  {company.phoneDisplay}
                </a>
                <p className="text-xs text-muted-foreground mt-2">
                  Mon-Sat 8am-8pm
                </p>
              </div>

              {/* Visualizer CTA */}
              <div className="rounded-2xl bg-background p-6 border border-border">
                <h3 className="font-bold text-foreground mb-2">
                  Try Our AI Visualizer
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a photo of your home and see how lighting will
                  transform it!
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/visualizer">Try the Visualizer</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
