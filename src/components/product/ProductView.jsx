"use client";
import React, { useState } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SpecsSection from "@/components/product/SpecsSection";
import ReviewsSection from "@/components/product/ReviewsSection";
import BestSellers from "@/components/landing/BestSellers";

export default function ProductView({ product }) {
  // Use first color image, or first gallery image, or fallback
  const initialImage =
    product.colors && product.colors.length > 0
      ? product.colors[0].image
      : product.gallery && product.gallery.length > 0
        ? product.gallery[0]
        : product.image;

  const [currentImage, setCurrentImage] = useState(initialImage);

  // Combine gallery images with color variants for a full gallery
  const colorImages = product.colors ? product.colors.map((c) => c.image) : [];
  const galleryImages = product.gallery || [];

  const allImages = [
    ...colorImages,
    ...galleryImages.filter((img) => !colorImages.includes(img)),
  ];

  // If no images at all, use the main product image if available
  if (allImages.length === 0 && product.image) allImages.push(product.image);

  const uniqueImages = [...new Set(allImages)];

  return (
    <div className="min-h-screen bg-[#0f0e0e] pt-12 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Breadcrumb Placeholder */}
        <div className="mb-8 text-sm text-white/40">
          Home / Machines / <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          <ProductGallery images={uniqueImages} selectedImage={currentImage} />
          <ProductInfo product={product} onColorChange={setCurrentImage} />
        </div>

        <SpecsSection specs={product.specs} />

        <ReviewsSection />

        {/* Story / Lifestyle Section */}
        <div className="my-24 py-24 border-y border-white/5 relative overflow-hidden bg-black/50 rounded-3xl">
          <div className="absolute inset-0 bg-bronze-900/5 mix-blend-color-dodge" />
          <div className="relative z-10 text-center space-y-6 px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Barista Quality. <br /> Kitchen Convenience.
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Designed in collaboration with world-champion baristas, the{" "}
              {product.name} brings the theatre of coffee making into your home
              without the complexity.
            </p>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8">
            You Might Also Like
          </h3>
          <BestSellers />
        </div>
      </div>
    </div>
  );
}
