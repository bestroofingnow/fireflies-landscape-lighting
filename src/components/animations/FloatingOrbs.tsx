"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface OrbConfig {
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingOrbsProps {
  count?: number;
  className?: string;
  color?: string;
  minSize?: number;
  maxSize?: number;
  speed?: "slow" | "medium" | "fast";
}

export function FloatingOrbs({
  count = 8,
  className,
  color = "rgba(255, 215, 0, 0.4)",
  minSize = 4,
  maxSize = 12,
  speed = "medium",
}: FloatingOrbsProps) {
  const speedMultiplier = {
    slow: 1.5,
    medium: 1,
    fast: 0.6,
  };

  const orbs = useMemo<OrbConfig[]>(() => {
    return Array.from({ length: count }, () => ({
      size: Math.random() * (maxSize - minSize) + minSize,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: (Math.random() * 10 + 15) * speedMultiplier[speed],
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, [count, minSize, maxSize, speed]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${orb.size * 2}px ${color}`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            opacity: [orb.opacity * 0.5, orb.opacity, orb.opacity * 0.7, orb.opacity * 0.5],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Single large ambient orb for backgrounds
interface AmbientOrbProps {
  className?: string;
  size?: number;
  color?: string;
  position?: { x: string; y: string };
}

export function AmbientOrb({
  className,
  size = 300,
  color = "rgba(255, 215, 0, 0.08)",
  position = { x: "50%", y: "50%" },
}: AmbientOrbProps) {
  return (
    <motion.div
      className={cn("absolute rounded-full pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
