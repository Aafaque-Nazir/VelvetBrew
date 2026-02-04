"use client";
import { motion } from "framer-motion";

export default function BrandMarquee() {
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="relative flex overflow-hidden bg-bronze-500 py-6 w-full max-w-[100vw]">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-12 px-6"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="text-4xl md:text-5xl font-bold tracking-tighter text-black uppercase"
            >
              Italian Heritage <span className="mx-4 opacity-50">•</span> Swiss
              Precision <span className="mx-4 opacity-50">•</span> 5-Year
              Warranty <span className="mx-4 opacity-50">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
