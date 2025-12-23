"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Lightbulb, Wrench, Check, Sparkles } from "lucide-react";

interface TimelineStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const steps: TimelineStep[] = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Free Consultation",
    description: "We visit your property to understand your vision",
    details: [
      "Discuss your goals and preferences",
      "Evaluate property features",
      "Answer all your questions",
    ],
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Custom Design",
    description: "Our experts create a tailored lighting plan",
    details: [
      "Professional design layout",
      "Fixture selection guidance",
      "Energy usage estimates",
    ],
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Nighttime Demo",
    description: "See your design come to life before installation",
    details: [
      "Temporary fixture setup",
      "Real-time adjustments",
      "No commitment required",
    ],
  },
  {
    icon: <Wrench className="h-6 w-6" />,
    title: "Expert Installation",
    description: "Professional installation with hidden wiring",
    details: [
      "Clean, efficient work",
      "Premium LED fixtures",
      "Smart controls setup",
    ],
  },
  {
    icon: <Check className="h-6 w-6" />,
    title: "Enjoy & Warranty",
    description: "Love your new lighting with lifetime support",
    details: [
      "Final walkthrough",
      "Lifetime warranty",
      "Ongoing support",
    ],
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

      {/* Animated Progress Line */}
      <motion.div
        className="absolute left-8 top-0 w-0.5 bg-primary md:left-1/2 md:-translate-x-1/2"
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative flex items-start gap-8 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Icon Circle */}
            <motion.div
              className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-background border-4 border-primary text-primary"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)" }}
            >
              {step.icon}
              {/* Step Number */}
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </span>
            </motion.div>

            {/* Content Card */}
            <motion.div
              className={`flex-1 rounded-xl bg-card border border-border p-6 ${
                index % 2 === 1 ? "md:text-right" : ""
              }`}
              whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <ul className={`space-y-2 ${index % 2 === 1 ? "md:ml-auto" : ""}`}>
                {step.details.map((detail, detailIndex) => (
                  <motion.li
                    key={detail}
                    initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.2 + detailIndex * 0.1 + 0.5 }}
                    className={`flex items-center gap-2 text-sm text-muted-foreground ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
