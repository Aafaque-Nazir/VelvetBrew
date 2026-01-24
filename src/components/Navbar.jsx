"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cartContext";

export default function Navbar() {
  const { setCartOpen, cartCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const abortControllerRef = useRef(null);

  // Search Logic with Debounce & AbortController
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const timer = setTimeout(() => {
      // Mock search function simulating API call
      // In real app: fetch(`/api/search?q=${query}`, { signal: abortControllerRef.current.signal })

      const mockDb = [
        {
          name: "The Obsidian Project",
          type: "Machine",
          url: "/products/obsidian-project",
        },
        {
          name: "Classic Lusso",
          type: "Machine",
          url: "/products/classic-lusso",
        }, // We need to handle this product id later
        { name: "Precision Grinder", type: "Accessory", url: "/accessories" },
        { name: "Ethiopian Yirgacheffe", type: "Bean", url: "/beans" },
      ];

      const filtered = mockDb.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="mx-auto max-w-7xl backdrop-blur-md bg-black/80 border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl relative z-50">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-white"
          >
            VELVET<span className="text-bronze-500">BREW</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/machines">Machines</NavLink>
            <NavLink href="/accessories">Accessories</NavLink>
            <NavLink href="/beans">Beans</NavLink>
            <NavLink href="/about">Story</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-bronze-500 transition-colors"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="text-white hover:text-bronze-500 transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-bronze-500 text-[10px] text-black font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Button
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => (window.location.href = "/machines")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-0 right-0 z-40 px-6"
          >
            <div className="mx-auto max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
              <div className="relative mb-6">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search machinery, beans, accessories..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-bronze-500 transition-colors"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>

              {query && (
                <div className="space-y-2">
                  {results.length > 0 ? (
                    results.map((result, idx) => (
                      <Link
                        key={idx}
                        href={result.url}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors group"
                      >
                        <span className="text-white font-medium">
                          {result.name}
                        </span>
                        <span className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-2">
                          {result.type}{" "}
                          <ArrowRight
                            size={12}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-bronze-500"
                          />
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-white/40 text-center py-4">
                      No results found.
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-white/80 hover:text-bronze-500 transition-colors uppercase tracking-wide"
    >
      {children}
    </Link>
  );
}
