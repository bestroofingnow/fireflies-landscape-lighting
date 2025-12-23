import { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Get answers to common questions about landscape lighting, our services, pricing, and installation process. Fireflies Landscape Lighting - Lake Norman & York County.",
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is landscape lighting?",
        a: "Landscape lighting refers to the strategic placement of outdoor light fixtures to illuminate and enhance your property's exterior features. This includes uplighting on home facades, path lights along walkways, accent lighting for trees and gardens, and ambient lighting for outdoor living spaces.",
      },
      {
        q: "Why should I invest in landscape lighting?",
        a: "Landscape lighting offers multiple benefits: enhanced curb appeal and home value, improved safety and security, extended outdoor living hours, and the ability to highlight your property's best features. Many homeowners see it as one of the best investments they can make in their property.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve the entire Lake Norman area in North Carolina (including Charlotte, Mooresville, Cornelius, Huntersville, Davidson, and Pineville) as well as York County in South Carolina (including Lake Wylie, Fort Mill, Rock Hill, Tega Cay, and Clover).",
      },
    ],
  },
  {
    category: "Pricing & Estimates",
    questions: [
      {
        q: "How much does landscape lighting cost?",
        a: "Landscape lighting projects typically range from $2,500 to $10,000+, depending on the size of your property, the complexity of the design, and the number of fixtures required. We provide free, no-obligation estimates so you can get an accurate quote for your specific project.",
      },
      {
        q: "Do you offer financing options?",
        a: "We understand that landscape lighting is an investment. Contact us to discuss payment options that work for your budget.",
      },
      {
        q: "Are your estimates really free?",
        a: "Absolutely! We provide completely free, no-obligation estimates. We'll visit your property, discuss your vision, and provide a detailed quote with no pressure to commit.",
      },
    ],
  },
  {
    category: "Installation & Process",
    questions: [
      {
        q: "How long does installation take?",
        a: "Most residential installations can be completed in 1-2 days. Larger or more complex projects may take 3-5 days. We'll provide a timeline during your consultation so you know exactly what to expect.",
      },
      {
        q: "Do I need to be home during installation?",
        a: "While it's not required, we recommend being available at the start and end of the installation to discuss any final adjustments. We're happy to work around your schedule.",
      },
      {
        q: "Will the installation damage my landscaping?",
        a: "We take great care to minimize any disruption to your existing landscaping. Our installation techniques are designed to be as non-invasive as possible, and we always clean up thoroughly after the job.",
      },
      {
        q: "What happens if it rains during installation?",
        a: "We monitor weather conditions closely and will reschedule if necessary. Safety for our team and quality of installation always come first.",
      },
    ],
  },
  {
    category: "Products & Technology",
    questions: [
      {
        q: "What type of lights do you use?",
        a: "We exclusively use high-quality LED fixtures. LEDs are energy-efficient (using up to 80% less energy than traditional bulbs), long-lasting (typically 25,000+ hours), and produce beautiful warm light that enhances your home's appearance.",
      },
      {
        q: "Are your lights energy efficient?",
        a: "Yes! LED technology uses a fraction of the electricity of traditional lighting. Most of our installations add only $5-15 per month to your electric bill, even when running several hours each night.",
      },
      {
        q: "Can I control my lights with my phone?",
        a: "Absolutely! We offer smart control systems that allow you to control your lights from your smartphone, set schedules, and even integrate with home automation systems like Amazon Alexa or Google Home.",
      },
    ],
  },
  {
    category: "Warranty & Service",
    questions: [
      {
        q: "What warranty do you offer?",
        a: "We offer a comprehensive lifetime warranty on our workmanship. This means if anything goes wrong with the installation, we'll fix it at no cost to you. Fixture warranties vary by manufacturer but typically range from 5-15 years.",
      },
      {
        q: "What if a light stops working?",
        a: "Simply give us a call. Under our warranty, we'll come out and diagnose the issue. If it's a workmanship issue, we'll fix it for free. If a fixture needs replacement, we'll help coordinate that process.",
      },
      {
        q: "Do you offer maintenance services?",
        a: "Yes! We offer maintenance packages that include regular check-ups, bulb replacements, fixture cleaning, and timer adjustments. Contact us for details.",
      },
    ],
  },
  {
    category: "Design Process",
    questions: [
      {
        q: "What is a nighttime demonstration?",
        a: "We set up temporary lighting at your property so you can see exactly how the proposed design will look at night. This helps you visualize the final result and make any adjustments before we begin installation. It's completely free!",
      },
      {
        q: "Can I customize my lighting design?",
        a: "Absolutely! Every design is custom-tailored to your home, landscaping, and personal preferences. We work with you to create a design that highlights your property's best features and meets your specific goals.",
      },
      {
        q: "How do I know what style of lighting is right for my home?",
        a: "During your consultation, we'll assess your home's architecture, landscaping, and your personal preferences. We can show you examples of similar homes we've done and use our AI visualizer tool to give you a preview of different styles.",
      },
    ],
  },
];

// Generate JSON-LD FAQ schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((category) =>
    category.questions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.a,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Everything you need to know about landscape lighting and our
              services. Can&apos;t find your answer? Give us a call!
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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

      {/* FAQ Sections */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category) => (
              <div key={category.category}>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-background p-6 border border-border"
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {faq.q}
                      </h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Still Have <span className="text-primary">Questions</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              We&apos;re here to help! Contact us for answers to any questions
              not covered above, or to schedule your free consultation.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="glow-firefly-sm">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/get-estimate">Get Free Estimate</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
