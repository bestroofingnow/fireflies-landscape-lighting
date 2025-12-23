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

  // Smoother spring for more organic movement
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
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
      // Random chance to flash brightly
      if (Math.random() > 0.7) {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 150);
      }
    }, 2000);

    // Gentle glow variation
    const glowInterval = setInterval(() => {
      setGlowIntensity(0.7 + Math.random() * 0.5);
    }, 100);

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
      if (particleCount.current % 3 === 0) {
        setParticles((prev) => {
          const newParticle: Particle = {
            id: Date.now() + Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 0.5 + 0.5,
          };
          return [...prev.slice(-12), newParticle];
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
      setParticles((prev) => prev.slice(-12));
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
              opacity: 0.8,
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
                background: "radial-gradient(circle, #FFE87C 0%, #FFD700 40%, transparent 70%)",
                boxShadow: `
                  0 0 ${particle.size * 2}px rgba(255, 232, 124, 0.8),
                  0 0 ${particle.size * 4}px rgba(255, 215, 0, 0.4)
                `,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main firefly cursor */}
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
          rotate: [0, 5, -5, 3, -3, 0],
        }}
        transition={{
          rotate: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Outer atmospheric glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full"
          animate={{
            scale: isFlashing ? 2 : isHovering ? [1.3, 1.6, 1.3] : [1, 1.2, 1],
            opacity: isFlashing ? 0.8 : [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: isFlashing ? 0.15 : 1.5,
            repeat: isFlashing ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 60,
            height: 60,
            marginLeft: -30,
            marginTop: -30,
            background: "radial-gradient(circle, rgba(255, 232, 124, 0.3) 0%, rgba(255, 215, 0, 0.1) 40%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Secondary glow ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full"
          animate={{
            scale: isHovering ? [1.1, 1.3, 1.1] : [1, 1.15, 1],
            opacity: isFlashing ? 1 : glowIntensity * 0.5,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 35,
            height: 35,
            marginLeft: -17.5,
            marginTop: -17.5,
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 165, 0, 0.2) 50%, transparent 70%)",
            boxShadow: `0 0 20px rgba(255, 215, 0, ${glowIntensity * 0.4})`,
          }}
        />

        {/* Firefly body container */}
        <motion.div
          className="relative"
          animate={{
            y: [0, -2, 0, 2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Wings (left) */}
          <motion.div
            className="absolute"
            style={{
              width: 8,
              height: 12,
              left: -6,
              top: -2,
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              transformOrigin: "right center",
            }}
            animate={{
              rotateY: [0, 30, 0, -10, 0],
              rotateZ: [-15, -25, -15, -5, -15],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Wings (right) */}
          <motion.div
            className="absolute"
            style={{
              width: 8,
              height: 12,
              right: -6,
              top: -2,
              background: "linear-gradient(-135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              transformOrigin: "left center",
            }}
            animate={{
              rotateY: [0, -30, 0, 10, 0],
              rotateZ: [15, 25, 15, 5, 15],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Firefly head */}
          <div
            style={{
              width: 6,
              height: 5,
              background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
              borderRadius: "50% 50% 40% 40%",
              position: "absolute",
              top: -8,
              left: "50%",
              marginLeft: -3,
            }}
          />

          {/* Firefly thorax (middle body) */}
          <div
            style={{
              width: 8,
              height: 8,
              background: "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)",
              borderRadius: "40%",
              position: "absolute",
              top: -4,
              left: "50%",
              marginLeft: -4,
            }}
          />

          {/* Glowing abdomen (the light!) */}
          <motion.div
            animate={{
              scale: isFlashing ? 1.4 : isHovering ? [1, 1.15, 1] : [1, 1.1, 1],
              opacity: isFlashing ? 1 : glowIntensity,
            }}
            transition={{
              duration: isFlashing ? 0.1 : 0.8,
              repeat: isFlashing ? 0 : Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: isHovering ? 14 : 12,
              height: isHovering ? 16 : 14,
              background: isFlashing
                ? "radial-gradient(circle at 50% 30%, #FFFACD 0%, #FFE87C 30%, #FFD700 60%, #FFA500 100%)"
                : "radial-gradient(circle at 50% 30%, #FFE87C 0%, #FFD700 40%, #FFA500 80%, #FF8C00 100%)",
              borderRadius: "45% 45% 50% 50%",
              boxShadow: isFlashing
                ? `
                  0 0 15px rgba(255, 250, 205, 1),
                  0 0 30px rgba(255, 232, 124, 0.9),
                  0 0 45px rgba(255, 215, 0, 0.7),
                  0 0 60px rgba(255, 165, 0, 0.5),
                  inset 0 -3px 6px rgba(255, 140, 0, 0.5)
                `
                : `
                  0 0 ${10 * glowIntensity}px rgba(255, 232, 124, ${0.9 * glowIntensity}),
                  0 0 ${20 * glowIntensity}px rgba(255, 215, 0, ${0.6 * glowIntensity}),
                  0 0 ${30 * glowIntensity}px rgba(255, 165, 0, ${0.4 * glowIntensity}),
                  inset 0 -2px 4px rgba(255, 140, 0, 0.4)
                `,
            }}
          >
            {/* Light segments on abdomen */}
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                height: "30%",
                background: "rgba(255, 255, 240, 0.4)",
                borderRadius: "50%",
                filter: "blur(1px)",
              }}
            />
          </motion.div>

          {/* Tiny legs (decorative) */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`leg-l-${i}`}
              style={{
                position: "absolute",
                width: 1,
                height: 4,
                background: "#2a2a2a",
                left: -2,
                top: i * 3 - 2,
                transformOrigin: "top right",
                transform: `rotate(-${30 + i * 15}deg)`,
              }}
              animate={{
                rotate: [-30 - i * 15, -35 - i * 15, -30 - i * 15],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`leg-r-${i}`}
              style={{
                position: "absolute",
                width: 1,
                height: 4,
                background: "#2a2a2a",
                right: -2,
                top: i * 3 - 2,
                transformOrigin: "top left",
                transform: `rotate(${30 + i * 15}deg)`,
              }}
              animate={{
                rotate: [30 + i * 15, 35 + i * 15, 30 + i * 15],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
