import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { BookingSection } from "@/components/booking-section";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
  return (
    <div className="flex  pb-4 gap-6   w-full flex-col">
      <HeroSection />
      <ServicesSection />

      <TestimonialsSection />
    </div>
  );
}
