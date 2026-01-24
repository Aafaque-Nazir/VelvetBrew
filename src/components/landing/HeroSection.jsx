"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#0f0e0e]">
      {/* Background Gradient/Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bronze-900/20 via-[#0f0e0e] to-[#0f0e0e] z-0" />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-bronze-500 font-medium tracking-widest uppercase text-sm"
          >
            The Art of Extraction
          </motion.span>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tighter">
            Brew <br />
            <span className="text-bronze-500">Perfection</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-md leading-relaxed">
            Experience the ritual of true espresso with machines designed for
            the connoisseur. Precision, power, and elegance in every shot.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/products/obsidian-project">
              <Button size="lg" className="rounded-full">
                Shop Collection
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full">
              Watch Film
            </Button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[500px] w-full flex items-center justify-center"
        >
          {/* Main Image */}
          <div className="relative w-full h-full max-w-[600px] aspect-square">
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-bronze-500/10 blur-[100px] rounded-full" />

            <Image
              src="/coffee_machine_hero.png" // We will ensure this path is correct after generation
              alt="Premium Coffee Machine"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-bronze-500 to-transparent" />
      </motion.div>
    </section>
  );
}
