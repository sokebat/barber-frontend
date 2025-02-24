"use client"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Luxury Lane", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["(555) 123-4567", "(555) 765-4321"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@luxecutsandspa.com", "support@luxecutsandspa.com"],
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon-Sat: 9:00 AM - 8:00 PM", "Sun: 10:00 AM - 6:00 PM"],
  },
]

export default function ContactPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center gap-4 text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
        <p className="max-w-[600px] text-muted-foreground">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {contactInfo.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {item.details.map((detail, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Find us at our premium location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/9] relative bg-muted rounded-lg">
                {/* Replace with actual map implementation */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Map placeholder
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="appointment">Appointment Question</SelectItem>
                    <SelectItem value="service">Service Information</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message here..." className="min-h-[150px]" />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

