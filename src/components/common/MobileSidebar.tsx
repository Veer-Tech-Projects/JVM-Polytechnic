'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronDown, ChevronRight } from 'lucide-react';

type NavItem = {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
};

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
};

export default function MobileSidebar({ open, onClose, navItems }: MobileSidebarProps) {
  const [openAcc, setOpenAcc] = React.useState<Record<string, boolean>>({});

  function toggle(key: string) {
    setOpenAcc((p) => ({ ...p, [key]: !p[key] }));
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed inset-y-0 left-0 z-50 w-[78%] max-w-xs bg-white shadow-lg"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            {/* Header with logo */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9">
                  <Image
                    src="/images/logo/jvm-logo2.png"
                    alt="JVM Polytechnic Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="font-semibold text-slate-900">JVM Polytechnic</div>
              </div>

              <button onClick={onClose} aria-label="Close menu" className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav items */}
            <div className="p-4 overflow-auto h-[calc(100vh-72px)]">
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => {
                  const hasDropdown = !!item.dropdown?.length;
                  const isOpen = !!openAcc[item.label];

                  return (
                    <div key={item.label} className="border-b pb-2">
                      <div className="flex items-center justify-between">
                        {/* Toggle behavior for departments */}
                        {hasDropdown ? (
                          <button
                            onClick={() => toggle(item.label)}
                            className="py-3 w-full text-left text-base font-medium flex justify-between items-center"
                          >
                            {item.label}
                            {isOpen ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        ) : (
                          <Link
                            href={item.href ?? '#'}
                            className="py-3 block w-full text-base font-medium"
                            onClick={onClose}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>

                      {/* Dropdown links */}
                      {hasDropdown && isOpen && (
                        <div className="mt-2 pl-3">
                          {item.dropdown!.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block py-2 text-sm text-slate-700"
                              onClick={onClose}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
