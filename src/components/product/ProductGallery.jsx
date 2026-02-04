"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductGallery({ images, selectedImage }) {
  const [activeImage, setActiveImage] = useState(selectedImage || images[0]);

  // Update active image when selectedImage prop changes (e.g. color switch)
  useEffect(() => {
    if (selectedImage) setActiveImage(selectedImage);
  }, [selectedImage]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full bg-[#151515] rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl">
        <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-50" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full p-12"
          >
            <Image
              src={activeImage}
              alt="Product View"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom/Overlay hint could go here */}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden border border-white/5 bg-[#1a1a1a] transition-all",
              activeImage === img
                ? "ring-2 ring-bronze-500 border-transparent"
                : "hover:border-white/20",
            )}
          >
            <Image
              src={img}
              alt={`View ${idx + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
