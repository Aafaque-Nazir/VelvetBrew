"use client";
import { motion } from "framer-motion";
import { Thermometer, Gauge, Zap, Droplets, Layers, Cpu } from "lucide-react";

export default function FeatureShowcase() {
  return (
    <section className="py-32 bg-[#070707] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-bronze-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-bronze-500 font-medium tracking-widest uppercase text-sm block mb-4"
          >
            Engineering
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter max-w-2xl"
          >
            Precision in <span className="text-white/40">Every Detail.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          {/* Card 1: The Engine (Large) */}
          <BentoCard
            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#0f0e0e]"
            delay={0.1}
          >
            <div className="h-full flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:scale-125 transition-transform duration-700">
                <Cpu size={200} />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-bronze-500/10 flex items-center justify-center text-bronze-500 mb-6 border border-bronze-500/20">
                  <Gauge size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  9-Bar Extraction Technology
                </h3>
                <p className="text-white/50 leading-relaxed max-w-sm">
                  Our proprietary pump system mimics the pressure curve of a
                  traditional lever machine. Starting with a gentle pre-infusion
                  and ramping up to a stable 9 bars for syrupy, tiger-striped
                  crema.
                </p>
              </div>

              <div className="mt-8 relative h-32 w-full bg-grid-white/[0.05] border-t border-white/5 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                {/* Animated Line Graph Simulation */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-bronze-500 shadow-[0_0_20px_rgba(217,119,6,0.5)] animate-pulse" />
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Temperature (Tall) */}
          <BentoCard
            className="md:col-span-1 md:row-span-2 bg-[#151515]"
            delay={0.2}
          >
            <div className="h-full flex flex-col items-center justify-center text-center relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bronze-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="text-6xl font-bold text-white mb-2 tabular-nums tracking-tighter">
                93<span className="text-bronze-500">°</span>
              </h3>
              <p className="text-sm uppercase tracking-widest text-white/40 mb-8">
                PID Controlled
              </p>

              <div className="w-16 h-48 bg-white/5 rounded-full relative overflow-hidden border border-white/10">
                <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-bronze-900 to-bronze-500 transition-all duration-1000 group-hover:h-[75%]" />
              </div>

              <div className="mt-8 text-white/60 text-sm px-4">
                <Thermometer
                  size={16}
                  className="inline mr-2 text-bronze-500"
                />
                Stable to 0.5°C
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Materials (Wide/Small) */}
          <BentoCard
            className="md:col-span-1 md:row-span-1 bg-[#151515]"
            delay={0.3}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">Velvet & Steel</h4>
                <p className="text-xs text-white/40">
                  Aircraft grade aluminum chassis.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: Speed (Wide/Small) */}
          <BentoCard
            className="md:col-span-1 md:row-span-1 bg-[#151515]"
            delay={0.4}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">3s Heat Up</h4>
                <p className="text-xs text-white/40">ThermoJet® System.</p>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      className={`rounded-3xl p-6 border border-white/10 hover:border-bronze-500/30 transition-all duration-500 relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
