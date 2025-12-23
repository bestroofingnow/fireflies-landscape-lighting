"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, getHighPriorityCities } from "@/data/cities";

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
            className="rounded-xl bg-background p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                North Carolina
              </h3>
            </div>
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
          </motion.div>

          {/* South Carolina */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-background p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                South Carolina
              </h3>
            </div>
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
