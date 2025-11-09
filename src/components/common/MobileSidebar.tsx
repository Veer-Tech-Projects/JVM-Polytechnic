'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed inset-y-0 left-0 z-50 w-[78%] max-w-xs bg-white shadow-lg"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-md bg-[#f15a29] text-white flex items-center justify-center font-bold">J</div>
                <div className="font-semibold text-slate-900">JVM Polytechnic</div>
              </div>
              <button onClick={onClose} aria-label="Close menu" className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 overflow-auto h-[calc(100vh-72px)]">
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => {
                  const has = !!item.dropdown?.length;
                  return (
                    <div key={item.label} className="border-b pb-2">
                      <div className="flex items-center justify-between">
                        <Link href={item.href ?? '#'} className="py-3 block w-full text-base font-medium" onClick={() => !has && onClose()}>
                          {item.label}
                        </Link>

                        {has && (
                          <button
                            onClick={() => toggle(item.label)}
                            aria-expanded={!!openAcc[item.label]}
                            className="p-2"
                          >
                            {openAcc[item.label] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                        )}
                      </div>

                      {has && openAcc[item.label] && (
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
