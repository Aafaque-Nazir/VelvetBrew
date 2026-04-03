"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from "@/lib/cartContext";
import { Button } from '@/components/ui/Button';
import { ArrowRight, Check, CreditCard, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { load } from '@cashfreepayments/cashfree-js';

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const router = useRouter();

  // Load Cashfree
  const [cashfree, setCashfree] = useState(null);
  useEffect(() => {
      load({
          mode: "sandbox" // change to "production" in prod
      }).then(cf => setCashfree(cf));
  }, []);

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

      const shippingAddress = {
          address: e.target[0].value, // Update input indices because we removed dummy cards
          city: e.target[1].value,     // Wait, let's keep inputs by referencing them better, or just rely on relative form elements
      };

      // Let's grab form values safely using FormData
      const formData = new FormData(e.target);
      const addressData = {
          address: formData.get('address'),
          city: formData.get('city'),
          postalCode: formData.get('postalCode')
      };
      const customerPhone = formData.get('phone') || "9999999999";

      try {
          if (paymentMethod === 'COD') {
              const orderData = {
                  items: cartItems,
                  total: cartTotal,
                  shippingAddress: addressData,
                  paymentMethod: 'COD'
              };

              const res = await fetch('/api/orders', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(orderData)
              });

              if (res.ok) {
                  const data = await res.json();
                  router.push(`/account/invoice/${encodeURIComponent(data.orderId)}`);
              } else {
                  throw new Error("Failed to place COD order");
              }
          } else {
              // Cashfree Online Payment Flow
              const sessionRes = await fetch('/api/payment/cashfree', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      order_amount: cartTotal,
                      customer_phone: customerPhone
                  })
              });
              
              if (!sessionRes.ok) {
                  throw new Error("Failed to create Cashfree session. Ensure API keys are set.");
              }
              const { payment_session_id, cf_order_id } = await sessionRes.json();

              if (cashfree) {
                  let checkoutOptions = {
                      paymentSessionId: payment_session_id,
                      redirectTarget: "_modal",
                  };
                  cashfree.checkout(checkoutOptions).then(async (result) => {
                      if(result.error){
                          // user closed window or error
                          alert(`Payment Error: ${result.error.message}`);
                          setLoading(false);
                      }
                      if(result.redirect){
                          // redirect occurred
                      }
                      if(result.paymentDetails){
                          // Payment completed successfully in modal. 
                          // Create order on backend:
                          const orderData = {
                              items: cartItems,
                              total: cartTotal,
                              shippingAddress: addressData,
                              paymentMethod: 'Online',
                              id: cf_order_id
                          };
                          const req = await fetch('/api/orders', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(orderData)
                          });
                          if(req.ok) {
                             router.push(`/account/invoice/${encodeURIComponent(cf_order_id)}`);
                          }
                      }
                  });
              } else {
                  throw new Error("Cashfree SDK not loaded");
              }
          }
      } catch (error) {
          console.error("Checkout error:", error);
          alert(error.message || "Failed to process order.");
          setLoading(false); // only disable loading if error. Success redirects automatically.
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
                               <input required name="phone" type="tel" placeholder="Phone Number" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                               <input required name="address" placeholder="Address" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                               <div className="grid grid-cols-2 gap-4">
                                   <input required name="city" placeholder="City" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                                   <input required name="postalCode" placeholder="Postal Code" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-bronze-500 outline-none w-full"/>
                               </div>
                           </div>
                       </section>

                       <section className="bg-[#151515] p-8 rounded-2xl border border-white/5">
                           <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
                           
                           <div className="space-y-4 mb-6">
                               <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'Online' ? 'border-bronze-500 bg-bronze-500/10' : 'border-white/10 hover:border-white/30'}`}>
                                   <input type="radio" name="paymentMethod" value="Online" checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} className="hidden"/>
                                   <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'Online' ? 'border-bronze-500' : 'border-white/30'}`}>
                                       {paymentMethod === 'Online' && <div className="w-3 h-3 bg-bronze-500 rounded-full" />}
                                   </div>
                                   <CreditCard className={paymentMethod === 'Online' ? 'text-bronze-500' : 'text-white/50'} size={24} />
                                   <span className="text-white font-medium">Pay Online (Card/UPI/NetBanking)</span>
                               </label>

                               <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-bronze-500 bg-bronze-500/10' : 'border-white/10 hover:border-white/30'}`}>
                                   <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="hidden"/>
                                   <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'COD' ? 'border-bronze-500' : 'border-white/30'}`}>
                                       {paymentMethod === 'COD' && <div className="w-3 h-3 bg-bronze-500 rounded-full" />}
                                   </div>
                                   <Banknote className={paymentMethod === 'COD' ? 'text-bronze-500' : 'text-white/50'} size={24} />
                                   <span className="text-white font-medium">Cash on Delivery</span>
                               </label>
                           </div>

                           {paymentMethod === 'Online' && (
                               <div className="p-4 border border-bronze-500/30 bg-bronze-500/5 rounded-lg text-bronze-500 text-sm">
                                   Secured by Cashfree. You will be redirected to the payment interface.
                               </div>
                           )}
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
