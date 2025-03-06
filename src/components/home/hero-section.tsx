import { Button } from "@/components/ui/button";
import { HeroSectionImage } from "@/constants/image";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative">
        <div
          className="max-w-[1400px] relative mx-auto hero-section text-white pt-16 px-3 2xl:py-20"
          style={{
            backgroundImage: `url(${HeroSectionImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Image
            src={HeroSectionImage}
            alt="Hero Section Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="absolute inset-0 z-[-1]"
          />
          <div className="grid max-w-xl gap-4 mx-4 sm:mx-6 md:mx-8 lg:mx-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Experience Luxury Grooming
              <br />& Wellness
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Premium barber services and spa treatments tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" className="w-full sm:w-auto">
                Book Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto mt-4 sm:mt-0"
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
