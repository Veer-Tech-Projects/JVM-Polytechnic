'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, ChevronDown } from 'lucide-react';
import { departments } from '@/data/departments';
import MobileSidebar from '@/components/common/MobileSidebar';
import SearchModal from '@/components/common/SearchModal';

/* Nav item type + data */
type NavItem = {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Departments',
    href: '/departments',
    dropdown: departments.map((d) => ({ label: d.name, href: `/departments/${d.slug}` })),
  },
  { label: 'Events', href: '/events' },
  { label: 'Vision', href: '/vision' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname() ?? '/';
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<number | null>(null);

  function handleMouseEnter(label: string) {
    if (dropdownRef.current) window.clearTimeout(dropdownRef.current);
    setOpenDropdown(label);
  }
  function handleMouseLeave() {
    dropdownRef.current = window.setTimeout(() => setOpenDropdown(null), 120);
  }

  const dropdownVariants = { hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  return (
    <>
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-[#f15a29] text-white flex items-center justify-center font-bold">
                  J
                </div>
                <span className="text-lg font-semibold text-slate-900">JVM Polytechnic</span>
              </Link>
            </div>

            {/* Middle: nav items (centered) */}
            <nav className="hidden lg:flex items-center gap-3" aria-label="Primary">
              {NAV_ITEMS.map((item) => {
                const hasDropdown = !!item.dropdown?.length;
                const isActive = item.href && (pathname === item.href || pathname.startsWith(item.href + '/'));

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                    onMouseLeave={() => hasDropdown && handleMouseLeave()}
                  >
                    <Link
                      href={item.href ?? '#'}
                      className={`px-4 py-2 rounded-md inline-flex items-center gap-2 text-sm font-medium transition
                        ${isActive ? 'bg-[#f15a29] text-white' : 'text-slate-800 hover:text-[#f15a29]'}`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.label}
                      {hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>

                    {/* dropdown */}
                    {hasDropdown && (
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            transition={{ duration: 0.14 }}
                            className="absolute left-0 mt-2 w-55 bg-[#f15a29] shadow-xl text-white z-40"
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <ul className="p-3">
                              {item.dropdown!.map((sub) => (
                                <li key={sub.href}>
                                  <Link href={sub.href} className="block px-3 py-2 rounded hover:bg-slate-10" onClick={() => setOpenDropdown(null)}>
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: search icon and hamburger */}
            <div className="flex items-center gap-4">
              <button
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-md hover:bg-slate-50"
              >
                <Search className="w-5 h-5 text-slate-700" />
              </button>

              <button className="lg:hidden p-2 rounded-md hover:bg-slate-50" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar as separate component */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} navItems={NAV_ITEMS} />

      {/* Search modal as separate component */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
