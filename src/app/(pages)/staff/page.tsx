"use client"

import * as React from "react"
import { CalendarIcon, Clock, User, CheckCircle, XCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const appointments = [
  {
    id: "1",
    customerName: "John Smith",
    service: "Classic Haircut",
    time: "09:00 AM",
    status: "pending",
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    service: "Luxury Shave",
    time: "10:30 AM",
    status: "confirmed",
  },
  {
    id: "3",
    customerName: "Mike Wilson",
    service: "Beard Trim",
    time: "02:00 PM",
    status: "completed",
  },
]

export default function StaffDashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Staff Dashboard</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Schedule</CardTitle>
              <CardDescription>You have {appointments.length} appointments today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{appointment.customerName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.service}</p>
                      <div className="flex items-center pt-2">
                        <Clock className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">{appointment.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          // Handle complete
                        }}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          // Handle cancel
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Your stats for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Clients Served</span>
                  </div>
                  <span className="font-bold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Completed Appointments</span>
                  </div>
                  <span className="font-bold">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Cancelled Appointments</span>
                  </div>
                  <span className="font-bold">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

