"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export function FireflyCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [isFlashing, setIsFlashing] = useState(false);
  const particleCount = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smoother spring for organic movement
  const springConfig = { damping: 25, stiffness: 250, mass: 0.4 };
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

  // Firefly bioluminescence effect - random flashing
  useEffect(() => {
    if (isTouchDevice) return;

    const flashInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 150);
      }
    }, 2500);

    // Gentle glow variation
    const glowInterval = setInterval(() => {
      setGlowIntensity(0.8 + Math.random() * 0.4);
    }, 150);

    return () => {
      clearInterval(flashInterval);
      clearInterval(glowInterval);
    };
  }, [isTouchDevice]);

  // Handle mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Add glowing particle trail
      particleCount.current += 1;
      if (particleCount.current % 4 === 0) {
        setParticles((prev) => {
          const newParticle: Particle = {
            id: Date.now() + Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            size: Math.random() * 3 + 2,
            duration: Math.random() * 0.4 + 0.4,
          };
          return [...prev.slice(-8), newParticle];
        });
      }
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

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(-8));
    }, 1000);

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
      {/* Glowing particle trail */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="pointer-events-none fixed z-[9998]"
            style={{
              left: particle.x,
              top: particle.y,
            }}
            initial={{
              scale: 1,
              opacity: 0.7,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: 0,
              opacity: 0,
              y: "-50%",
              x: "-50%",
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: particle.duration,
              ease: "easeOut",
            }}
          >
            <div
              style={{
                width: particle.size,
                height: particle.size,
                borderRadius: "50%",
                background: "radial-gradient(circle, #FFE87C 0%, #FFD700 50%, transparent 100%)",
                boxShadow: `0 0 ${particle.size * 2}px rgba(255, 215, 0, 0.6)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Simple Firefly Cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full"
          animate={{
            scale: isFlashing ? 1.8 : isHovering ? [1.2, 1.5, 1.2] : [1, 1.2, 1],
            opacity: isFlashing ? 0.6 : [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: isFlashing ? 0.15 : 1.5,
            repeat: isFlashing ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />

        {/* Simple firefly body */}
        <motion.div
          className="relative"
          animate={{
            y: [0, -1, 0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Dark body/head - small oval */}
          <div
            style={{
              width: 4,
              height: 6,
              background: "linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)",
              borderRadius: "50% 50% 40% 40%",
              position: "absolute",
              top: -10,
              left: "50%",
              marginLeft: -2,
            }}
          />

          {/* Glowing light - the main firefly glow */}
          <motion.div
            animate={{
              scale: isFlashing ? 1.3 : isHovering ? [1, 1.1, 1] : [1, 1.05, 1],
              opacity: isFlashing ? 1 : glowIntensity,
            }}
            transition={{
              duration: isFlashing ? 0.1 : 1,
              repeat: isFlashing ? 0 : Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: isHovering ? 10 : 8,
              height: isHovering ? 10 : 8,
              background: isFlashing
                ? "radial-gradient(circle at 40% 40%, #FFFACD 0%, #FFE87C 40%, #FFD700 100%)"
                : "radial-gradient(circle at 40% 40%, #FFE87C 0%, #FFD700 50%, #FFA500 100%)",
              borderRadius: "50%",
              boxShadow: isFlashing
                ? `
                  0 0 8px rgba(255, 250, 205, 1),
                  0 0 16px rgba(255, 232, 124, 0.9),
                  0 0 24px rgba(255, 215, 0, 0.7),
                  0 0 32px rgba(255, 165, 0, 0.4)
                `
                : `
                  0 0 ${6 * glowIntensity}px rgba(255, 232, 124, 0.9),
                  0 0 ${12 * glowIntensity}px rgba(255, 215, 0, 0.6),
                  0 0 ${18 * glowIntensity}px rgba(255, 165, 0, 0.3)
                `,
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
