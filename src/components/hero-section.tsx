import { Button } from "@/components/ui/button";
import { HeroSectionImage } from "@/constants/image";
import Image from "next/image";
export function HeroSection() {
  return (
    <section className="w-full">
      <div>
        <div
          className="max-w-[1400px] relative  mx-auto min-h-screen text-white 2xl:min-h-max pt-16  px-3 2xl:py-20 "
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
          <div className="grid max-w-xl gap-4">
            <h1 className="text-4xl font-bold tracking-tight  ">
              Experience Luxury Grooming
              <br />& Wellness
            </h1>
            <p className="text-lg text-muted-foreground">
              Premium barber services and spa treatments tailored to your needs.
            </p>
            <div className="flex gap-4">
              <Button size="lg">Book Appointment</Button>
              <Button size="lg" variant="outline">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
