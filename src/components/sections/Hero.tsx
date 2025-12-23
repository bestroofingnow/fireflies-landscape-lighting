"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-background via-background to-card">
      {/* Background firefly particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/40"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, "-20%", "120%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{
              boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 py-20 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(company.rating.value)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {company.rating.value} stars ({company.rating.count} reviews)
              </span>
            </motion.div>

            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Transform Your Home with{" "}
                <span className="text-glow-firefly text-primary">
                  Professional Landscape Lighting
                </span>
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                Serving the Lake Norman area and York County with expert outdoor
                lighting design and installation. Free estimates and lifetime
                warranty on all work.
              </p>
            </div>

            {/* Value props */}
            <div className="flex flex-wrap gap-4">
              {["10+ Years Experience", "Lifetime Warranty", "Free Demos"].map(
                (prop) => (
                  <div
                    key={prop}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {prop}
                  </div>
                )
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="glow-firefly group">
                <Link href="/get-estimate">
                  Get Your Free Estimate
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${company.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {company.phoneDisplay}
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right content - Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/m6cxxzu262nnl7wdnkdz.webp"
                alt="Professional landscape lighting on a beautiful home at night"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

              {/* Decorative glow */}
              <div
                className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full opacity-50"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
