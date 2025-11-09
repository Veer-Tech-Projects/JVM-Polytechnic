'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/layout/Container';

const heroImages = [
  '/images/hero/college1.jpg',
  '/images/hero/events1.jpg',
  '/images/hero/students1.jpg',
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return (
      <section className="relative bg-white overflow-hidden h-[55vh] md:h-[70vh] lg:h-[75vh]">
        <div className="absolute inset-0 bg-gray-200" />
      </section>
    );
  }

  return (
    <section className="relative bg-white pt-4 overflow-hidden -mb-[5vw] sm:-mb-[6vw] md:-mb-[8vw]">
      <Container className="relative">
        <div className="overflow-hidden relative rounded-none">
          {/* Base overlay to prevent flash */}
          <div className="absolute inset-0 bg-black/20 z-[1]" />

          {/* --- Stack all images --- */}
          <div className="relative h-[35vh] sm:h-[40vh] md:h-[70vh] lg:h-[75vh]">
            <AnimatePresence>
              <motion.div
                key={heroImages[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0"
              >
                <Image
                  src={heroImages[index]}
                  alt={`Hero image ${index + 1}`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- SVG Curve + Logo --- */}
          <div className="absolute top-0 left-0 h-full w-full z-30 pointer-events-none">
            <svg
              viewBox="0 0 1440 800"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0 w-full h-[100%]"
              style={{ transform: 'translateX(-1px)' }}
            >
              <path
                d="M0,10 Q200,160 135,450 Q90,800 410,802 L0,820 Z"
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth="3"
              />
            </svg>

          {/* --- Circular Logo --- */}
          <motion.div
            onClick={() => setRotate(!rotate)}
            className="absolute top-1/2 left-[1%] sm:left-[2%] md:left-[3%]
                      -translate-y-1/2 z-50 cursor-pointer pointer-events-auto"
            animate={{ rotate: rotate ? 360 : 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            {/* Rotating Gold Ring */}
            <div className="
                  absolute inset-0 rounded-full 
                  border-2 border-yellow-400
                  shadow-[0_0_10px_rgba(255,200,0,0.7)]
                "
            />

            {/* Main Circle */}
            <div
              className="
                relative overflow-hidden rounded-full bg-white
                border-[3px] border-white backdrop-blur-md

                w-[80px] h-[80px]
                sm:w-[100px] sm:h-[100px]
                md:w-[120px] md:h-[120px]
                lg:w-[145px] lg:h-[145px]

                shadow-[0_10px_26px_rgba(0,0,0,0.28)]
                transition-all duration-300
                hover:shadow-[0_12px_34px_rgba(255,200,0,0.5)]
              "
            >
              <Image
                src="/images/hero/jvm-logo2.png"
                alt="JVM Polytechnic Logo"
                fill
                className="object-cover -translate-y-1"
              />
            </div>
          </motion.div> 

          </div>
          
        </div>
      </Container>
    </section>
  );
}
