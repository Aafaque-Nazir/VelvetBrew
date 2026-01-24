"use client";
import React from "react";
import { Coffee } from "lucide-react";
import { motion } from "framer-motion";

export default function MaintenanceScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0f0e0e] text-white flex flex-col items-center justify-center p-6 text-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-bronze-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl"
      >
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Coffee size={80} className="text-bronze-500 relative z-10" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-bronze-500 rounded-full blur-xl"
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Brewing<span className="text-bronze-500">.</span>
        </h1>

        <p className="text-xl text-white/60 mb-12 leading-relaxed">
          We are currently enhancing the VelvetBrew experience.
          <br />
          The bar will reopen shortly with something extraordinary.
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="h-full w-1/2 bg-bronze-500"
            />
          </div>
          <p className="text-xs font-bold tracking-widest text-white/30 uppercase">
            System Upgrade in Progress
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-8 text-white/20 text-sm flex gap-4">
        <span>&copy; 2026 VelvetBrew Inc.</span>
        <button
          onClick={() => (window.location.href = "/api/auth/signin")}
          className="hover:text-white transition-colors"
        >
          Staff Login
        </button>
      </div>
    </div>
  );
}
