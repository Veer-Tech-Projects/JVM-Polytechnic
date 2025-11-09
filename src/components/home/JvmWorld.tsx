"use client";

import React from "react";
import Image from "next/image";
import SectionWrapper from "../layout/SectionWrapper";
import { Home, GraduationCap, Trophy, Utensils, BookOpen } from "lucide-react";

const JvmWorld = () => {
  return (
    <SectionWrapper id="jvm-world" className="bg-white">
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center relative">

        {/* LEFT SIDE */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full max-w-[480px] md:max-w-[580px]">
            <Image
              src="/images/gallery/college-students-2(2).png"
              alt="JVM students"
              width={580}
              height={580}
              className="object-cover w-full rounded-[2rem] md:rounded-[3rem]"
            />

            {/* Top-left hex outline */}
            <Image
              src="/images/gallery/hex-shape1.png"
              alt="Outline hex shape"
              width={140}
              height={140}
              className="absolute -top-2 -left-2 w-[90px] md:w-[140px]"
            />

            {/* Eco-friendly icon */}
            <Image
              src="/images/gallery/round3.png"
              alt="Eco friendly campus"
              width={130}
              height={130}
              className="absolute -bottom-2 right-2 md:-right-6 w-[90px] md:w-[130px]"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col justify-center text-gray-600 ml-2 md:ml-0 pr-2 md:pr-0">

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-left">
            <span className="text-gray-400">The </span>
            <span className="text-[#FF6B00]">JVM </span>
            <span className="text-gray-500">World</span>
          </h2>

          {/* Paragraph */}
          <p className="text-sm sm:text-sm md:text-base text-gray-500 leading-relaxed mb-4 md:mb-6 max-w-[600px] text-left">
            JVM Society embodies education, research, and healthcare, enriching
            lives and empowering individuals to become responsible citizens.
            Driven by perseverance, we offer diverse programs, making us a
            preferred study and research destination.
          </p>

          {/* Facilities List */}
          <div className="space-y-1 mb-8 md:mb-22 text-sm sm:text-sm md:text-base font-bold text-gray-800 flex flex-col text-left w-fit">
            {[
              "HOSTEL FACILITIES",
              "STUDENT AFFAIRS",
              "SPORTS FACILITIES",
              "EATERY FACILITIES",
              "LIBRARY FACILITIES",
            ].map((item) => (
              <div
                key={item}
                className="border-b border-gray-400 py-2 w-full hover:text-[#FF6B00] cursor-pointer transition-colors"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Mobile Overlapping Circles */}
          <div className="absolute top-[50%] right-10 flex md:hidden">
            <div className="relative w-[100px] h-[100px]">
              <Image
                src="/images/gallery/round1.png"
                alt="Students"
                width={120}
                height={120}
                className="rounded-full object-cover absolute -left-8 top-2 z-10 w-[95px]"
              />
              <Image
                src="/images/gallery/round2.png"
                alt="Campus"
                width={120}
                height={120}
                className="rounded-full object-cover absolute left-12 top-2 z-0 w-[95px]"
              />
            </div>
          </div>

          {/* Desktop Overlapping Circles (unchanged ✅) */}
          <div className="absolute right-25 top-[50%] translate-y-[-50%] hidden lg:flex">
            <div className="relative w-[170px] h-[170px]">
              <Image
                src="/images/gallery/round1.png"
                alt="Students"
                width={240}
                height={240}
                className="rounded-full object-cover absolute -left-5 top-9 z-10"
              />
              <Image
                src="/images/gallery/round2.png"
                alt="Campus"
                width={240}
                height={240}
                className="rounded-full object-cover absolute left-30 top-8 z-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Icons ✅ one line & smaller on mobile */}
      <div className="mt-0 md:-mt-15 flex flex-wrap justify-center md:justify-end gap-6 md:gap-14 pr-0 md:pr-17 text-center">
        {[
          { icon: <Home strokeWidth={1} className="w-6 h-6 md:w-7 md:h-7 mx-auto mb-1" />, label: "Hostel\nFacilities" },
          { icon: <GraduationCap strokeWidth={1} className="w-6 h-6 md:w-7 md:h-7 mx-auto mb-1" />, label: "Student\nAffairs" },
          { icon: <Trophy strokeWidth={1} className="w-6 h-6 md:w-7 md:h-7 mx-auto mb-1" />, label: "Sports\nFacilities" },
          { icon: <Utensils strokeWidth={1} className="w-6 h-6 md:w-7 md:h-7 mx-auto mb-1" />, label: "Eatery\nFacilities" },
          { icon: <BookOpen strokeWidth={1} className="w-6 h-6 md:w-7 md:h-7 mx-auto mb-1" />, label: "Library\nFacilities" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center hover:text-[#FF6B00] transition-transform duration-300 hover:scale-105"
          >
            {item.icon}
            <span className="whitespace-pre-line leading-tight text-[10px] sm:text-xs md:text-sm font-normal">
              {item.label}
            </span>
          </div>
        ))}
      </div>

    </SectionWrapper>
  );
};

export default JvmWorld;
