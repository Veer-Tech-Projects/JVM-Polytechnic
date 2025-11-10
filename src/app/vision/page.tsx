"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Vision = () => {
  const orange = "#F05A28";

  return (
    <section id="vision-section" className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-16 py-14 md:py-20 overflow-hidden">
      {/* ===== TOP SECTION (VISION) ===== */}
      <div id="vision-content" className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center order-1 md:order-none"
        >
          <div className="relative w-[90%] sm:w-[60%] md:w-full max-w-[550px]">
            <Image
              src="/images/vision/vision1.webp"
              alt="Vision"
              width={550}
              height={550}
              className="object-contain rounded-2xl"
            />
          </div>
        </motion.div>

        {/* VISION TEXT */}
        <motion.div
          id="vision-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-left order-2"
        >
          <div
            className="h-[3px] w-7 md:w-10 mb-2 md:mb-3"
            style={{ backgroundColor: orange }}
          />
          <h2
            id="vision-heading"
            className="text-lg sm:text-xl md:text-[28px] font-medium"
            style={{ color: orange }}
          >
            Vision
          </h2>

          <p
            id="vision-description"
            className="mt-3 md:mt-7 text-[14px] sm:text-[15px] md:text-[15px] text-gray-800 leading-tight"
          >
            To continually evolve as an organisation symbolising global excellence
            in standards and commitments in the domains of quality education,
            healthcare, and research, while at the same time adopting, nurturing,
            and propagating democratic values, charitable virtues, and a
            philanthropic culture.
          </p>
        </motion.div>
      </div>

      {/* ===== MISSION SECTION ===== */}
      <motion.div
        id="mission-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-14 md:mt-10"
      >
        <div
          className="h-[3px] w-8 md:w-11 mb-2 md:mb-3"
          style={{ backgroundColor: orange }}
        />
        <h2
          id="mission-heading"
          className="text-lg sm:text-xl md:text-[28px] font-medium"
          style={{ color: orange }}
        >
          Mission
        </h2>

        <div id="mission-points" className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-10 mt-8">
          {[
            "To propagate, support, and champion the cause of ‘Excellence through Education’ for aspirants across the globe.",
            "To recruit and groom well-qualified, well-trained, and efficient human resources committed to the accomplishment of individual and organisational excellence through continual learning.",
            "To create infrastructure and state-of-the-art educational facilities and provide opportunities especially for rural students.",
            "To provide state-of-the-art healthcare facilities and services to people in both urban and rural areas.",
            "To contribute to the welfare of the farming community by facilitating education and adoption of modern farm practices.",
            "To set, develop, and maintain high standards for quality education in KLE institutions through best practices.",
            "To constantly redesign learning by addressing educational, social, and community demands.",
            "To facilitate experiential learning and produce ethically responsible professionals.",
          ].map((point, i) => (
            <div key={i} id={`mission-point-${i + 1}`} className="flex items-start gap-3">
              <div
                className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: orange }}
              >
                <CheckCircle size={16} className="text-white md:size-[18px]" />
              </div>
              <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-800 leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Vision;
