"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    src: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/xiicxl3qu3y7mndvff1i.webp",
    alt: "Elegant home with architectural uplighting",
  },
  {
    src: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/z7yugipojvuezldrrfsu.webp",
    alt: "Beautiful pathway lighting design",
  },
  {
    src: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/ckguwgpdycnrtaslgnxm.webp",
    alt: "Garden accent lighting showcase",
  },
  {
    src: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/m6cxxzu262nnl7wdnkdz.webp",
    alt: "Luxury home exterior lighting",
  },
  {
    src: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/oslgdtyzb1t3xxyes4rk.webp",
    alt: "Dramatic landscape lighting at night",
  },
  {
    src: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/l7p2rc2ng77gpzgvqcsb.webp",
    alt: "Professional outdoor lighting installation",
  },
];

export function Gallery() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Our <span className="text-primary">Work</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            See the transformation professional landscape lighting can bring to homes just like yours.
          </p>
        </motion.div>

        {/* Masonry-style Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                index === 0 || index === 5 ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Golden glow on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "radial-gradient(circle at center, rgba(255, 215, 0, 0.15) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" asChild className="group">
            <Link href="/visualizer">
              Try Our AI Visualizer
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
