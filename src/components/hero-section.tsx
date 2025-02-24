import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50" />
      <div className="relative grid min-h-[600px] items-center justify-center bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center bg-no-repeat px-4 py-24">
        <div className="container">
          <div className="grid max-w-lg gap-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Experience Luxury
              <br />
              Grooming & Wellness
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
  )
}

