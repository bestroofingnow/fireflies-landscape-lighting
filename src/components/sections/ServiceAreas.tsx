"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, getHighPriorityCities } from "@/data/cities";

const areaImages = {
  nc: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/04/iblqknh8ogi70gf6qgvp.webp",
  sc: "https://fireflieslandscapelighting.com/wp-content/uploads/2025/12/qhGbRcaWVd5.webp",
};

export function ServiceAreas() {
  const highPriorityCities = getHighPriorityCities();
  const ncCities = cities.filter((city) => city.stateAbbr === "NC");
  const scCities = cities.filter((city) => city.stateAbbr === "SC");

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Serving <span className="text-primary">Your Area</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Professional landscape lighting services throughout the Lake Norman
            area and York County. Local experts who know your neighborhood.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* North Carolina */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group rounded-xl bg-background overflow-hidden"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={areaImages.nc}
                alt="Landscape lighting in North Carolina"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/90 text-primary-foreground shadow-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground drop-shadow-lg">
                  North Carolina
                </h3>
              </div>
            </div>
            <div className="p-6 pt-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {ncCities.map((city, index) => (
                  <motion.div
                    key={city.slug}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={`/service-areas/${city.slug}`}
                      className="flex items-center gap-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {city.name}
                      {city.priority === "high" && (
                        <span className="ml-auto text-xs text-primary">
                          Popular
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* South Carolina */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group rounded-xl bg-background overflow-hidden"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={areaImages.sc}
                alt="Landscape lighting in South Carolina"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/90 text-primary-foreground shadow-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground drop-shadow-lg">
                  South Carolina
                </h3>
              </div>
            </div>
            <div className="p-6 pt-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {scCities.map((city, index) => (
                  <motion.div
                    key={city.slug}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={`/service-areas/${city.slug}`}
                      className="flex items-center gap-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {city.name}
                      {city.priority === "high" && (
                        <span className="ml-auto text-xs text-primary">
                          Popular
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Button variant="outline" asChild>
            <Link href="/service-areas">
              View All Service Areas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
