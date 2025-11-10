"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

const Principal = () => {
  return (
    <section
      id="principal" // ✅ main section anchor for search like “principal” or “chairman”
      className="relative bg-[#f4f5f5] mt-8 py-12 px-6 md:px-20 md:py-12 md:mt-3 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-10 mt-20">

        {/* LEFT — Quote Box */}
        <div
          id="principal-quote" // ✅ searchable for “education quote”, “principal message”, etc.
          className="relative flex flex-col gap-4 lg:-mt-80 lg:-left-13 -mt-20 ml-2"
        >
          {/* Quote Icon */}
          <div id="quote-icon" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-19 lg:h-19 bg-transparent">
            <Quote
              className="w-full h-full text-[#c3c3c3] transform -scale-x-100 -scale-y-100"
              strokeWidth={1.3}
            />
          </div>

          {/* Paragraph Text */}
          <p
            id="principal-quote-text" // ✅ for search “education is the foundation”, etc.
            className="text-[#939393] italic font-bold text-[16px] sm:text-[18px] lg:text-[21px] leading-snug tracking-normal max-w-xs sm:max-w-sm lg:max-w-md pl-1"
          >
            Education is the foundation upon which dreams are built, and at our
            college, we empower every student to rise, achieve, and inspire.
          </p>
        </div>

        {/* MIDDLE — Orange Shape & Principal */}
        <div
          id="principal-image-wrapper" // ✅ for search “principal photo”, “principal image”, etc.
          className="relative w-full flex justify-center items-center"
        >
          {/* Orange Hex Shape */}
          <div className="relative flex justify-center items-center scale-90 sm:scale-100 lg:scale-110 xl:scale-150">
            <Image
              id="principal-hex-shape" // ✅ hex background shape
              src="/images/Principal/hex-orange3.png"
              alt="Shape"
              width={260}
              height={200}
              className="drop-shadow-xl lg:w-[280px]"
              priority
            />

            {/* Principal Image Overlay */}
            <div
              id="principal-photo" // ✅ main principal image
              className="absolute -top-2 sm:top-7 lg:-top-2 left-8 lg:left-9"
            >
              <Image
                src="/images/Principal/principal.png"
                alt="Principal"
                width={215}
                height={260}
                className="object-contain lg:w-[230px]"
                priority
              />
            </div>
          </div>
        </div>

        {/* RIGHT — Text Section */}
        <div
          id="principal-text-section" // ✅ for search “chairman”, “management team”, etc.
          className="flex justify-start ml-2 lg:justify-end lg:pl-24 xl:pl-10 lg:mt-12"
        >
          <div className="max-w-xs sm:max-w-sm lg:max-w-sm">
            <h2
              id="principal-title" // ✅ “Chairman & Management” heading
              className="text-[20px] sm:text-[22px] lg:text-[26px] font-semibold leading-tight text-[#f05a28]"
            >
              Chairman &<br /> Management
            </h2>

            <div id="principal-title-bar" className="w-10 h-[3px] lg:w-14 lg:h-[4px] bg-[#f05a28] my-2 lg:my-3" />

            <h3
              id="principal-name" // ✅ “Dr. Prabhakar Basavaprabhu Kore”
              className="text-[17px] sm:text-[18px] lg:text-[19px] font-bold text-gray-600 leading-snug mb-4 mt-4 lg:mt-7"
            >
              Dr. Prabhakar Basavaprabhu Kore
            </h3>

            <p
              id="principal-description" // ✅ first description paragraph
              className="text-[14px] sm:text-[15px] lg:text-[16px] text-gray-900 leading-snug mb-4"
            >
              Chairman, KLE Society, Belagavi. Chancellor, KLE Academy of Higher
              Education & Research (KAHER), Belagavi. Chancellor, KLE Technological
              University, Hubballi.
            </p>

            <p
              id="principal-bio" // ✅ extended bio
              className="text-[14px] sm:text-[15px] lg:text-[16px] text-gray-600 leading-snug"
            >
              A multi-faceted personality with significant contributions to
              education, agriculture, healthcare, politics, and community welfare,
              creating a strong impact across national & international levels.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Principal;
