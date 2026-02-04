import HeroSection from "@/components/landing/HeroSection";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import BestSellers from "@/components/landing/BestSellers";
import BrandMarquee from "@/components/landing/BrandMarquee";
import ImmersiveStory from "@/components/landing/ImmersiveStory";

export default function Home() {
  return (
    <div className="bg-[#0f0e0e] min-h-screen">
      <HeroSection />
      
      {/* Visual Break */}
      <BrandMarquee />
      
      <FeatureShowcase />
      <BestSellers />
      
      <ImmersiveStory />
    </div>
  );
}
