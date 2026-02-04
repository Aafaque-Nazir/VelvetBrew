"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ImmersiveStory() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-[#0f0e0e] relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          style={{ opacity, y: textY }}
          className="text-center mb-20 relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
            The Art of <span className="text-bronze-500">Extraction</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Every machine is a testament to the pursuit of perfection. Milled
            from chaos, refined by obsession.
          </p>
        </motion.div>

        <motion.div
          style={{ scale }}
          className="relative h-[60vh] md:h-[80vh] w-full rounded-2xl overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          {/* Placeholder for a high-quality lifestyle video or image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-bronze-900/20 to-transparent z-10 mix-blend-overlay" />
          <Image
            src="/coffee_machine_hero.png" // Reusing hero image for now, ideally a lifestyle shot
            alt="Art of Extraction"
            fill
            className="object-cover hover:scale-105 transition-transform duration-[2s]"
          />

          <div className="absolute bottom-12 left-12 z-20 max-w-md">
            <div className="h-1 w-20 bg-bronze-500 mb-6" />
            <p className="text-white text-xl md:text-2xl font-light italic">
              "For those who understand that coffee is not just a drink, but a
              ritual."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
