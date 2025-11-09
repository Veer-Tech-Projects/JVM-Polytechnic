'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon } from 'lucide-react';
import { searchAll, SearchHit } from '@/lib/search';
import Link from 'next/link';

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
  initialQuery?: string;
};

export default function SearchModal({ open, onClose, initialQuery = '' }: SearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchHit[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
      setIsSearching(false);
    }
  }, [open]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const results = searchAll(query);
      setResults(results);
      setIsSearching(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 30 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed inset-0 z-50 flex ${
              isMobile ? 'items-end' : 'items-start justify-center pt-24'
            } px-4`}
          >
            <div
              className={`w-full max-w-3xl bg-white shadow-xl overflow-hidden ${
                isMobile ? 'rounded-t-2xl' : 'rounded-lg'
              }`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b">
                <SearchIcon className="w-5 h-5 text-slate-600" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search departments, events, faculty, testimonials..."
                  className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-base sm:text-sm"
                />
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  className="p-2 rounded hover:bg-slate-100"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Results */}
              <div className={`px-4 py-3 overflow-y-auto ${isMobile ? 'max-h-[70vh]' : 'max-h-80'}`}>
                {!query.trim() ? (
                  <div className="text-center text-slate-500 py-8 text-sm sm:text-base">
                    Type to search the site...
                  </div>
                ) : isSearching ? (
                  <div className="text-center text-slate-500 py-8 text-sm sm:text-base">
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <ul className="space-y-2">
                    {results.map((r) => (
                      <li key={r.id} className="border rounded-lg hover:bg-slate-50 transition">
                        <Link href={r.href} onClick={onClose} className="block p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-medium text-slate-900">{r.title}</div>
                              {r.snippet && (
                                <div className="text-sm text-slate-600 mt-1">{r.snippet}</div>
                              )}
                            </div>
                            <div className="ml-4 text-xs px-2 py-1 rounded bg-gradient-to-r from-indigo-500 to-blue-600 text-white whitespace-nowrap">
                              {r.kind}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-slate-500 py-8 text-sm sm:text-base">
                    No results found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
