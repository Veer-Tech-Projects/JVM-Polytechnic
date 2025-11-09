"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { departments } from "@/data/departments";
import { faculty } from "@/data/faculty";
import { motion } from "framer-motion";

const DepartmentPage = () => {
  const { slug } = useParams();
  const department = departments.find((d) => d.slug === slug);

  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Department not found.
      </div>
    );
  }

  const departmentFaculty = faculty.filter((f) => f.department === slug);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ======= Department Heading ======= */}
      <div className="text-center mb-10 mt-8 px-4">
        <div className="relative inline-block overflow-hidden">
          <h1
            className="text-xl sm:text-3xl md:text-3xl font-bold tracking-[0.10em] uppercase text-[#b8921d] relative select-none font-[serif]">
            Department of {department.name.replace("Department of ", "")}
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              animate={{ x: ["100%", "-100%"] }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2.2,
              }}
            >
              <div className="absolute top-0 left-0 w-[120px] h-full bg-white/60 rounded-md" />
            </motion.div>
          </h1>
        </div>
        <div className="w-14 sm:w-16 h-[3px] bg-[#f15a29] mx-auto mt-3 rounded-full" />
      </div>

      {/* ======= Banner Image ======= */}
      <div className="relative w-full flex justify-center items-center my-6">
        <Image
          src={department.bannerImage || "/images/departments/placeholder-banner.jpg"}
          alt={`${department.name} Banner`}
          width={800}
          height={400}
          className="object-contain max-w-[90%] sm:max-w-[80%] md:max-w-[60%] rounded-xl"
          priority
        />

        {/* Hex overlay */}
        <Image
          src="/images/events/events-hex.png"
          alt="Hex Overlay"
          width={250}
          height={200}
          className="absolute bottom-[-60.5px] sm:bottom-[-40px] md:bottom-[-117px] left-1/2 -translate-x-1/2 w-[260px] sm:w-[250px] md:w-[500px]"
        />
      </div>

     {/* ======= About Section ======= */}
      <section
        className="max-w-6xl mx-auto px-5 sm:px-6 mt-22 sm:mt-20 md:mt-40 text-left">
        <div
          className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-yellow-100">
          {/* === Headline with colored bar === */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Left bar */}
            <div className="w-[2px] sm:w-[3px] md:w-[3px] h-5 sm:h-8 md:h-6 bg-[#b8921d] rounded-full shadow-sm" />
            
            {/* Headline */}
            <h2
              className="text-lg sm:text-2xl md:text-2xl font-semibold text-gray-800 font-[serif]tracking-wide">
              About Department
            </h2>
          </div>

          {/* === Paragraph === */}
          <p
            className="text-gray-700 text-sm sm:text-lg leading-relaxed sm:leading-8">
            {department.description}
          </p>
        </div>
      </section>


      {/* ======= Faculties Section ======= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20 mt-14 sm:mt-22">
        <div className="text-center mb-10">
          <div className="relative inline-block overflow-hidden">
            <h2
              className="text-xl sm:text-3xl md:text-3xl font-bold tracking-[0.10em] uppercase text-[#b8921d] relative select-none font-[serif]">
              Faculties
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                animate={{ x: ["110%", "-110%"] }} // full sweep
                transition={{
                  duration: 1.2, // ✅ smooth, not too fast
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1.8, // ⚖ total cycle ≈ 3s
                }}
              >
                <div className="absolute top-0 left-0 w-[80px] h-full bg-white/50 rounded-md blur-[1px]" />
              </motion.div>
            </h2>
          </div>
          
          <div className="w-14 sm:w-16 h-[3px] bg-[#f15a29] mx-auto mt-3 rounded-full" />
        </div>

        {/* Faculty Cards Grid */}
        <div
          className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {departmentFaculty.map((fac) => (
            <div
              key={fac.id}
              className="group bg-white rounded-3xl border border-gray-100 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] transform hover:-translate-y-2 transition-all duration-500 overflow-hidden w-[90%] sm:w-full max-w-sm">
              <div className="relative w-full h-72 sm:h-64">
                <Image
                  src={fac.image || "/images/faculty/placeholder.jpg"}
                  alt={fac.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 sm:p-6 text-center">
                <h3
                  className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                  {fac.name}
                </h3>
                {fac.title && (
                  <p
                    className="text-yellow-600 font-medium mt-1 text-sm sm:text-base">
                    {fac.title}
                  </p>
                )}
                {fac.bio && (
                  <p
                    className="
                      text-gray-600 text-sm sm:text-[15px] mt-4 leading-relaxed
                    "
                  >
                    {fac.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DepartmentPage;
