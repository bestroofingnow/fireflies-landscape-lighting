import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, Quote, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Reviews & Testimonials",
  description:
    "Read reviews from our satisfied customers. See why homeowners in Lake Norman and York County trust Fireflies Landscape Lighting for their outdoor lighting needs.",
};

const reviews = [
  {
    name: "Sarah M.",
    location: "Mooresville, NC",
    rating: 5,
    date: "October 2024",
    text: "Fireflies transformed our backyard into a magical space! The team was professional, punctual, and the results exceeded our expectations. John took the time to understand exactly what we wanted and delivered perfectly. The nighttime demo was incredibly helpful - we could see exactly how everything would look before committing. Highly recommend!",
    verified: true,
  },
  {
    name: "Michael R.",
    location: "Lake Wylie, SC",
    rating: 5,
    date: "September 2024",
    text: "We've gotten so many compliments on our new landscape lighting. John and his team really know their stuff. They worked around our schedule and the installation was cleaner than we expected - you can't even see the wires. The free nighttime demo was incredibly helpful in making our decision.",
    verified: true,
  },
  {
    name: "Jennifer L.",
    location: "Charlotte, NC",
    rating: 5,
    date: "August 2024",
    text: "Best decision we made for our home's curb appeal. The lighting design they created highlights our home beautifully. Worth every penny! The team was professional from start to finish, and the lifetime warranty gives us peace of mind.",
    verified: true,
  },
  {
    name: "David & Karen H.",
    location: "Cornelius, NC",
    rating: 5,
    date: "July 2024",
    text: "As lakefront property owners, we wanted lighting that would showcase our home from the water. Fireflies delivered exactly that. The architectural uplighting makes our home stand out, and the path lighting along our dock is both beautiful and functional. Excellent work!",
    verified: true,
  },
  {
    name: "Robert T.",
    location: "Fort Mill, SC",
    rating: 5,
    date: "June 2024",
    text: "John was fantastic to work with. He listened to our ideas, made great suggestions, and the final result looks even better than we imagined. The smart controls are a great feature - love being able to adjust everything from my phone.",
    verified: true,
  },
  {
    name: "Amanda S.",
    location: "Huntersville, NC",
    rating: 5,
    date: "May 2024",
    text: "We had Fireflies install lighting for our outdoor entertaining area and couldn't be happier. The ambiance is perfect for hosting friends and family. The team was respectful of our property and cleaned up everything when they were done.",
    verified: true,
  },
  {
    name: "James W.",
    location: "Rock Hill, SC",
    rating: 4,
    date: "April 2024",
    text: "Great work overall. The team was professional and the lighting looks fantastic. Only reason for 4 stars instead of 5 is we had to reschedule once due to weather, but they were very accommodating and the final result was worth the wait.",
    verified: true,
  },
  {
    name: "Lisa P.",
    location: "Davidson, NC",
    rating: 5,
    date: "March 2024",
    text: "From the initial consultation to the final walkthrough, every step of the process was seamless. John's expertise really shows - he knew exactly how to highlight the unique features of our property. The garden lighting is stunning!",
    verified: true,
  },
];

export default function ReviewsPage() {
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-card py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/xiicxl3qu3y7mndvff1i.webp"
            alt="Beautiful landscape lighting"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-card" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Customer <span className="text-primary">Reviews</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Don&apos;t just take our word for it - hear from homeowners who
              trusted us with their landscape lighting projects.
            </p>

            {/* Rating Summary */}
            <div className="mt-8 inline-flex flex-col items-center rounded-2xl bg-card/80 backdrop-blur-sm px-8 py-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl font-bold text-foreground">
                  {avgRating.toFixed(1)}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(avgRating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">
                Based on {reviews.length}+ reviews
              </p>
              <a
                href="https://www.google.com/search?q=fireflies+landscape+lighting+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View on Google
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="relative rounded-xl bg-background p-6 border border-border"
              >
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-muted-foreground mb-4 line-clamp-6">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">
                      {review.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {review.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                    {review.verified && (
                      <p className="text-xs text-primary">Verified</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave Review CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Had a Great Experience?
            </h2>
            <p className="text-muted-foreground mb-6">
              We&apos;d love to hear about it! Your feedback helps other
              homeowners discover quality landscape lighting services.
            </p>
            <Button variant="outline" asChild>
              <a
                href="https://www.google.com/search?q=fireflies+landscape+lighting"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leave a Review on Google
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <CTA
        title="Ready to Join Our Happy Customers?"
        subtitle="Get a free estimate and experience the Fireflies difference for yourself."
      />
    </>
  );
}
