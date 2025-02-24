"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function BookingSection() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="container py-12 md:py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Book Your Appointment
        </h2>
        <p className="max-w-[600px] text-muted-foreground">
          Select your preferred service, date, and time. We&apos;ll take care of
          the rest.
        </p>
      </div>
      <Card className="mx-auto mt-8 md:mt-12 max-w-[800px]">
        <CardHeader>
          <CardTitle>Schedule Your Visit</CardTitle>
          <CardDescription>
            Choose your service and preferred time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Select Service
                </label>
                <Select>
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="haircut">Classic Haircut</SelectItem>
                    <SelectItem value="shave">Luxury Shave</SelectItem>
                    <SelectItem value="beard">Beard Grooming</SelectItem>
                    <SelectItem value="massage">Relaxation Massage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Select Time
                </label>
                <Select>
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Choose a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">9:00 AM</SelectItem>
                    <SelectItem value="10">10:00 AM</SelectItem>
                    <SelectItem value="11">11:00 AM</SelectItem>
                    <SelectItem value="12">12:00 PM</SelectItem>
                    <SelectItem value="13">1:00 PM</SelectItem>
                    <SelectItem value="14">2:00 PM</SelectItem>
                    <SelectItem value="15">3:00 PM</SelectItem>
                    <SelectItem value="16">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-full max-w-[350px]"
              />
            </div>
          </div>
          <Button className="mt-6 w-full">Confirm Booking</Button>
        </CardContent>
      </Card>
    </section>
  );
}
