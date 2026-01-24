import HeroSection from "@/components/landing/HeroSection";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import BestSellers from "@/components/landing/BestSellers";

export default function Home() {
  return (
    <div className="bg-[#0f0e0e] min-h-screen">
      <HeroSection />
      <FeatureShowcase />
      
      <BestSellers />
      
      {/* Placeholder for Product List if needed later */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Craft Your Cup</h2>
            <div className="p-12 border border-white/10 rounded-2xl bg-white/5">
                <p className="text-white/60">Full Product Catalog Coming Soon...</p>
            </div>
        </div>
      </section>
    </div>
  );
}
