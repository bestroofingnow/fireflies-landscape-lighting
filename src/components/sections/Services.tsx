"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Wrench, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { GlowCard, FloatingOrbs, AmbientOrb } from "@/components/animations";

const iconMap = {
  design: Lightbulb,
  installation: Wrench,
};

const serviceImages = {
  design: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/fireflies-landscape-lighting-content-home-02.webp",
  installation: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/wrsysnt4qrkofgtmo0to.webp",
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
            const serviceImage = serviceImages[service.slug as keyof typeof serviceImages];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <GlowCard className="h-full overflow-hidden" glowColor="255, 215, 0" glowOpacity={0.12} glowSize={300}>
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={serviceImage}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    <motion.div
                      className="absolute top-4 left-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background/90 backdrop-blur-sm text-primary shadow-lg"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                  </div>

                  <div className="relative p-8 pt-4">
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
