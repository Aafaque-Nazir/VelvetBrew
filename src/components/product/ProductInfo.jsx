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
  // Safe defaults
  const colors = product.colors || [];
  const features = product.features || [];

  const [selectedColor, setSelectedColor] = useState(
    colors.length > 0 ? colors[0] : null,
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorChange(color.image);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-bronze-500">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={16}
                fill="currentColor"
                className={s === 5 ? "opacity-50" : ""}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-white/60 tracking-widest uppercase">
            4.8 (120 Reviews)
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-tight">
          {product.name}
        </h1>

        <div className="text-3xl text-white font-medium">
          ₹{product.price.toLocaleString("en-IN")}
        </div>

        <p className="text-white/60 leading-relaxed text-lg">
          {product.description}
        </p>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
          Key Features
        </h3>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-sm text-white/50"
            >
              <Check size={14} className="text-bronze-500" /> {feature}
            </li>
          ))}
          {features.length === 0 && (
            <li className="text-sm text-white/30 italic">
              No specific features listed.
            </li>
          )}
        </ul>
      </div>

      {/* Color Selection - Only show if colors exist */}
      {colors.length > 0 && (
        <div className="space-y-4">
          <span className="text-sm font-medium text-white/60 uppercase tracking-widest">
            Finish — <span className="text-white">{selectedColor?.name}</span>
          </span>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorSelect(color)}
                className={cn(
                  "h-12 w-12 rounded-full border-2 transition-all flex items-center justify-center relative",
                  selectedColor?.id === color.id
                    ? "border-bronze-500 scale-110 shadow-[0_0_20px_rgba(217,119,6,0.3)]"
                    : "border-white/10 opacity-70 hover:opacity-100 hover:scale-105",
                )}
                style={{ backgroundColor: color.hex }}
              >
                {selectedColor?.id === color.id && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center"
                  >
                    <Check
                      size={18}
                      className={cn("text-white mix-blend-difference")}
                    />
                  </motion.span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
        <div className="flex gap-4">
          {/* Quantity */}
          <div className="flex items-center bg-white/5 rounded-full border border-white/10 px-4 h-14 backdrop-blur-sm">
            <button
              onClick={decrement}
              className="text-white/50 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Minus size={16} />
            </button>
            <div className="w-10 text-center font-bold text-lg tabular-nums text-white">
              {quantity}
            </div>
            <button
              onClick={increment}
              className="text-white/50 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="flex-1 rounded-full text-lg h-14 shadow-[0_0_30px_rgba(217,119,6,0.2)] hover:shadow-[0_0_40px_rgba(217,119,6,0.4)] transition-shadow"
            onClick={() => addToCart(product, quantity, selectedColor)}
          >
            Add to Bag - ₹{(product.price * quantity).toLocaleString("en-IN")}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full border-white/10 hover:bg-white/10"
          >
            <Heart size={22} />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-white/40 uppercase tracking-widest">
          <span>Free Shipping</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span>2 Year Warranty</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm">
          <div className="p-3 bg-bronze-500/10 rounded-full text-bronze-500">
            <Truck size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Express Delivery</p>
            <p className="text-xs text-white/50">Ships in 24 hours</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm">
          <div className="p-3 bg-bronze-500/10 rounded-full text-bronze-500">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Authenticity</p>
            <p className="text-xs text-white/50">Verified Dealer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
