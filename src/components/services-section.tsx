import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Classic Haircut",
    description: "Precision cut with expert styling",
    price: "$35",
    duration: "45 min",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Luxury Shave",
    description: "Traditional hot towel straight razor shave",
    price: "$45",
    duration: "30 min",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Beard Grooming",
    description: "Shape and style your beard",
    price: "$25",
    duration: "20 min",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Relaxation Massage",
    description: "Full body therapeutic massage",
    price: "$90",
    duration: "60 min",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function ServicesSection() {
  return (
    <section className="container py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
        <p className="max-w-[600px] text-muted-foreground">
          Choose from our range of premium services designed to help you look and feel your best.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Card key={service.title} className="overflow-hidden">
            <div className="aspect-[3/2] relative">
              <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{service.price}</span>
                <span className="text-sm text-muted-foreground">{service.duration}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

