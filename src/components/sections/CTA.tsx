"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

interface CTAProps {
  title?: string;
  subtitle?: string;
  showPhone?: boolean;
}

export function CTA({
  title = "Ready to Transform Your Home?",
  subtitle = "Get a free estimate and see how landscape lighting can enhance your property's beauty and security.",
  showPhone = true,
}: CTAProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20" />

      {/* Animated fireflies */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              x: [null, `${Math.random() * 100}%`],
              y: [null, `${Math.random() * 100}%`],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%)",
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="glow-firefly-lg group">
              <Link href="/get-estimate">
                Get Your Free Estimate
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            {showPhone && (
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${company.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {company.phoneDisplay}
                </a>
              </Button>
            )}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Free estimates & nighttime demonstrations available
          </p>
        </motion.div>
      </div>
    </section>
  );
}
