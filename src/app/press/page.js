"use client";
import { motion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function PressPage() {
  const articles = [
    {
      source: "Vogue Living",
      date: "October 2025",
      title: "The Renaissance of Home Espresso: VelvetBrew's Obsidian Project",
      excerpt: "In a world of plastic appliances, VelvetBrew dares to treat the espresso machine as a monolithic sculpture...",
      image: "/press/vogue.jpg", // Placeholder
    },
    {
      source: "Monocle",
      date: "August 2025",
      title: "Design Brief: Milled from Chaos",
      excerpt: "We visited the Milan atelier to understand why there is a 6-month waitlist for a coffee machine.",
      image: "/press/monocle.jpg", // Placeholder
    },
    {
      source: "Hypebeast",
      date: "July 2025",
      title: "VelvetBrew Drops Limited Edition 'Stealth' Grinder",
      excerpt: "Sold out in 4 minutes. Here is your first look at the matte black finish that broke the internet.",
      image: "/press/hypebeast.jpg", // Placeholder
    },
  ];

  return (
    <div className="min-h-screen bg-[#070707] text-white pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="border-b border-white/10 pb-20 mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-4">
                    THE ARCHIVE
                </h1>
                <p className="text-xl text-white/50 max-w-2xl">
                    Selected features, interviews, and editorial coverage documenting our journey.
                </p>
            </motion.div>
            
             <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Button variant="outline" className="gap-2">
                    <Download size={18} /> Download Brand Assets
                </Button>
            </motion.div>
        </div>

        {/* Featured Article */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-24 relative group cursor-pointer"
        >
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
             <div className="h-[60vh] bg-white/5 relative overflow-hidden rounded-xl border border-white/10">
                 {/* Placeholder for Featured Image */}
                 <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-white/20 text-4xl font-bold uppercase tracking-widest">
                    Featured Cover
                 </div>
             </div>
             <div className="absolute bottom-10 left-10 z-20">
                 <div className="text-bronze-500 text-sm font-bold uppercase tracking-widest mb-2">Editorial Choice</div>
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl group-hover:underline decoration-bronze-500/50 underline-offset-8 transition-all">
                    "VelvetBrew isn't just making coffee. They are engineering silence."
                 </h2>
                 <p className="mt-4 text-white/70">— Wired Magazine, Design Issue 2026</p>
             </div>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
                <ArticleCard key={i} article={article} index={i} />
            ))}
        </div>

        {/* Media Kit Section */}
        <div className="mt-32 p-12 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8">
             <div>
                <h3 className="text-2xl font-bold mb-2">Media Enquiries</h3>
                <p className="text-white/60">For interview requests or high-res photography, please contact our press team.</p>
             </div>
             <div className="flex gap-4">
                <Button className="border border-white/20 hover:bg-white/10">press@velvetbrew.com</Button>
             </div>
        </div>

      </div>
    </div>
  );
}

function ArticleCard({ article, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + (index * 0.1) }}
            className="group cursor-pointer"
        >
            <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-6 relative">
                 <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white/10 text-xl font-bold uppercase">
                    {article.source}
                 </div>
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                 <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-xs px-3 py-1 rounded-full border border-white/10">
                     {article.source}
                 </div>
            </div>
            <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs text-bronze-500 uppercase tracking-widest">{article.date}</span>
                <ArrowUpRight size={16} className="text-white/40 group-hover:text-bronze-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-bronze-500 transition-colors">
                {article.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                {article.excerpt}
            </p>
        </motion.div>
    )
}
