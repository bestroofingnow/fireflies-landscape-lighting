"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlowCard, FloatingOrbs, Spotlight } from "@/components/animations";

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
    <section className="relative py-20 bg-card overflow-hidden">
      <FloatingOrbs count={5} minSize={3} maxSize={7} speed="slow" color="rgba(255, 215, 0, 0.2)" />
      <Spotlight size={250} color="rgba(255, 215, 0, 0.04)" className="top-20 left-[10%]" pulseIntensity={1.1} />
      <Spotlight size={200} color="rgba(255, 215, 0, 0.03)" className="bottom-20 right-[15%]" pulseIntensity={1.15} />

      <div className="container relative mx-auto px-4 lg:px-8">
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
            Don&apos;t just take our word for it - hear from homeowners who trusted us with their landscape lighting.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <GlowCard className="h-full p-6" glowColor="255, 215, 0" glowOpacity={0.1} glowSize={200}>
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/20" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                    >
                      <Star className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                    </motion.div>
                  ))}
                </div>

                <p className="mb-4 text-muted-foreground relative z-10">&ldquo;{testimonial.text}&rdquo;</p>

                <div className="relative z-10">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }} className="inline-block">
            <Button variant="outline" asChild>
              <Link href="/reviews">Read More Reviews</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
