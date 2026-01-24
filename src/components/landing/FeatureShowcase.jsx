"use client";
import { motion } from "framer-motion";
import { Thermometer, Gauge, Zap, Droplets } from "lucide-react";

export default function FeatureShowcase() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 bg-[#0f0e0e] text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">
            Precision in <span className="text-bronze-500">Every Detail</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Engineered for the perfect extraction. Our machines combine
            commercial-grade technology with home-friendly design.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Large Feature */}
          <motion.div
            variants={item}
            className="md:col-span-2 bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 hover:border-bronze-500/30 transition-colors group relative overflow-hidden min-h-[300px] flex flex-col justify-end"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <Gauge size={120} />
            </div>
            <div className="relative z-10">
              <div className="bg-bronze-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-bronze-500">
                <Gauge size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">19 Bar Pressure</h3>
              <p className="text-white/60">
                Professional-grade extraction pressure ensures rich crema and
                full-bodied flavor in every shot, matching the standards of top
                Italian cafes.
              </p>
            </div>
          </motion.div>

          {/* Tall Feature */}
          <motion.div
            variants={item}
            className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 hover:border-bronze-500/30 transition-colors group relative overflow-hidden md:row-span-2"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <Thermometer size={120} />
            </div>
            <div className="bg-bronze-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-bronze-500">
              <Thermometer size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">PID Control</h3>
            <p className="text-white/60">
              Digital temperature control (PID) delivers water at precisely the
              right temperature, adjustable in 1-degree increments for optimal
              espresso extraction.
            </p>
            <div className="mt-8 h-32 bg-gradient-to-t from-bronze-500/10 to-transparent rounded-lg" />
          </motion.div>

          {/* Small Feature 1 */}
          <motion.div
            variants={item}
            className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 hover:border-bronze-500/30 transition-colors"
          >
            <div className="bg-bronze-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-bronze-500">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">3 Second Heat Up</h3>
            <p className="text-white/60 text-sm">
              Ready when you are. Our ThermoJet heating system reaches optimum
              extraction temperature in 3 seconds.
            </p>
          </motion.div>

          {/* Small Feature 2 */}
          <motion.div
            variants={item}
            className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 hover:border-bronze-500/30 transition-colors"
          >
            <div className="bg-bronze-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-bronze-500">
              <Droplets size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Low Pressure Infusion</h3>
            <p className="text-white/60 text-sm">
              Gradually increases pressure at the start for an even extraction.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
