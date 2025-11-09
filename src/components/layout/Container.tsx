import React from 'react';
import clsx from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        // White background + square edges
       'mx-auto w-full max-w-7xl px-4 sm:px-4 lg:px-5 bg-white',
        className
      )}
    >
      {children}
    </div>
  );
}
