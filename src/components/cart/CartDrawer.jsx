"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { Button } from "@/components/ui/Button";

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0f0e0e] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag size={20} className="text-bronze-500" /> Your Bag
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-white/60">Your cart is empty.</p>
                  <Button variant="outline" onClick={() => setCartOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <motion.div
                    layout
                    key={`${item.id}-${item.variant?.id || idx}`}
                    className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5"
                  >
                    <div className="relative w-20 h-20 bg-[#1a1a1a] rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={
                          item.variant?.image || item.image || item.gallery?.[0]
                        }
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-white text-sm">
                            {item.name}
                          </h3>
                          <button
                            onClick={() =>
                              removeFromCart(item.id, item.variant?.id)
                            }
                            className="text-white/30 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {item.variant && (
                          <p className="text-xs text-white/50 mt-1">
                            Finish: {item.variant.name}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center bg-black/40 rounded border border-white/10">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.variant?.id, -1)
                            }
                            className="p-1 hover:text-bronze-500 text-white/60"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.variant?.id, 1)
                            }
                            className="p-1 hover:text-bronze-500 text-white/60"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-bronze-500">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0f0e0e]">
                <div className="flex justify-between mb-4 text-white">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-bold text-xl">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-white/40 mb-6">
                  Shipping & taxes calculated at checkout.
                </p>
                <Link href="/checkout">
                  <Button
                    size="lg"
                    className="w-full flex justify-between items-center group"
                    onClick={() => setCartOpen(false)}
                  >
                    <span>Checkout</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
