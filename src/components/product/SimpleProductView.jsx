"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Check, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cartContext";

export default function SimpleProductView({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#0f0e0e] pt-24 pb-24 flex items-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="bg-[#151515] rounded-3xl p-12 aspect-square relative border border-white/5 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <span className="text-bronze-500 font-bold tracking-widest uppercase text-xs mb-2 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-bronze-500 font-light">
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            <div className="w-full h-[1px] bg-white/10" />

            <div className="space-y-4">
              <p className="text-white/70 leading-relaxed text-lg">
                {product.description}
              </p>
              {product.notes && (
                <p className="text-white/50 text-sm">
                  Notes: <span className="text-white">{product.notes}</span>
                </p>
              )}
              {product.features && (
                <ul className="space-y-2 pt-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-white/50"
                    >
                      <Check size={14} className="text-bronze-500" /> {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="rounded-full flex-1"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>

            <div className="flex gap-6 pt-6 opacity-50">
              <div className="flex items-center gap-2 text-xs text-white">
                <Truck size={16} /> Fast Shipping
              </div>
              <div className="flex items-center gap-2 text-xs text-white">
                <ShieldCheck size={16} /> Authenticity Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
