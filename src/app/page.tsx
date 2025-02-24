import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { BookingSection } from "@/components/booking-section";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <BookingSection />
        <TestimonialsSection />
      </main>
    </div>
  );
}
