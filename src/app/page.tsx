import { HeroSection } from "@/components/home/hero-section";
import { ProductSection } from "@/components/home/product-secton";
import { ServicesSection } from "@/components/home/services-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";

export default function Home() {
  return (
    <div className="flex  pb-4 gap-6   w-full flex-col">
      <HeroSection />
      <ServicesSection />
      <ProductSection />  

      <TestimonialsSection />
    </div>
  );
}
