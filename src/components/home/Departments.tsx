"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { departments } from "@/data/departments";

const ROTATION_INTERVAL = 3000;

const Departments: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const router = useRouter();
  const animating = useRef(false);
  const startX = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => setHasMounted(true), []);

  /** Responsive check */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /** Auto rotate */
  useEffect(() => {
    if (!paused) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = setInterval(() => handleNext(), ROTATION_INTERVAL);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [paused, activeIndex]);

  const handleNext = () => {
    if (animating.current) return;
    animating.current = true;
    setActiveIndex((prev) => (prev + 1) % departments.length);
    setTimeout(() => (animating.current = false), 450);
  };

  const handlePrev = () => {
    if (animating.current) return;
    animating.current = true;
    setActiveIndex((prev) => (prev - 1 + departments.length) % departments.length);
    setTimeout(() => (animating.current = false), 450);
  };

  /** Swiping */
  const handlePointerDown = (e: React.PointerEvent) => (startX.current = e.clientX);
  const handlePointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const diff = e.clientX - startX.current;
    if (diff > 50) handlePrev();
    else if (diff < -50) handleNext();
    startX.current = null;
  };
  const handleTouchStart = (e: React.TouchEvent) =>
    (startX.current = e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - (startX.current ?? 0);
    if (diff > 50) handlePrev();
    else if (diff < -50) handleNext();
    startX.current = null;
  };

  /** Position & instant wrap fix */
  const getPosition = (index: number) => {
    const total = departments.length;
    let diff = (index - activeIndex + total) % total;

    const shift = isMobile ? 110 : 180;
    const depth = isMobile ? 0.88 : 0.95;
    const farDepth = isMobile ? 0.78 : 0.85;

    // Prevent last card from passing through middle
    if (diff > total / 2) diff -= total;

    switch (diff) {
      case 0:
        return { scale: 1.05, x: 0, zIndex: 6, instant: false };
      case 1:
        return { scale: depth, x: shift, zIndex: 5, instant: false };
      case 2:
        return { scale: farDepth, x: shift * 1.6, zIndex: 4, instant: false };
      case -1:
        return { scale: depth, x: -shift, zIndex: 5, instant: false };
      case -2:
        return { scale: farDepth, x: -shift * 1.6, zIndex: 4, instant: false };
      default:
        return { scale: 0.7, x: 0, zIndex: 1, instant: true };
    }
  };

  if (!hasMounted) return null;

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center 
      bg-white overflow-hidden select-none 
      md:py-0 py-8 sm:py-8 mt-4 sm:mt-4 md:-mt-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10 md:mb-10 mt-4 sm:mt-6 md:mt-0">
        <div className="relative inline-block overflow-hidden">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold tracking-[0.25em] uppercase text-[#b8921d] relative select-none">
            OUR DEPARTMENTS
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <div className="absolute top-0 left-0 w-[120px] h-full bg-white/60 rounded-md" />
            </motion.div>
          </h2>
        </div>
        <div className="w-16 h-[3px] bg-[#f15a29] mx-auto mt-3 sm:mt-4 rounded-full" />
      </div>

      {/* Carousel */}
      <div
        className="relative w-full max-w-6xl flex justify-center items-center
        px-6 sm:px-8 md:px-6 mt-6 sm:mt-8 md:mt-0
        h-[340px] sm:h-[380px] md:h-[440px]"
      >
        <AnimatePresence>
          {departments.map((dept, index) => {
            const { scale, x, zIndex, instant } = getPosition(index);

            const cardHeight = isMobile
              ? "clamp(260px, 95vw, 370px)"
              : "clamp(260px, 70vh, 440px)";
            const cardWidth = isMobile
              ? "clamp(170px, 60vw, 250px)"
              : "clamp(180px, 65vw, 280px)";

            return (
              <motion.div
                key={dept.slug}
                layout="position"
                className="absolute rounded-3xl overflow-hidden cursor-grab shadow-[0_8px_25px_rgba(0,0,0,0.25)] bg-white"
                animate={{ scale, x, zIndex }}
                initial={false}
                transition={
                  instant
                    ? { duration: 0 } // ⬅ instant wrap transition
                    : {
                        type: "spring",
                        stiffness: 65,
                        damping: 18,
                        mass: 0.9,
                      }
                }
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  zIndex,
                  willChange: "transform",
                }}
                onClick={() => router.push(`/departments/${dept.slug}`)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={dept.image}
                    alt={dept.name}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 w-full flex justify-center">
                    <div className="border border-white text-white font-semibold text-sm rounded-full px-5 py-1.5 bg-white/10 backdrop-blur-sm">
                      {dept.name}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Departments;
