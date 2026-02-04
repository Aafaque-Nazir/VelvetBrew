"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-[#070707] z-40"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-bronze-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Typography Content - Left Side */}
        <motion.div
          style={{ y: y1 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-[1px] w-12 bg-bronze-500"></span>
            <span className="text-bronze-500 font-medium tracking-[0.2em] uppercase text-sm">
              Est. 2024
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-8">
            <motion.span
              initial={{ opacity: 0, y: 100, skewY: 10 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="block"
            >
              PURE
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 100, skewY: 10 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "circOut" }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40"
            >
              VELVET
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-white/60 text-lg md:text-xl max-w-lg leading-relaxed mb-10 pl-2 border-l border-white/10"
          >
            Engineering the perfect extraction. Where Italian tradition meets
            modern precision geometry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-6 mt-10 relative z-20"
          >
            <Link href="/products/obsidian-project">
              <Button size="xl" className="rounded-full group">
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="xl"
              className="rounded-full text-white hover:text-white border border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-sm gap-3 pl-2"
            >
              <div className="w-10 h-10 rounded-full bg-bronze-500/20 flex items-center justify-center border border-bronze-500/30">
                <Play className="w-4 h-4 fill-bronze-500" />
              </div>
              <span className="pr-4">The Film</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Image - Right Side - Breaking Grids */}
        <motion.div
          style={{ y: y2 }}
          className="lg:col-span-5 relative h-[50vh] lg:h-[80vh] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bronze-500/5 to-transparent rounded-full blur-3xl opacity-30 animate-pulse" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Link href="/products/obsidian-project" className="cursor-none">
              <Image
                src="/coffee_machine_hero.png"
                alt="Obsidian Machine"
                fill
                className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] z-20 hover:scale-105 transition-transform duration-700"
                priority
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements (Optional decorative text) */}
      <div className="absolute right-0 top-1/3 -rotate-90 origin-right pointer-events-none opacity-10 hidden lg:block">
        <span className="text-9xl font-bold text-white tracking-tighter">
          BREW
        </span>
      </div>
    </section>
  );
}
