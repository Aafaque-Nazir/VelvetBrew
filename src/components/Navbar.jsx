"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cartContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { User, LogOut } from "lucide-react";
import Image from "next/image";

export default function Navbar(props) {
  const { setCartOpen, cartCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false); // Mobile toggle
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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="mx-auto max-w-7xl backdrop-blur-md bg-black/80 border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl relative z-50">
          {/* Logo */}
          <Link href="/" className="block">
            <StaggeredLogo />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/">Home</NavLink>

            {/* Shop Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-bronze-500 uppercase tracking-wide transition-colors py-2">
                Shop{" "}
                <ChevronDown
                  size={14}
                  className="group-hover:rotate-180 transition-transform duration-300"
                />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-2 shadow-2xl min-w-[200px] flex flex-col gap-1 overflow-hidden backdrop-blur-xl">
                  <DropdownLink href="/machines">Machines</DropdownLink>
                  <DropdownLink href="/accessories">Accessories</DropdownLink>
                  <DropdownLink href="/beans">Beans</DropdownLink>
                </div>
              </div>
            </div>

            <NavLink href="/about">Story</NavLink>
            <NavLink href="/contact">Contact</NavLink>
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

            <div className="hidden md:flex items-center gap-4">
              {props.isAdmin && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-bronze-500 hover:text-white transition-colors border border-bronze-500/20 hover:border-bronze-500/50 hover:bg-bronze-500/10 px-3 py-1.5 rounded-full"
                >
                  Admin
                </Link>
              )}
              <AuthButton />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="text-white md:hidden ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[49] bg-[#0f0f0f]/98 backdrop-blur-xl md:hidden flex flex-col pt-24 pb-10 px-6 overflow-y-auto"
          >
            <motion.div
              className="flex flex-col gap-6 flex-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </MobileNavLink>

              {/* Mobile Shop Accordion */}
              <div className="flex flex-col">
                <button
                  onClick={() => setShopMenuOpen(!shopMenuOpen)}
                  className="text-4xl font-bold text-white text-left flex items-center justify-between group"
                >
                  Shop
                  <ChevronDown
                    className={`transition-transform duration-300 text-bronze-500 ${shopMenuOpen ? "rotate-180" : ""}`}
                    size={32}
                  />
                </button>
                <AnimatePresence>
                  {shopMenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col gap-4 pl-4 border-l border-white/10 mt-4"
                    >
                      <MobileSubLink
                        href="/machines"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Machines
                      </MobileSubLink>
                      <MobileSubLink
                        href="/accessories"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Accessories
                      </MobileSubLink>
                      <MobileSubLink
                        href="/beans"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Beans
                      </MobileSubLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MobileNavLink
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                Story
              </MobileNavLink>

              <MobileNavLink
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-6"
            >
              {props.isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center w-full py-3 rounded-full border border-bronze-500/30 text-bronze-500 font-medium uppercase tracking-widest hover:bg-bronze-500/10 transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              <div className="flex justify-center">
                <AuthButton mobile />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-0 right-0 z-[49] px-6"
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

function MobileNavLink({ href, children, onClick }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
    >
      <Link
        href={href}
        onClick={onClick}
        className="text-4xl font-bold text-white hover:text-bronze-500 transition-colors block"
      >
        {children}
      </Link>
    </motion.div>
  );
}

function MobileSubLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-xl text-white/60 hover:text-white transition-colors block py-1"
    >
      {children}
    </Link>
  );
}

function AuthButton({ mobile }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className={`relative group ${!mobile ? "hidden md:block" : ""}`}>
        <Link
          href="/account"
          className="flex items-center gap-3 overflow-hidden rounded-full border border-white/10 p-1 pr-3 hover:border-bronze-500 transition-colors"
        >
          {session.user.image ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={session.user.image}
                alt={session.user.name}
                fill
                sizes="32px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          )}
          <span className="text-sm font-medium text-white max-w-[100px] truncate">
            {session.user.name}
          </span>
        </Link>

        {/* Dropdown */}
        <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-2 shadow-2xl w-48 flex flex-col gap-1">
            <Link
              href="/account"
              className="w-full flex items-center gap-2 text-white hover:bg-white/5 p-2 rounded-lg text-sm transition-colors"
            >
              <User size={16} /> My Account
            </Link>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-2 text-red-500 hover:bg-white/5 p-2 rounded-lg text-sm transition-colors"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="sm"
      className={!mobile ? "hidden md:inline-flex" : ""}
      onClick={() => signIn("google")}
    >
      Login
    </Button>
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

function DropdownLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors whitespace-nowrap"
    >
      {children}
    </Link>
  );
}

function StaggeredLogo() {
  const text = "VELVET BREW";
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
    hover: {
      transition: { staggerChildren: 0.03 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hover: {
      y: -3,
      color: "#D4A373", // bronze-500 equivalent hex
      textShadow: "0px 0px 8px rgba(212,163,115,0.6)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      className="flex overflow-hidden text-2xl font-bold tracking-tighter text-white cursor-pointer"
      variants={container}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="relative inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
