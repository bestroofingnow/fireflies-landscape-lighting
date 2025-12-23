"use client";

import { motion } from "framer-motion";
import { FAQAccordion } from "@/components/animations";

interface FAQCategory {
  category: string;
  questions: {
    q: string;
    a: string;
  }[];
}

interface FAQSectionProps {
  faqs: FAQCategory[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {faqs.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {category.category}
          </h2>
          <FAQAccordion
            items={category.questions.map((q) => ({
              question: q.q,
              answer: q.a,
            }))}
          />
        </motion.div>
      ))}
    </div>
  );
}
