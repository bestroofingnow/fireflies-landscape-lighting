"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Wrench, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { GlowCard, FloatingOrbs, AmbientOrb } from "@/components/animations";

const iconMap = {
  design: Lightbulb,
  installation: Wrench,
};

export function Services() {
  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <AmbientOrb size={400} position={{ x: "10%", y: "50%" }} color="rgba(255, 215, 0, 0.03)" />
      <AmbientOrb size={300} position={{ x: "90%", y: "30%" }} color="rgba(255, 215, 0, 0.02)" />
      <FloatingOrbs count={6} minSize={2} maxSize={6} speed="slow" color="rgba(255, 215, 0, 0.3)" />

      <div className="container relative mx-auto px-4 lg:px-8">
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
            From initial design to professional installation, we handle every aspect of your landscape lighting project.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {company.services.map((service, index) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <GlowCard className="h-full p-8" glowColor="255, 215, 0" glowOpacity={0.12} glowSize={300}>
                  <motion.div
                    className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 pointer-events-none"
                    initial={{ scale: 1, opacity: 0.05 }}
                    whileHover={{ scale: 1.5, opacity: 0.15 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="relative">
                    <motion.div
                      className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary cursor-pointer"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>

                    <h3 className="mb-3 text-2xl font-bold text-foreground">{service.title}</h3>
                    <p className="mb-6 text-muted-foreground">{service.description}</p>

                    <ul className="mb-6 space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.15 + featureIndex * 0.05 }}
                        >
                          <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                            <Check className="h-4 w-4 shrink-0 text-primary" />
                          </motion.div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <Button variant="outline" asChild className="group/btn">
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
