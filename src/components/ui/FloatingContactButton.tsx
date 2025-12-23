"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import { company } from "@/data/company";

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Call Now",
      href: `tel:${company.phone}`,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email Us",
      href: `mailto:${company.email}`,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Get Estimate",
      href: "/get-estimate",
      color: "bg-primary hover:bg-primary/90",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3"
          >
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {option.href.startsWith("/") ? (
                  <Link
                    href={option.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg transition-all ${option.color}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {option.icon}
                    <span className="font-medium whitespace-nowrap">{option.label}</span>
                  </Link>
                ) : (
                  <a
                    href={option.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg transition-all ${option.color}`}
                  >
                    {option.icon}
                    <span className="font-medium whitespace-nowrap">{option.label}</span>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen
            ? "0 0 0 0 rgba(255, 215, 0, 0)"
            : [
                "0 0 0 0 rgba(255, 215, 0, 0.4)",
                "0 0 0 20px rgba(255, 215, 0, 0)",
              ],
        }}
        transition={{
          boxShadow: {
            duration: 1.5,
            repeat: isOpen ? 0 : Infinity,
            ease: "easeOut",
          },
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <MessageCircle className="h-7 w-7" />
          )}
        </motion.div>

        {/* Notification Badge */}
        {!isOpen && (
          <motion.span
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            !
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
