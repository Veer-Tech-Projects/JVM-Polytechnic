'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className="flex flex-col md:flex-row items-start justify-between max-w-7xl mx-auto px-6 md:px-10 py-16 gap-12">
      {/* LEFT: Curved Image */}
      <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center md:justify-start">
        <div className="relative w-[95%] md:w-[100%] max-w-[650px]">
          <Image
            src="/images/about/about2.webp"
            alt="Institute Building"
            width={650}
            height={500}
            className="object-cover rounded-none"
            priority
          />
        </div>
      </div>

      {/* RIGHT: About Content */}
      <div className="md:w-1/2 flex flex-col justify-center text-left md:mt-10 lg:mt-16">
        {/* Orange Top Bar */}
        <div className="w-10 h-[3px] bg-[#F05A28] mb-4"></div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl md:text-2xl font-medium text-[#F05A28] mb-8">
          About Us
        </h2>

        {/* Paragraphs */}
        <p className="text-sm sm:text-base text-slate-700 leading-tight mb-4">
          JVM Polytechnic is committed to delivering technical education that empowers students to become skilled, responsible, and innovative professionals. Our institution has established itself as a center of academic excellence and innovation.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-tight mb-4">
          With state-of-the-art infrastructure, industry partnerships, and a focus on holistic learning, we ensure that our students gain not only theoretical knowledge but also hands-on practical skills to excel in the ever-evolving technological landscape.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-tight mb-4">
          Guided by a team of experienced faculty and visionary leadership, JVM Polytechnic continues to foster an environment of creativity, research, and collaboration — preparing future technocrats to make meaningful contributions to society.
        </p>
      </div>
    </section>
  );
}
