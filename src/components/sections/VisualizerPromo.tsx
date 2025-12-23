"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Upload, Wand2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Upload,
    title: "Upload Photo",
    description: "Take a photo of your home's exterior",
  },
  {
    icon: Wand2,
    title: "Choose Style",
    description: "Select your preferred lighting style",
  },
  {
    icon: Sparkles,
    title: "See Results",
    description: "AI shows you the transformation",
  },
];

export function VisualizerPromo() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Tool
            </div>

            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              Visualize Your{" "}
              <span className="text-primary">Landscape Lighting</span>
            </h2>

            <p className="text-muted-foreground mb-8 text-lg">
              Use our AI-powered visualizer to see exactly how professional
              landscape lighting will transform your home - before we even start
              the installation.
            </p>

            <div className="space-y-4 mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button size="lg" asChild className="glow-firefly-sm group">
              <Link href="/visualizer">
                Try the Visualizer
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Right content - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card">
              {/* Placeholder for visualizer preview */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted via-card to-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center"
                    >
                      <Wand2 className="h-10 w-10 text-primary" />
                    </motion.div>
                    <p className="text-muted-foreground">
                      AI Lighting Visualizer Preview
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload your photo to see the magic
                    </p>
                  </div>
                </div>
              </div>

              {/* Corner glow */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
