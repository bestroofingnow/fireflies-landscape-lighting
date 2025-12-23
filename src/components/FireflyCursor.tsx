"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export function FireflyCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);

    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Add particle trail
      setParticles((prev) => {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          opacity: 0.6,
        };

        // Keep only last 8 particles
        const updated = [...prev, newParticle].slice(-8);
        return updated;
      });
    },
    [cursorX, cursorY, isVisible]
  );

  // Detect hoverable elements
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isClickable);
    };

    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouchDevice, handleMouseMove]);

  // Fade out particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.1 }))
          .filter((p) => p.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Hide on mouse leave
  useEffect(() => {
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Particle trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed z-[9998]"
          style={{
            left: particle.x,
            top: particle.y,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ scale: 0.8, opacity: particle.opacity }}
          animate={{ scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="h-2 w-2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,165,0,0.4) 50%, transparent 70%)",
              boxShadow: "0 0 8px rgba(255, 215, 0, 0.5)",
            }}
          />
        </motion.div>
      ))}

      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            scale: isHovering ? [1.2, 1.4, 1.2] : [1, 1.1, 1],
            opacity: isHovering ? [0.4, 0.6, 0.4] : [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: isHovering ? 50 : 40,
            height: isHovering ? 50 : 40,
            background:
              "radial-gradient(circle, rgba(255,165,0,0.3) 0%, transparent 70%)",
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
          }}
        />

        {/* Inner core */}
        <motion.div
          className="relative rounded-full"
          animate={{
            scale: isHovering ? [1, 1.2, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: isHovering ? 16 : 12,
            height: isHovering ? 16 : 12,
            background:
              "radial-gradient(circle, #FFD700 0%, #FFA500 50%, rgba(255,165,0,0.5) 100%)",
            boxShadow: `
              0 0 10px rgba(255, 215, 0, 0.8),
              0 0 20px rgba(255, 215, 0, 0.5),
              0 0 30px rgba(255, 165, 0, 0.3)
            `,
          }}
        />
      </motion.div>
    </>
  );
}
