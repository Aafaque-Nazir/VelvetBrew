"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";

export default function BestSellers() {
  const featuredProducts = products.slice(0, 4); // Take first 4 products
  const [hoveredProduct, setHoveredProduct] = useState(featuredProducts[0]);

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden min-h-[800px] flex items-center">
      {/* Dynamic Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={hoveredProduct ? hoveredProduct.id : "empty"}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.2, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 z-0 bg-[#0a0a0a]"
        >
          {hoveredProduct && (
            <Image
              src={
                hoveredProduct.image ||
                hoveredProduct.colors?.[0]?.image ||
                hoveredProduct.gallery?.[0]
              }
              alt="Background"
              fill
              className="object-cover opacity-50 blur-sm"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text & List */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tighter"
          >
            Curated <span className="text-bronze-500">Works</span>
          </motion.h2>

          <div className="space-y-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onMouseEnter={() => setHoveredProduct(product)}
                className="group block"
              >
                <div
                  className={`p-6 border-b border-white/10 flex items-center justify-between transition-all duration-300 ${hoveredProduct.id === product.id ? "pl-10 border-bronze-500/50 bg-white/5" : "hover:pl-4 hover:border-white/30"}`}
                >
                  <div>
                    <h3
                      className={`text-2xl md:text-3xl font-bold transition-colors ${hoveredProduct.id === product.id ? "text-white" : "text-white/40 group-hover:text-white"}`}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-bronze-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.tagline || product.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-lg font-medium transition-colors ${hoveredProduct.id === product.id ? "text-white" : "text-white/40"}`}
                    >
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <ArrowUpRight
                      className={`transition-transform duration-300 ${hoveredProduct.id === product.id ? "translate-x-0 opacity-100 text-bronze-500" : "-translate-x-4 opacity-0"}`}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/machines"
              className="text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest border-b border-transparent hover:border-white pb-1"
            >
              View Full Catalogue
            </Link>
          </div>
        </div>

        {/* Right Side: Preview Image (Floating) */}
        <div className="hidden md:flex justify-center items-center relative h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredProduct ? hoveredProduct.id : "preview"}
              initial={{ opacity: 0, y: 50, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -50, rotate: -5 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full max-h-[500px]"
            >
              {hoveredProduct && (
                <Image
                  src={
                    hoveredProduct.image ||
                    hoveredProduct.colors?.[0]?.image ||
                    hoveredProduct.gallery?.[0]
                  }
                  alt={hoveredProduct.name}
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Decorative Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full z-[-1] animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-bronze-500/10 rounded-full z-[-1]" />
        </div>
      </div>
    </section>
  );
}
