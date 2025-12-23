"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { FloatingOrbs, AmbientOrb, LightBeam, MouseSpotlight } from "@/components/animations";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-background via-background to-card">
      {/* Ambient glow orbs for depth */}
      <AmbientOrb
        size={500}
        position={{ x: "15%", y: "25%" }}
        color="rgba(255, 215, 0, 0.05)"
      />
      <AmbientOrb
        size={350}
        position={{ x: "85%", y: "70%" }}
        color="rgba(255, 215, 0, 0.04)"
      />

      {/* Floating firefly orbs */}
      <FloatingOrbs
        count={18}
        minSize={3}
        maxSize={10}
        speed="slow"
        color="rgba(255, 215, 0, 0.6)"
      />

      {/* Subtle diagonal light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <LightBeam
          direction="diagonal"
          color="rgba(255, 215, 0, 0.06)"
          duration={12}
          intensity="subtle"
          width="3px"
          className="left-[5%]"
        />
        <LightBeam
          direction="diagonal"
          color="rgba(255, 215, 0, 0.05)"
          duration={15}
          delay={3}
          intensity="subtle"
          width="2px"
          className="left-[55%]"
        />
        <LightBeam
          direction="up"
          color="rgba(255, 215, 0, 0.04)"
          duration={10}
          delay={1}
          intensity="subtle"
          width="2px"
          className="left-[30%]"
        />
      </div>

      {/* Mouse-following spotlight effect */}
      <MouseSpotlight size={500} color="rgba(255, 215, 0, 0.06)" />

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

            {/* Value props with pulsing dots */}
            <div className="flex flex-wrap gap-4">
              {["10+ Years Experience", "Lifetime Warranty", "Free Demos"].map(
                (prop, index) => (
                  <motion.div
                    key={prop}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.div
                      className="h-2 w-2 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                        ease: "easeInOut",
                      }}
                      style={{
                        boxShadow: "0 0 8px rgba(255, 215, 0, 0.5)",
                      }}
                    />
                    {prop}
                  </motion.div>
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
            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-1 rounded-2xl"
              style={{
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.15) 50%, transparent 70%)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/fireflies-landscape-lighting-hero-landscape-lighting-installation.webp"
                alt="Professional landscape lighting on a beautiful home at night"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

              {/* Animated corner glows */}
              <motion.div
                className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -top-8 -left-8 h-24 w-24 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
