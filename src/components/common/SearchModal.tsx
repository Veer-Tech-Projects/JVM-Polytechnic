"use client";

import React, { useEffect, useState, useRef } from "react";
import { X, Search } from "lucide-react";
import { searchAll, SearchHit } from "@/lib/search";
import { scrollToId } from "@/lib/scrollToId";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus the input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // ESC key closes modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Run search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setResults(searchAll(query));
  }, [query]);

  // Handle result click (scroll or route)
  function handleResultClick(hit: SearchHit) {
    const href = hit.href || "";
    const [pathPart, hashPart] = href.split("#");
    const fragment = hashPart ? `#${hashPart}` : null;
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "";
    const resolvedPath = pathPart === "" ? "/" : pathPart;

    // same-page scroll
    if (resolvedPath === currentPath) {
      if (fragment) scrollToId(fragment);
      onClose();
      return;
    }

    // navigate then scroll
    const target = fragment
      ? `${resolvedPath}#${fragment.slice(1)}`
      : resolvedPath;
    router.push(target);

    if (fragment) {
      setTimeout(() => scrollToId(fragment), 500);
    }
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[999] flex items-start justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl mt-20 p-6 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>

              {/* Input */}
              <div className="flex items-center gap-2 mb-4 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#F05A28]">
                <Search className="text-gray-400" size={18} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search departments, faculty, vision, contact..."
                  className="w-full outline-none text-sm text-gray-800 bg-transparent"
                />
              </div>

              {/* Results */}
              {results.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-6">
                  {query.trim()
                    ? "No results found."
                    : "Type to start searching."}
                </p>
              ) : (
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {results.map((r) => (
                    <li
                      key={r.id}
                      className="border border-gray-100 rounded-lg hover:bg-slate-50 transition"
                    >
                      <button
                        onClick={() => handleResultClick(r)}
                        className="w-full text-left block p-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm font-medium text-slate-900">
                              {r.title}
                            </div>
                            {r.snippet && (
                              <div className="text-xs text-slate-600 mt-1">
                                {r.snippet}
                              </div>
                            )}
                          </div>
                          <div className="ml-3 text-[11px] px-2 py-0.5 rounded bg-[#F05A28] text-white uppercase">
                            {r.kind}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
