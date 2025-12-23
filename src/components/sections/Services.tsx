"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Wrench, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

const iconMap = {
  design: Lightbulb,
  installation: Wrench,
};

export function Services() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            From initial design to professional installation, we handle every
            aspect of your landscape lighting project.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {company.services.map((service, index) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-card p-8 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Background glow on hover */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 transition-all group-hover:scale-150 group-hover:bg-primary/10" />

                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mb-6 space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" asChild className="group/btn">
                    <Link href={`/services/${service.slug}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
