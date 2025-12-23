"use client";

import { motion } from "framer-motion";
import { Award, Shield, FileText, Moon } from "lucide-react";
import { company } from "@/data/company";
import { PulseGlowCard, FloatingOrbs, Spotlight } from "@/components/animations";

const iconMap = {
  Award: Award,
  Shield: Shield,
  FileText: FileText,
  Moon: Moon,
};

export function ValueProps() {
  return (
    <section className="relative py-20 bg-card overflow-hidden">
      {/* Floating orbs background */}
      <FloatingOrbs
        count={8}
        minSize={3}
        maxSize={8}
        speed="slow"
        color="rgba(255, 215, 0, 0.25)"
      />

      {/* Subtle spotlights */}
      <Spotlight
        size={300}
        color="rgba(255, 215, 0, 0.05)"
        className="top-10 left-[20%]"
        pulseIntensity={1.15}
      />
      <Spotlight
        size={250}
        color="rgba(255, 215, 0, 0.04)"
        className="bottom-10 right-[15%]"
        pulseIntensity={1.2}
      />

      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Why Choose <span className="text-primary">Fireflies</span>?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We&apos;re not just lighting experts - we&apos;re your neighbors,
            committed to enhancing the beauty and safety of our community.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {company.valueProps.map((prop, index) => {
            const Icon = iconMap[prop.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <PulseGlowCard
                  className="h-full p-6"
                  glowColor="rgba(255, 215, 0, 0.08)"
                  pulseSpeed={4 + index * 0.5}
                >
                  <motion.div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: "rgb(var(--primary))",
                      color: "rgb(var(--primary-foreground))",
                      boxShadow: "0 0 25px rgba(255, 215, 0, 0.4)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {prop.description}
                  </p>
                </PulseGlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
