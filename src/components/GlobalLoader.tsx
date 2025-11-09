"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function GlobalLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a short initial load delay (ensures smooth appearance)
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white">
        {/* JVM Logo */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-5">
          <Image
            src="/images/hero/jvm-logo2.png"
            alt="JVM Polytechnic Logo"
            fill
            className="object-contain opacity-95"
            priority
          />
        </div>

        {/* Clean spinning loader */}
        <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-orange-500 mb-3" />
        <p className="text-gray-300 text-xs sm:text-sm tracking-wide">
          Loading, please wait...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
