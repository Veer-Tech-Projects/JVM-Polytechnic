// src/app/page.tsx
import Hero from '@/components/home/Hero';
import StatsSection from '@/components/home/StatsSection';
import DepartmentsSlider from '@/components/home/Departments';
import JvmWorld from "@/components/home/JvmWorld";
import Events from "@/components/home/Events";
import Principal from "@/components/home/Principal";


export default function HomePage() {
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
