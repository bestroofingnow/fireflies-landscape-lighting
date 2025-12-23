"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Mooresville, NC",
    rating: 5,
    text: "Fireflies transformed our backyard into a magical space! The team was professional, punctual, and the results exceeded our expectations. Highly recommend!",
  },
  {
    name: "Michael R.",
    location: "Lake Wylie, SC",
    rating: 5,
    text: "We've gotten so many compliments on our new landscape lighting. John and his team really know their stuff. The free nighttime demo was incredibly helpful.",
  },
  {
    name: "Jennifer L.",
    location: "Charlotte, NC",
    rating: 5,
    text: "Best decision we made for our home's curb appeal. The lighting design they created highlights our home beautifully. Worth every penny!",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from homeowners who
            trusted us with their landscape lighting.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-xl bg-background p-6"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/20" />

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              <p className="mb-4 text-muted-foreground">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" asChild>
            <Link href="/reviews">Read More Reviews</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
