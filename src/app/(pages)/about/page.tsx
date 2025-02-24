import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Years of Experience", value: "15+" },
  { label: "Professional Staff", value: "20+" },
  { label: "Satisfied Clients", value: "10k+" },
  { label: "Services Offered", value: "25+" },
];

const values = [
  {
    title: "Quality Service",
    description:
      "We are committed to providing the highest quality service to every client.",
  },
  {
    title: "Professional Excellence",
    description:
      "Our team of experienced professionals stays up-to-date with the latest trends and techniques.",
  },
  {
    title: "Client Satisfaction",
    description:
      "Your satisfaction is our top priority. We ensure every visit exceeds expectations.",
  },
  {
    title: "Hygiene Standards",
    description:
      "We maintain the highest standards of cleanliness and sanitization.",
  },
];

const team = [
  {
    name: "John Smith",
    role: "Master Barber",
    image: "/placeholder.svg?height=400&width=300",
    specialties: ["Classic Cuts", "Beard Styling", "Hot Towel Shave"],
  },
  {
    name: "Sarah Johnson",
    role: "Spa Therapist",
    image: "/placeholder.svg?height=400&width=300",
    specialties: ["Deep Tissue Massage", "Facial Treatment", "Body Scrub"],
  },
  {
    name: "Mike Wilson",
    role: "Senior Barber",
    image: "/placeholder.svg?height=400&width=300",
    specialties: ["Modern Styles", "Hair Coloring", "Facial Grooming"],
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50" />
        <div className="relative grid min-h-[400px] items-center justify-center bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center bg-no-repeat px-4 py-24">
          <div className="container">
            <div className="grid max-w-lg gap-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                About LuxeCuts & Spa
              </h1>
              <p className="text-lg text-muted-foreground">
                Premium grooming and wellness services for those who appreciate
                quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-12 md:py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="container py-12 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Our Story"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2010, LuxeCuts & Spa has been providing premium
              grooming and wellness services to our valued clients. What started
              as a small barbershop has grown into a full-service establishment,
              offering a wide range of services from classic haircuts to
              luxurious spa treatments.
            </p>
            <p className="text-muted-foreground">
              Our commitment to excellence and customer satisfaction has made us
              one of the most trusted names in the industry. We take pride in
              our skilled professionals who are passionate about their craft and
              dedicated to providing the best possible service.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/50 py-12 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Our Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container py-12 md:py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
          Meet Our Team
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card key={member.name}>
              <div className="aspect-[3/4] relative">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {member.role}
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
