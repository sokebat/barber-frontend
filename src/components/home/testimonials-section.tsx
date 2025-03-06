"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const testimonials = [
  {
    name: "John Doe",
    role: "Regular Customer",
    content: "The best grooming experience I've ever had. Professional staff and amazing service.",
    rating: 5,
  },
  {
    name: "Sarah Smith",
    role: "First-time Client",
    content: "Absolutely loved my spa treatment. The atmosphere is so relaxing and welcoming.",
    rating: 5,
  },
  {
    name: "Mike Johnson",
    role: "Monthly Member",
    content: "Been coming here for years. Consistently excellent service and results.",
    rating: 5,
  },
  {
    name: "Emily Brown",
    role: "Regular Client",
    content: "The attention to detail and personalized service is outstanding.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Clients Say</h2>
          <p className="max-w-[600px] text-muted-foreground">
            Don&apos;t just take our word for it. Here&apos;s what our valued clients have to say about their experiences.
          </p>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="mx-2">
                    <CardContent className="p-6">
                      <div className="flex gap-0.5">
                        {Array(testimonial.rating)
                          .fill(null)
                          .map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                          ))}
                      </div>
                      <blockquote className="mt-4 space-y-2">
                        <p className="text-muted-foreground">{testimonial.content}</p>
                        <footer>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

