"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const eventImages = [
  "/images/hero/events1.jpg",
  "/images/hero/college1.jpg",
];

const Events = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto fade every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % eventImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="events"
      className="bg-white relative px-6 md:px-16 lg:px-20 pt-0 md:pt-0 pb-20 overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-start justify-center relative z-10 space-y-4 md:space-y-6">
          {/* EVENTS HEADING */}
          <div className="relative mb-5 md:mb-7 ml-1 md:ml-0">
            <h2
              className="text-[50px] sm:text-[60px] md:text-[120px] font-extrabold leading-none select-none"
              style={{
                color: "transparent",
                WebkitTextStrokeWidth: "2px",
                WebkitTextStrokeColor: "#ec4899",
              }}
            >
              Events
            </h2>
          </div>

          {/* Overlapping circular images */}
          <div className="relative flex items-center mb-4 md:mb-6 ml-1 md:ml-0">
            <div className="relative flex">
              <div className="relative w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[160px] md:h-[160px] overflow-hidden rounded-full border-1 border-white shadow-md">
                <Image
                  src="/images/events/event1.png"
                  alt="Event 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute left-[85px] sm:left-[80px] md:left-[130px] top-0 w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[160px] md:h-[160px] overflow-hidden rounded-full border-1 border-white shadow-md">
                <Image
                  src="/images/events/event2.png"
                  alt="Event 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute left-[170px] sm:left-[160px] md:left-[260px] top-0 w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[160px] md:h-[160px] overflow-hidden rounded-full border-1 border-white shadow-md">
                <Image
                  src="/images/events/event3.png"
                  alt="Event 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Paragraph */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-sm ml-1 sm:ml-2 md:ml-4">
            Explore the vibrant world of JVM events where innovation meets
            energy. From cultural fests to technical symposiums, every event
            inspires creativity, collaboration, and leadership among students.
            Stay tuned for upcoming programs and moments of pride that define
            JVM’s spirited culture.
          </p>
        </div>

        {/* RIGHT SIDE - Hex Slider */}
        <div className="relative flex justify-center items-center -mt-5 md:mt-0">
          {/* Hex Image Slideshow */}
          <div className="relative w-[280px] h-[180px] sm:w-[360px] sm:h-[240px] md:w-[500px] md:h-[340px]">
            {eventImages.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`Event ${index + 1}`}
                  fill
                  className="object-cover clip-hex-fade brightness-95"
                />
              </div>
            ))}
          </div>

          {/* Bottom Hex Shape */}
          <div className="absolute bottom-[-70px] sm:bottom-[-90px] md:bottom-[-125px] right-[10px] sm:right-[20px] md:right-[50px] w-[300px] sm:w-[400px] md:w-[530px] opacity-100 z-20">
            <Image
              src="/images/events/events-hex.png"
              alt="Hex shape design"
              width={530}
              height={530}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
