"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShoppingBag } from "lucide-react";

const products = [
  {
    id: 1,
    name: "The Obsidian Project",
    price: "₹99,999",
    image: "/espresso_black.png",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Classic Lusso",
    price: "₹1,89,999",
    image: "/espresso_chrome.png",
    tag: "Commercial Grade",
  },
  {
    id: 3,
    name: "Precision Grinder",
    price: "₹45,999",
    image: "/grinder_bronze.png",
    tag: "New Arrival",
  },
];

export default function BestSellers() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
              The <span className="text-bronze-500">Collection</span>
            </h2>
            <p className="text-white/60">Curated for the uncompromising.</p>
          </div>
          <Link href="/machines">
            <Button variant="link" className="hidden md:block">
              View All Machines &rarr;
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/machines">
            <Button variant="outline">View All Machines</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-[#151515] rounded-3xl border border-white/5 hover:border-bronze-500/30 transition-all duration-500 overflow-hidden flex flex-col"
    >
      <Link
        href={`/products/${product.id === 1 ? "obsidian-project" : "obsidian-project"}`}
        className="flex-1 flex flex-col"
      >
        {/* Image Area */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1a1a1a]/50">
          {/* Tag */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-white/5">
              {product.tag}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-8">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Quick Add Overlay */}
          <div className="absolute bottom-4 right-4 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <div className="bg-bronze-500 text-black p-3 rounded-full shadow-lg">
              <ShoppingBag size={20} />
            </div>
          </div>
        </div>

        {/* Info Area - Now Unified */}
        <div className="p-6 bg-[#151515] border-t border-white/5">
          <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
          <p className="text-bronze-500 font-medium">{product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}
