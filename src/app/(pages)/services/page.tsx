"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const services = {
  haircuts: [
    {
      id: "1",
      name: "Classic Haircut",
      description: "Precision cut with expert styling",
      price: 35,
      duration: "45 min",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      name: "Premium Haircut & Style",
      description: "Includes wash, cut, and premium styling",
      price: 45,
      duration: "60 min",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  grooming: [
    {
      id: "3",
      name: "Luxury Shave",
      description: "Traditional hot towel straight razor shave",
      price: 45,
      duration: "30 min",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      name: "Beard Grooming",
      description: "Shape and style your beard",
      price: 25,
      duration: "20 min",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  spa: [
    {
      id: "5",
      name: "Relaxation Massage",
      description: "Full body therapeutic massage",
      price: 90,
      duration: "60 min",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "6",
      name: "Facial Treatment",
      description: "Deep cleansing and rejuvenating facial",
      price: 75,
      duration: "45 min",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Our Services
        </h1>
        <p className="max-w-[600px] text-muted-foreground">
          Choose from our range of premium services designed to help you look
          and feel your best.
        </p>
      </div>

      <Tabs defaultValue="haircuts" className="mt-10">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
          <TabsTrigger value="haircuts">Haircuts</TabsTrigger>
          <TabsTrigger value="grooming">Grooming</TabsTrigger>
          <TabsTrigger value="spa">Spa</TabsTrigger>
        </TabsList>
        {(Object.keys(services) as Array<keyof typeof services>).map(
          (category) => (
            <TabsContent key={category} value={category}>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services[category].map((service) => (
                  <Card key={service.id} className="flex flex-col">
                    <div className="aspect-[3/2] relative">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">
                          ${service.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {service.duration}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <a href="/book">Book Now</a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )
        )}
      </Tabs>
    </div>
  );
}
