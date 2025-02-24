"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const scheduleData = {
  "2024-02-24": [
    {
      id: "1",
      time: "09:00 AM",
      customer: "John Smith",
      service: "Haircut",
      staff: "Mike Wilson",
      status: "confirmed",
    },
    {
      id: "2",
      time: "10:30 AM",
      customer: "Sarah Johnson",
      service: "Massage",
      staff: "Jane Doe",
      status: "pending",
    },
  ],
}

export default function ScheduleManagement() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedStaff, setSelectedStaff] = React.useState<string>("all")

  const appointments = scheduleData[date?.toISOString().split("T")[0] || ""] || []

  return (
    <div className="container py-10">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-3">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schedule View</CardTitle>
                <CardDescription>Select a date to view appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Staff Member</label>
                  <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Staff</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                      <SelectItem value="jane">Jane Doe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="haircut">Haircut</SelectItem>
                      <SelectItem value="massage">Massage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>
                    {date?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </div>
                <Button>Add Appointment</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{appointment.time}</span>
                          <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.service} with {appointment.staff}
                        </div>
                        <div className="text-sm">{appointment.customer}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground">No appointments scheduled for this date.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

