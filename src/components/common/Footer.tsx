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
import { departments } from "@/data/departments";

const Footer: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [visitorCount, setVisitorCount] = useState<string>("Loading...");

  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ✅ Fetch visitor count from Google Analytics
  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => {
        if (data.totalUsers) {
          setVisitorCount(data.totalUsers.toString());
        } else {
          setVisitorCount("N/A");
        }
      })
      .catch((err) => {
        console.error("Visitor count fetch failed:", err);
        setVisitorCount("N/A");
      });
  }, []);

  return (
    <>
      <footer className="w-full bg-black text-white relative">
        <div className="w-full px-6 py-16 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
          {/* Logo & Contact */}
          <div className="text-sm md:text-base">
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              <Image
                src="/images/hero/jvm-logo2.png"
                alt="JVM Polytechnic Logo"
                width={90}
                height={95}
                className="object-contain"
              />
            </div>
            <ul className="space-y-2 md:space-y-3 text-gray-300 text-xs md:text-sm">
              <li className="flex items-center gap-2">
                <Phone className="text-orange-500 w-4 h-4" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail className="text-orange-500 w-4 h-4" /> info@jvmpolytechnic.ac.in
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="text-orange-500 w-4 h-4 mt-1" />
                JVM Polytechnic, Main Road, Belagavi, Karnataka - 590001
              </li>
            </ul>
          </div>

          {/* Departments (Desktop) */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wide">
              Departments
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
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

            {/* Social Icons under Departments */}
            <div className="flex justify-center md:justify-start items-center gap-5 mt-8">
              <Link href="https://facebook.com" className="hover:text-orange-500 transition">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com" className="hover:text-orange-500 transition">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://instagram.com" className="hover:text-orange-500 transition">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com" className="hover:text-orange-500 transition">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links (Desktop) */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/vision" className="hover:text-orange-500 transition">
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ✅ Visitor Counter (Desktop) */}
          <div className="hidden md:flex flex-col items-center justify-center pr-4">
            <div className="flex items-center gap-1.5 bg-orange-600/90 px-3 py-1.5 rounded-md shadow min-w-[110px] justify-center">
              <Eye className="w-4 h-4 animate-eye-blink origin-center" />
              <span className="text-sm font-semibold text-white">{visitorCount}</span>
            </div>
            <p className="text-gray-400 text-[11px] mt-1 text-center w-full">Website Visitors</p>
          </div>

          {/* Mobile grid (Departments + Quick Links) */}
          <div className="md:hidden grid grid-cols-2 gap-6 mt-6">
            {/* Departments */}
            <div>
              <h3 className="font-semibold text-white mb-2 uppercase text-sm tracking-wide">
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

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-2 uppercase text-sm tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-1.5 text-gray-300 text-xs">
                <li>
                  <Link href="/vision" className="hover:text-orange-500">
                    Vision & Mission
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-orange-500">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-orange-500">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* ✅ Mobile Social + Visitor Counter */}
            <div className="col-span-2 flex items-center justify-between mt-4 px-0">
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <Link href="https://facebook.com" className="hover:text-orange-500">
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link href="https://twitter.com" className="hover:text-orange-500">
                  <Twitter className="w-4 h-4" />
                </Link>
                <Link href="https://instagram.com" className="hover:text-orange-500">
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link href="https://linkedin.com" className="hover:text-orange-500">
                  <Linkedin className="w-4 h-4" />
                </Link>
              </div>

              {/* Visitor Counter */}
              <div className="flex items-center gap-1 bg-orange-600/90 px-2 py-[2px] rounded-md shadow-sm mr-20">
                <Eye className="w-[12px] h-[13px] animate-eye-blink origin-center" />
                <span className="text-xs font-semibold text-white">{visitorCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-white text-gray-500 text-[12px] md:text-base flex items-center justify-center py-5 md:py-6">
          <p className="text-center font-semibold flex items-center gap-2 mr-3 md:mr-0">
            <Copyright className="w-4 h-4 md:w-5 md:h-5" /> 2025 JVM Polytechnic — All Rights Reserved
          </p>
        </div>
      </footer>

      {/* Scroll-to-top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-2.5 right-3 md:bottom-3 md:right-8 bg-orange-600 hover:bg-orange-700 text-white p-2.5 md:p-3 rounded-full shadow-lg transition-all"
          aria-label="Scroll to top"
        >
          <ArrowBigUpDash className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      )}
    </>
  );
};

export default Footer;
