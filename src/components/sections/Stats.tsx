"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, ThumbsUp } from "lucide-react";
import { AnimatedCounter } from "@/components/animations";

const stats = [
  {
    icon: <Clock className="h-8 w-8" />,
    value: 10,
    suffix: "+",
    label: "Years Experience",
    description: "Crafting stunning outdoor lighting",
  },
  {
    icon: <Users className="h-8 w-8" />,
    value: 500,
    suffix: "+",
    label: "Happy Customers",
    description: "Across Lake Norman & York County",
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: 100,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Backed by lifetime warranty",
  },
  {
    icon: <ThumbsUp className="h-8 w-8" />,
    value: 5,
    suffix: "",
    prefix: "",
    label: "Star Reviews",
    description: "On Google & Facebook",
  },
];

export function Stats() {
  return (
    <section className="py-16 bg-card relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="text-center p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300" />

                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-primary/10 text-primary mb-4 relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {stat.icon}
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-primary/30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>

                {/* Number */}
                <div className="text-4xl font-bold text-foreground mb-2">
                  <AnimatedCounter
                    end={stat.value}
                    duration={2}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix}
                  />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
