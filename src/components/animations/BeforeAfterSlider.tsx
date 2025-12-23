"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [isDragging, handleMove]
  );

  const handleEnd = useCallback(() => setIsDragging(false), []);

  // Handle mouse/touch end outside the container
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalEnd = () => setIsDragging(false);

    window.addEventListener("mouseup", handleGlobalEnd);
    window.addEventListener("touchend", handleGlobalEnd);

    return () => {
      window.removeEventListener("mouseup", handleGlobalEnd);
      window.removeEventListener("touchend", handleGlobalEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/3] overflow-hidden rounded-2xl cursor-ew-resize select-none touch-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
    >
      {/* After Image (Background - Night) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Before Image (Clipped - Day) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      />

      {/* Slider Handle */}
      <motion.div
        className="absolute top-1/2 z-20 pointer-events-none"
        style={{
          left: `${sliderPosition}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: isDragging ? 1.1 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-primary/20">
          <div className="flex items-center gap-0.5 text-gray-700">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor">
              <path d="M6 0L0 7L6 14V0Z" />
            </svg>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor">
              <path d="M2 0L8 7L2 14V0Z" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium flex items-center gap-2 pointer-events-none">
        <Sun className="h-4 w-4 text-amber-500" />
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-sm font-medium flex items-center gap-2 pointer-events-none">
        <Moon className="h-4 w-4" />
        {afterLabel}
      </div>

      {/* Drag hint overlay - shows briefly */}
      {sliderPosition === 50 && !isDragging && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
            Drag to compare
          </div>
        </motion.div>
      )}
    </div>
  );
}
