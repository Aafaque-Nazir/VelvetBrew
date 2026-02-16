'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { useCart } from '@/lib/cartContext';

export default function MachinesPage() {
    const { addToCart } = useCart();
    const machines = products.filter(product => product.category === 'machines');

    return (
        <div className="min-h-screen bg-[#0f0e0e] pt-12 pb-24">
            <div className="container mx-auto px-6 max-w-7xl">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
                        The <span className="text-bronze-500">Machine</span> Collection
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto">
                        From compact home units to commercial-grade dual boilers. Find your perfect extraction partner.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {machines.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-[#151515] rounded-3xl border border-white/5 hover:border-bronze-500/30 transition-all duration-500 flex flex-col overflow-hidden"
                        >
                            <Link href={`/products/${item.id}`} className="block relative aspect-video w-full bg-[#1a1a1a]/50 overflow-hidden">
                                {/* Tag */}
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-white/5">
                                        {item.tagline ? item.tagline.split(' ')[0] : 'Premium'}
                                    </span>
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <Image
                                        src={item.image || item.colors?.[0]?.image || item.gallery?.[0]}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <span className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm shadow-2xl">
                                        View Details
                                    </span>
                                </div>
                            </Link>

                            <div className="p-8 bg-[#151515] border-t border-white/5 flex justify-between items-end">
                                <div>
                                    <h3 className="text-2xl text-white font-bold mb-1">{item.name}</h3>
                                    <p className="text-white/50 text-sm">{item.tagline}</p>
                                </div>
                                <p className="text-xl font-bold text-bronze-500">₹{item.price.toLocaleString('en-IN')}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
