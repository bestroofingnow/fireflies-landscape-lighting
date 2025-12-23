"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { FloatingOrbs, LightBeam, AmbientOrb } from "@/components/animations";

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
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://fireflieslandscapelighting.com/wp-content/uploads/2025/12/image-30.png"
          alt="Landscape lighting background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20" />
      </div>

      <AmbientOrb size={400} position={{ x: "20%", y: "50%" }} color="rgba(255, 215, 0, 0.06)" />
      <AmbientOrb size={350} position={{ x: "80%", y: "40%" }} color="rgba(255, 215, 0, 0.05)" />

      <FloatingOrbs count={12} minSize={4} maxSize={10} speed="medium" color="rgba(255, 215, 0, 0.6)" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <LightBeam direction="up" color="rgba(255, 215, 0, 0.08)" duration={8} intensity="subtle" width="3px" className="left-[15%]" />
        <LightBeam direction="up" color="rgba(255, 215, 0, 0.06)" duration={10} delay={2} intensity="subtle" width="2px" className="left-[75%]" />
        <LightBeam direction="up" color="rgba(255, 215, 0, 0.05)" duration={12} delay={4} intensity="subtle" width="2px" className="left-[45%]" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2
            className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
              <Button size="lg" asChild className="glow-firefly-lg group">
                <Link href="/get-estimate">
                  Get Your Free Estimate
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            {showPhone && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button size="lg" variant="outline" asChild>
                  <a href={`tel:${company.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call {company.phoneDisplay}
                  </a>
                </Button>
              </motion.div>
            )}
          </motion.div>

          <motion.p
            className="mt-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Free estimates & nighttime demonstrations available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
