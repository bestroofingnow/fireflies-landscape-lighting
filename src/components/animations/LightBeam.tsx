"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LightBeamProps {
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "diagonal";
  color?: string;
  delay?: number;
  duration?: number;
  width?: string;
  intensity?: "subtle" | "medium" | "strong";
}

export function LightBeam({
  className,
  direction = "up",
  color = "rgba(255, 215, 0, 0.15)",
  delay = 0,
  duration = 4,
  width = "2px",
  intensity = "medium",
}: LightBeamProps) {
  const intensityMap = {
    subtle: 0.1,
    medium: 0.2,
    strong: 0.35,
  };

  const directionStyles = {
    up: {
      initial: { height: "0%", bottom: 0, left: "50%", translateX: "-50%" },
      animate: { height: ["0%", "100%", "0%"] },
      gradient: `linear-gradient(to top, transparent, ${color})`,
    },
    down: {
      initial: { height: "0%", top: 0, left: "50%", translateX: "-50%" },
      animate: { height: ["0%", "100%", "0%"] },
      gradient: `linear-gradient(to bottom, transparent, ${color})`,
    },
    left: {
      initial: { width: "0%", right: 0, top: "50%", translateY: "-50%" },
      animate: { width: ["0%", "100%", "0%"] },
      gradient: `linear-gradient(to left, transparent, ${color})`,
    },
    right: {
      initial: { width: "0%", left: 0, top: "50%", translateY: "-50%" },
      animate: { width: ["0%", "100%", "0%"] },
      gradient: `linear-gradient(to right, transparent, ${color})`,
    },
    diagonal: {
      initial: { height: "0%", bottom: 0, left: "20%", rotate: -30 },
      animate: { height: ["0%", "120%", "0%"] },
      gradient: `linear-gradient(to top, transparent, ${color})`,
    },
  };

  const styleConfig = directionStyles[direction];
  const isVertical = direction === "up" || direction === "down" || direction === "diagonal";

  return (
    <motion.div
      className={cn("absolute pointer-events-none", className)}
      style={{
        ...styleConfig.initial,
        width: isVertical ? width : undefined,
        height: !isVertical ? width : undefined,
        background: styleConfig.gradient,
        filter: `blur(${intensity === "subtle" ? "2px" : intensity === "medium" ? "4px" : "6px"})`,
        opacity: intensityMap[intensity],
      }}
      animate={styleConfig.animate}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

interface SpotlightProps {
  className?: string;
  size?: number;
  color?: string;
  pulseIntensity?: number;
}

export function Spotlight({
  className,
  size = 200,
  color = "rgba(255, 215, 0, 0.15)",
  pulseIntensity = 1.2,
}: SpotlightProps) {
  return (
    <motion.div
      className={cn("absolute rounded-full pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, pulseIntensity, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
