"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowBigUpDash,
  Eye,
  Copyright,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { departments } from "@/data/departments"; // ✅ imported same as navbar

const Footer: React.FC = () => {
  const [views, setViews] = useState<number>(0);
  const [showScroll, setShowScroll] = useState<boolean>(false);

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const sixHours = 6 * 60 * 60 * 1000;
    const now = Date.now();

    const fetchViews = async () => {
      try {
        const res = await fetch("/api/website-views");
        const data = await res.json();
        setViews(data.value || 0);
        localStorage.setItem("lastVisit", now.toString());
      } catch (err) {
        console.error("Failed to fetch views:", err);
        setViews(0);
      }
    };

    if (!lastVisit || now - parseInt(lastVisit) > sixHours) {
      fetchViews();
    } else {
      // optional: still show previous value from localStorage
      fetchViews();
    }

    const handleScroll = () => setShowScroll(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <footer className="w-full bg-black text-white relative">
        {/* ✅ Main Footer Section */}
        <div className="w-full px-6 py-25 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-10 max-w-screen-2xl mx-auto">

          {/* ✅ Column 1: Logo + Contact Info */}
          <div className="text-sm md:text-base">
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              <Image
                src="/images/hero/jvm-logo2.png"
                alt="JVM Polytechnic Logo"
                width={100}
                height={40}
                className="object-contain md:w-[165px] md:h-[95px]"
              />
            </div>
            <ul className="space-y-2 md:space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="text-orange-500 w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="text-orange-500 w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">info@jvmpolytechnic.ac.in</span>
              </li>
              <li className="flex items-start gap-2 leading-relaxed">
                <MapPin className="text-orange-500 w-3.5 h-3.5 mt-1 flex-shrink-0 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">
                  JVM Polytechnic, Main Road, Belagavi, Karnataka - 590001
                </span>
              </li>
            </ul>
          </div>

          {/* ✅ Column 2: Departments (desktop only) */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wide">
              Departments
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              {departments.map((dept) => (
                <li key={dept.slug}>
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="hover:text-orange-500 transition"
                  >
                    {dept.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 mt-8">
              <Link href="https://facebook.com" className="hover:text-orange-500"><Facebook className="w-5 h-5" /></Link>
              <Link href="https://twitter.com" className="hover:text-orange-500"><Twitter className="w-5 h-5" /></Link>
              <Link href="https://instagram.com" className="hover:text-orange-500"><Instagram className="w-5 h-5" /></Link>
              <Link href="https://linkedin.com" className="hover:text-orange-500"><Linkedin className="w-5 h-5" /></Link>
            </div>
          </div>

          {/* ✅ Column 3: Quick Links (desktop only, updated) */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/vision" className="hover:text-orange-500 transition">Vision & Mission</Link></li>
              <li><Link href="/about" className="hover:text-orange-500 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* ✅ Column 4: Visitor Counter (desktop) */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold text-lg shadow-md">
              <Eye className="w-5 h-5 animate-eye-blink origin-center" />
              {views.toLocaleString()}+
            </div>
            <p className="text-gray-400 text-xs mt-3">Website Views</p>
          </div>

          {/* ✅ Mobile merged grid (Departments + Quick Links) */}
          <div className="md:hidden grid grid-cols-2 gap-8 mt-8">
            {/* Departments */}
            <div>
              <h3 className="font-semibold text-white mb-3 uppercase text-sm tracking-wide">
                Departments
              </h3>
              <ul className="space-y-1.5 text-gray-300 text-xs">
                {departments.map((dept) => (
                  <li key={dept.slug}>
                    <Link
                      href={`/departments/${dept.slug}`}
                      className="hover:text-orange-500"
                    >
                      {dept.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links (updated mobile) */}
            <div>
              <h3 className="font-semibold text-white mb-3 uppercase text-sm tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-1.5 text-gray-300 text-xs">
                <li><Link href="/vision" className="hover:text-orange-500">Vision & Mission</Link></li>
                <li><Link href="/about" className="hover:text-orange-500">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-orange-500">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* ✅ Mobile bottom: Social + Views */}
          <div className="md:hidden flex items-center justify-between mt-8">
            <div className="flex items-center gap-3">
              <Link href="https://facebook.com" className="hover:text-orange-500"><Facebook className="w-4 h-4" /></Link>
              <Link href="https://twitter.com" className="hover:text-orange-500"><Twitter className="w-4 h-4" /></Link>
              <Link href="https://instagram.com" className="hover:text-orange-500"><Instagram className="w-4 h-4" /></Link>
              <Link href="https://linkedin.com" className="hover:text-orange-500"><Linkedin className="w-4 h-4" /></Link>
            </div>

            <div className="flex items-center gap-1 bg-orange-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-md mr-18 md:mr-0">
              <Eye className="w-3.5 h-3.5 animate-eye-blink origin-center" />
              {views.toLocaleString()}+
            </div>
          </div>
        </div>

        {/* ✅ Copyright Section */}
        <div className="bg-white text-gray-500 text-[12px] md:text-base flex items-center justify-center py-5 md:py-6 ">
          <p className="text-center font-semibold flex items-center gap-1 md:gap-2 mr-10 md:mr-0">
            <Copyright className="w-4 h-4 md:w-5 md:h-5" />
            2025 JVM Polytechnic — All Rights Reserved
          </p>
        </div>
      </footer>

      {/* ✅ Scroll-to-top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-3 right-3 md:bottom-3.5 md:right-8 bg-orange-600 hover:bg-orange-700 text-white p-2.5 md:p-3 rounded-full shadow-lg transition-all"
          aria-label="Scroll to top"
        >
          <ArrowBigUpDash className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      )}
    </>
  );
};

export default Footer;
