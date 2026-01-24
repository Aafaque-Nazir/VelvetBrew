"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Star,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cartContext";

export default function ProductInfo({ product, onColorChange }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorChange(color.image);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex text-bronze-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="text-white/40">128 Reviews</span>
        </div>
        <p className="text-2xl font-light text-bronze-500">
          ₹{product.price.toLocaleString()}
        </p>
      </div>

      <div className="w-full h-[1px] bg-white/10" />

      {/* Description */}
      <div className="space-y-4">
        <p className="text-white/70 leading-relaxed font-light text-lg">
          {product.description}
        </p>
        <ul className="space-y-2">
          {product.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-sm text-white/50"
            >
              <Check size={14} className="text-bronze-500" /> {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <span className="text-sm font-medium text-white/60">
          Select Finish:{" "}
          <span className="text-white">{selectedColor.name}</span>
        </span>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorSelect(color)}
              className={cn(
                "h-10 w-10 rounded-full border-2 transition-all flex items-center justify-center",
                selectedColor.id === color.id
                  ? "border-bronze-500 scale-110"
                  : "border-white/10 opacity-70 hover:opacity-100",
              )}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor.id === color.id && (
                <Check
                  size={16}
                  className={cn("text-bronze-500 mix-blend-difference")}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {/* Quantity */}
          <div className="flex items-center bg-[#1a1a1a] rounded-lg border border-white/10 px-4 h-12">
            <button
              onClick={decrement}
              className="text-white/50 hover:text-white p-2"
            >
              <Minus size={16} />
            </button>
            <div className="w-8 text-center font-bold">{quantity}</div>
            <button
              onClick={increment}
              className="text-white/50 hover:text-white p-2"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="flex-1 rounded-full text-base"
            onClick={() => addToCart(product, quantity, selectedColor)}
          >
            Add to Cart - ₹{(product.price * quantity).toLocaleString()}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-white/10"
          >
            <Heart size={20} />
          </Button>
        </div>

        <p className="text-xs text-center text-white/30 uppercase tracking-widest mt-2">
          Free Shipping • 2 Year Warranty • 30 Day Return
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-8">
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
          <Truck className="text-bronze-500" size={24} />
          <div>
            <p className="text-sm font-bold">Fast Delivery</p>
            <p className="text-xs text-white/50">2-3 Business Days</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
          <ShieldCheck className="text-bronze-500" size={24} />
          <div>
            <p className="text-sm font-bold">Guaranteed</p>
            <p className="text-xs text-white/50">Authentic & Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
