"use client";

import { motion } from "framer-motion";
import { BeforeAfterSlider } from "@/components/animations";
import { Sparkles } from "lucide-react";

const showcaseItems = [
  {
    beforeImage: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/fireflies-landscape-lighting-content-home-02.webp",
    afterImage: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/w0acuczzlpqjns0sc1ng.webp",
    title: "Architectural Uplighting",
    description: "Highlight your home's best features with dramatic uplighting",
  },
  {
    beforeImage: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/sb38qzydzbfdynullyzs.webp",
    afterImage: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/wrsysnt4qrkofgtmo0to.webp",
    title: "Garden & Landscape",
    description: "Transform your landscaping into a nighttime showpiece",
  },
];

export function BeforeAfterShowcase() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4" />
            See The Difference
          </motion.div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Day to <span className="text-primary">Night</span> Transformations
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to see how professional landscape lighting transforms ordinary homes
            into stunning nighttime showcases
          </p>
        </motion.div>

        {/* Before/After Sliders */}
        <div className="grid gap-8 lg:grid-cols-2">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="space-y-4"
            >
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeLabel="Day"
                afterLabel="Night"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive hint */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Drag the slider left or right to compare
        </motion.p>
      </div>
    </section>
  );
}
