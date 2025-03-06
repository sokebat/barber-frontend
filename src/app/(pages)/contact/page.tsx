"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

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
];

export default function ContactPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center gap-4 text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Contact Us
        </h1>
        <p className="max-w-[600px] text-muted-foreground">
          Have questions? We&apos;d love to hear from you. Send us a message and
          we&apos;ll respond as soon as possible.
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
        </div>
        <Card>
          <CardHeader>
            <CardTitle> Our Location</CardTitle>
           
          </CardHeader>
          <CardContent>
            <div className="  relative bg-muted rounded-lg">
              {/* Replace with actual map implementation */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Map placeholder
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
