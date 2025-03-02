"use client";
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
import { useState } from "react";

export function BookingSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [service, setService] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [bookedAppointments, setBookedAppointments] = useState<
    { date: Date; time: string; service: string }[]
  >([]);

  // Function to handle booking confirmation
  const handleBooking = () => {
    if (date && time && service) {
      setBookedAppointments([...bookedAppointments, { date, time, service }]);
      // Optionally, reset the selections
      setDate(new Date());
      setTime(undefined);
      setService(undefined);
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Book Your Appointment
          </h2>
          <p className="max-w-[600px] text-muted-foreground">
            Select your preferred service, date, and time. We'll take care of
            the rest.
          </p>
        </div>
        <div className="flex  justify-between items-start">
          <Card className="mx-auto mt-8 md:mt-12 w-full max-w-[800px]">
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
                    <label className="text-sm font-medium leading-none">
                      Select Service
                    </label>
                    <Select
                      value={service}
                      onValueChange={(value) => setService(value)}
                    >
                      <SelectTrigger className="mt-2 w-full">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="haircut">Classic Haircut</SelectItem>
                        <SelectItem value="shave">Luxury Shave</SelectItem>
                        <SelectItem value="beard">Beard Grooming</SelectItem>
                        <SelectItem value="massage">
                          Relaxation Massage
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Select Time
                    </label>
                    <Select
                      value={time}
                      onValueChange={(value) => setTime(value)}
                    >
                      <SelectTrigger className="mt-2 w-full">
                        <SelectValue placeholder="Choose a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                        <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                        <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                        <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                        <SelectItem value="4:00 PM">4:00 PM</SelectItem>
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
              <Button className="mt-6 w-full" onClick={handleBooking}>
                Confirm Booking
              </Button>
            </CardContent>
          </Card>
          {/* Display booked appointments */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold">Booked Appointments</h3>
            {bookedAppointments.length === 0 ? (
              <p className="text-muted-foreground">
                No appointments booked yet.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {bookedAppointments.map((appointment, index) => (
                  <li
                    key={index}
                    className="p-4 border rounded-md shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {appointment.service} on{" "}
                        {appointment.date.toDateString()} at {appointment.time}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        const updatedAppointments = bookedAppointments.filter(
                          (_, i) => i !== index
                        );
                        setBookedAppointments(updatedAppointments);
                      }}
                    >
                      Cancel
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
