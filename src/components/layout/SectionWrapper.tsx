"use client";

import React from "react";
import clsx from "clsx";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const SectionWrapper = ({ id, className, children }: SectionWrapperProps) => {
  return (
    <section
      id={id}
      className={clsx(
        "relative w-full px-4 sm:px-6 lg:px-12 py-15 md:py-18 overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
