'use client';

import React from 'react';
import Image from 'next/image';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const stats = [
    { label: 'Staff', value: 200, suffix: '+' },
    { label: 'Students', value: 1200, suffix: '+' },
    { label: 'Trust Members', value: 500, suffix: '+' },
    { label: 'Years', value: 18 },
  ];

  return (
    <section className="bg-white py-0 md:py-15 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 w-full px-4 sm:px-6 md:px-12"
      >
            {/* Logo */}
        <div className="flex justify-center md:justify-start flex-shrink-0 mb-0 md:mb-0">
          <div className="relative w-80 h-52 sm:w-64 sm:h-44 md:w-72 md:h-48 lg:w-80 lg:h-52 md:-translate-x-6 lg:-translate-x-8">
            <Image
              src="/images/hero/jvm-banner-logo.png"
              alt="KLE Society 109 years of Transforming Lives"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* ✅ Centered Stats w/ Proper Barrier Spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex justify-center items-center text-center gap-x-4 gap-y-6 md:gap-x-10 w-full max-w-sm sm:max-w-lg md:max-w-4xl ml-0 mr-auto px-2 sm:px-4">

          {stats.map((s, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center justify-center px-3
                ${
                  i < stats.length - 1 &&
                  `after:content-[''] after:absolute after:right-[-6px] md:after:right-[-10px]
                  after:top-[5%] after:bottom-[5%]
                  after:w-[2px] after:bg-gray-400`
                }`}
            >
              {/* Number */}
              <div className="text-[1.5rem] sm:text-[2.2rem] md:text-[1.4rem] lg:text-[1.3rem] font-extrabold text-gray-400 leading-tight tracking-tight mb-1">
                <CountUp
                  end={s.value}
                  duration={2.8}
                  separator=","
                  suffix={s.suffix ?? ''}
                />
              </div>

              {/* Label */}
              <div className="text-gray-400 text-sm sm:text-base font-bold tracking-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
