"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cartContext';

const beans = [
  { id: 'bean-1', name: 'Ethiopian Yirgacheffe', roast: 'Light Roast', notes: 'Floral, Citrus, bright', price: 1800, image: '/beans_light.png' },
  { id: 'bean-2', name: 'Colombian Supremo', roast: 'Medium Roast', notes: 'Caramel, Nutty, smooth', price: 1600, image: '/beans_medium.png' },
  { id: 'bean-3', name: 'Sumatra Mandheling', roast: 'Dark Roast', notes: 'Earthy, Spicy, bold', price: 1750, image: '/beans_dark.png' },
];

export default function BeansPage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#0f0e0e] pt-12 pb-24">
       <div className="container mx-auto px-6 max-w-7xl">
         <header className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
                Curated <span className="text-bronze-500">Origins</span>
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
                Small batch roasted beans to bring out the unique character of every terroir.
            </p>
         </header>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beans.map((item, idx) => (
                <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-[#151515] rounded-3xl border border-white/5 hover:border-bronze-500/30 transition-all duration-300 flex flex-col overflow-hidden"
                >
                    <Link href={`/beans/${item.id}`} className="block flex-1 flex flex-col">
                        <div className="aspect-[4/3] relative overflow-hidden bg-[#1a1a1a]/50">
                            <div className="absolute inset-0 bg-bronze-500/5 group-hover:bg-bronze-500/10 transition-colors" />
                             <div className="absolute inset-0 flex items-center justify-center p-6">
                                <Image src={item.image} alt={item.name} fill className="object-contain p-4 group-hover:-translate-y-2 transition-transform duration-500"/>
                             </div>
                        </div>
                        
                        <div className="p-6 border-t border-white/5 flex flex-col flex-1 bg-[#151515]">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-[10px] font-bold text-bronze-500 uppercase tracking-widest">{item.roast}</span>
                                    <h3 className="text-xl text-white font-bold mt-1">{item.name}</h3>
                                </div>
                                <span className="text-white font-bold text-lg">₹{item.price.toLocaleString()}</span>
                            </div>
                            
                            <p className="text-sm text-white/50 mb-6 flex-1">{item.notes}</p>
                            
                            <div className="w-full bg-white/10 text-white text-center py-3 rounded-xl font-medium text-sm group-hover:bg-white/20 transition-colors">
                                View Details
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
         </div>
       </div>
    </div>
  );
}
