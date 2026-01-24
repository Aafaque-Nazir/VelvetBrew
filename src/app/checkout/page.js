"use client";
import React, { useState } from 'react';
import { useCart } from "@/lib/cartContext";
import { Button } from '@/components/ui/Button';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  if (step === 2) {
      return (
          <div className="min-h-screen bg-[#0f0e0e] flex items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#151515] p-12 rounded-3xl border border-white/10 text-center max-w-lg w-full"
              >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="text-green-500" size={40} />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
                  <p className="text-white/60 mb-8">Thank you for choosing VelvetBrew. Your order has been placed successfully.</p>
                  <Button onClick={() => window.location.href = '/account'}>View Order in Account</Button>
              </motion.div>
          </div>
      )
  }

  const handleCheckout = async (e) => {
      e.preventDefault();
      setLoading(true);

      // Prepare order data
      const orderData = {
          items: cartItems,
          total: cartTotal,
          shippingAddress: {
             // In a real form, gather these from state
             address: e.target[3].value,
             city: e.target[4].value,
             postalCode: e.target[5].value
          }
      };

      try {
          const res = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(orderData)
          });

          if (res.ok) {
              setStep(2);
              // clearCart(); // You might want to implement this in context
          } else {
              alert("Something went wrong. Please try again.");
          }
      } catch (error) {
          console.error("Checkout error:", error);
          alert("Failed to process order.");
      } finally {
          setLoading(false);
      }
  }

  return (
    <div className="min-h-screen bg-[#0f0e0e] pt-32 pb-24">
       <div className="container mx-auto px-6 max-w-6xl">
           <h1 className="text-4xl font-bold text-white mb-12">Checkout</h1>
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Form */}
               <div className="lg:col-span-7">
                   <form onSubmit={handleCheckout} className="space-y-8">
                       <section className="bg-[#151515] p-8 rounded-2xl border border-white/5">
                           <h2 className="text-xl font-bold text-white mb-6">Information</h2>
                           <div className="grid grid-cols-2 gap-4">
                               <input required placeholder="First Name" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                               <input required placeholder="Last Name" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                               <input required placeholder="Email" type="email" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full col-span-2"/>
                           </div>
                       </section>

                       <section className="bg-[#151515] p-8 rounded-2xl border border-white/5">
                           <h2 className="text-xl font-bold text-white mb-6">Shipping Information</h2>
                           <div className="space-y-4">
                               <input required placeholder="Address" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                               <div className="grid grid-cols-2 gap-4">
                                   <input required placeholder="City" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                                   <input required placeholder="Postal Code" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                               </div>
                           </div>
                       </section>

                       <section className="bg-[#151515] p-8 rounded-2xl border border-white/5">
                           <h2 className="text-xl font-bold text-white mb-6">Payment</h2>
                            <div className="p-4 border border-bronze-500/30 bg-bronze-500/5 rounded-lg text-bronze-500 text-sm mb-4">
                                This is a demo. No payment will be processed.
                            </div>
                           <input required placeholder="Card Number" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full mb-4"/>
                           <div className="grid grid-cols-2 gap-4">
                               <input required placeholder="MM / YY" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                               <input required placeholder="CVC" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                           </div>
                       </section>

                       <Button type="submit" size="lg" className="w-full h-16 text-lg" disabled={loading}>
                           {loading ? 'Processing...' : `Pay ₹${cartTotal.toLocaleString()}`}
                       </Button>
                   </form>
               </div>

               {/* Summary */}
               <div className="lg:col-span-5">
                   <div className="bg-[#151515] p-8 rounded-2xl border border-white/5 sticky top-32">
                       <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                       <div className="space-y-4 mb-8">
                           {cartItems.map((item, idx) => (
                               <div key={idx} className="flex justify-between items-start">
                                   <div>
                                       <p className="text-white font-medium">{item.name}</p>
                                       <p className="text-sm text-white/40">Qty: {item.quantity}</p>
                                   </div>
                                   <p className="text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
                               </div>
                           ))}
                       </div>
                       
                       <div className="border-t border-white/10 pt-4 space-y-2">
                           <div className="flex justify-between text-white/60">
                               <span>Subtotal</span>
                               <span>₹{cartTotal.toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between text-white/60">
                               <span>Shipping</span>
                               <span>Free</span>
                           </div>
                           <div className="flex justify-between text-white font-bold text-xl pt-4">
                               <span>Total</span>
                               <span>₹{cartTotal.toLocaleString()}</span>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
}
