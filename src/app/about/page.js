"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0f0e0e] text-white">
            {/* Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <Image src="/coffee_machine_hero.png" alt="Hero" fill className="object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0e0e]/50 to-[#0f0e0e]" />

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter mb-6"
                    >
                        We <span className="text-bronze-500">Forge</span> Rituals.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl md:text-2xl text-white/60 font-light leading-relaxed"
                    >
                        VelvetBrew was born from a refusal to compromise between the convenience of home and the quality of the café.
                    </motion.p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 px-6 container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-32">
                    <div className="relative aspect-square">
                        <div className="absolute inset-4 border border-bronze-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image src="/machine_pro.png" alt="Engineering" width={500} height={500} className="object-contain" />
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold tracking-tight">Engineering not Marketing</h2>
                        <p className="text-white/60 text-lg leading-relaxed">
                            While others focus on shiny plastic shells, we obsess over thermal mass, pressure profiles, and flow rates. Our dual-boiler systems are miniature marvels of thermodynamics, designed to hold temperature stability within 0.1°C.
                        </p>
                        <Button variant="outline">Our Technology</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="order-2 md:order-1 space-y-8">
                        <h2 className="text-4xl font-bold tracking-tight">Sustainable Luxury</h2>
                        <p className="text-white/60 text-lg leading-relaxed">
                            True luxury shouldn't cost the planet. Our machines are built to last a lifetime, with 100% repairable internal components and plastic-free packaging. We source our beans directly from farmers who are paid 3x fair trade rates.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 relative aspect-video bg-[#151515] rounded-2xl overflow-hidden border border-white/5">
                        <Image src="/beans_dark.png" alt="Sustainability" fill className="object-cover opacity-80" />
                    </div>
                </div>
            </section>

            {/* Team / Stats */}
            <section className="py-24 bg-white/5 border-y border-white/5">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                        <div className="text-4xl md:text-6xl font-bold text-bronze-500 mb-2">
                            <AnimatedCounter to={3} suffix="s" duration={4} />
                        </div>
                        <div className="text-sm font-bold uppercase tracking-widest text-white/40">Heat Up Time</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-6xl font-bold text-bronze-500 mb-2">
                            <AnimatedCounter to={10} suffix="k+" duration={4} />
                        </div>
                        <div className="text-sm font-bold uppercase tracking-widest text-white/40">Happy Home Baristas</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-6xl font-bold text-bronze-500 mb-2">
                            <AnimatedCounter to={2} suffix="yr" duration={4} />
                        </div>
                        <div className="text-sm font-bold uppercase tracking-widest text-white/40">Warranty</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-6xl font-bold text-bronze-500 mb-2">
                            <AnimatedCounter to={0} suffix="%" duration={4} />
                        </div>
                        <div className="text-sm font-bold uppercase tracking-widest text-white/40">Plastic Packaging</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
