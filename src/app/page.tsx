// src/app/page.tsx
"use client";

import Hero from '@/components/home/Hero';
import StatsSection from '@/components/home/StatsSection';
import DepartmentsSlider from '@/components/home/Departments';
import JvmWorld from "@/components/home/JvmWorld";
import Events from "@/components/home/Events";
import Principal from "@/components/home/Principal";
import { useEffect } from 'react';
import { scrollToId } from '@/lib/scrollToId';

export default function HomePage() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash) setTimeout(() => scrollToId(hash), 200);
  }, []);

  return (
    <>
      <Hero />
      <StatsSection />
      <DepartmentsSlider />
      <JvmWorld />
      <Events/>
      <Principal/>
    </>
  );
}
