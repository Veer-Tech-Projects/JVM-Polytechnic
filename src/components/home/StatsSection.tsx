'use client';

import React from 'react';
import Image from 'next/image';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const stats = [
    { label: 'Staff', value: 26, suffix: '+' },
    { label: 'Students', value: 476, suffix: '+' },
    { label: 'Trust Members', value: 11, suffix: '+' },
    { label: 'Years', value: 18 },
  ];

  return (
    <section className="bg-white pt-0 pb-5 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 w-full px-4 sm:px-6 md:px-12"
      >
            {/* Logo */}
        <div className="flex justify-center md:justify-start flex-shrink-0 translate-y-6 md:translate-y-8 lg:translate-y-10">
          <div className="relative w-56 h-36 sm:w-52 sm:h-32 md:w-60 md:h-40 lg:w-64 lg:h-44 md:-translate-x-3 lg:-translate-x-5">
            <Image
              src="/images/logo/new-logo2.png"
              alt="JVM Polytechnic 18 years of Transforming Lives"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* ✅ Centered Stats w/ Proper Barrier Spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex justify-center items-center text-center gap-x-4 gap-y-6 md:gap-x-10 w-full max-w-sm sm:max-w-lg md:max-w-4xl ml-0 mr-auto px-2 sm:px-4 translate-y-6 md:translate-y-0">

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
