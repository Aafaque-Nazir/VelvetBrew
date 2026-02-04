'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { useCart } from '@/lib/cartContext';

export default function AccessoriesPage() {
  const { addToCart } = useCart();
  const accessories = products.filter(product => product.category === 'accessories');

  return (
    <div className="min-h-screen bg-[#0f0e0e] pt-12 pb-24">
       <div className="container mx-auto px-6 max-w-7xl">
         <header className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
                Barista <span className="text-bronze-500">Tools</span>
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
                Elevate your ritual with accessories designed for precision and durability.
            </p>
         </header>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {accessories.map((item, idx) => (
                <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-[#151515] rounded-2xl border border-white/5 hover:border-bronze-500/30 transition-all duration-300 flex flex-col overflow-hidden"
                >
                    <Link href={`/accessories/${item.id}`} className="block flex-1 flex flex-col">
                        <div className="aspect-square bg-[#1a1a1a]/50 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                            <Image src={item.image} alt={item.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"/>
                            </div>
                        </div>
                        
                        <div className="p-5 border-t border-white/5 flex flex-col items-center text-center flex-1 justify-between bg-[#151515]">
                            <h3 className="text-white font-bold mb-2 text-sm">{item.name}</h3>
                            <p className="text-bronze-500 font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                    </Link>
                </motion.div>
            ))}
         </div>
       </div>
    </div>
  );
}
