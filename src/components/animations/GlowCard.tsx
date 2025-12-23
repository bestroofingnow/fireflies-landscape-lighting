"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { MouseEvent, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  glowOpacity?: number;
  borderGlow?: boolean;
}

export function GlowCard({
  children,
  className,
  glowColor = "255, 215, 0",
  glowSize = 250,
  glowOpacity = 0.15,
  borderGlow = true,
}: GlowCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl bg-card overflow-hidden",
        borderGlow && "border border-transparent hover:border-primary/20",
        className
      )}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Radial glow that follows mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${glowSize}px circle at ${mouseX}px ${mouseY}px,
              rgba(${glowColor}, ${glowOpacity}),
              transparent 80%
            )
          `,
        }}
      />

      {/* Border glow effect */}
      {borderGlow && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${glowSize / 2}px circle at ${mouseX}px ${mouseY}px,
                rgba(${glowColor}, 0.3),
                transparent 80%
              )
            `,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Simpler pulsing glow card without mouse tracking
interface PulseGlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  pulseSpeed?: number;
}

export function PulseGlowCard({
  children,
  className,
  glowColor = "rgba(255, 215, 0, 0.1)",
  pulseSpeed = 3,
}: PulseGlowCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl bg-card overflow-hidden",
        className
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Pulsing background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
