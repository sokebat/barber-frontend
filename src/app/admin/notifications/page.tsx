"use client"
import { Bell, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const notifications = [
  {
    id: "1",
    title: "Holiday Special Offer",
    message: "Get 20% off on all services this holiday season!",
    type: "promotion",
    sentTo: "All Customers",
    sentAt: "2024-02-23T10:00:00Z",
    status: "sent",
  },
  {
    id: "2",
    title: "New Service Announcement",
    message: "We've added new spa treatments to our service menu.",
    type: "announcement",
    sentTo: "All Customers",
    sentAt: "2024-02-22T15:30:00Z",
    status: "sent",
  },
]

const templates = [
  {
    id: "1",
    name: "Appointment Reminder",
    subject: "Reminder: Your appointment tomorrow",
    content:
      "Dear {customer_name},\n\nThis is a reminder that you have an appointment scheduled for {appointment_time} tomorrow with {staff_name}.\n\nBest regards,\nLuxeCuts & Spa",
  },
  {
    id: "2",
    name: "Special Offer",
    subject: "Special Offer Just for You",
    content:
      "Dear {customer_name},\n\nWe're excited to offer you a special discount on our services.\n\nUse code {promo_code} to get {discount}% off your next visit.\n\nBest regards,\nLuxeCuts & Spa",
  },
]

export default function NotificationsManagement() {
  return (
    <div className="container py-10">
      <Tabs defaultValue="send">
        <TabsList className="mb-4">
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="history">Notification History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
              <CardDescription>Create and send notifications to your customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Notification Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Recipients</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="active">Active Customers</SelectItem>
                    <SelectItem value="inactive">Inactive Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="Enter notification subject" />
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Enter your message" className="min-h-[200px]" />
              </div>

              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>View all previously sent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start justify-between rounded-lg border p-4">
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="font-semibold">{notification.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Sent to: {notification.sentTo}</span>
                        <span>•</span>
                        <span>{new Date(notification.sentAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Resend
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Notification Templates</CardTitle>
                  <CardDescription>Manage your notification templates</CardDescription>
                </div>
                <Button>Add Template</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{template.name}</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{template.subject}</p>
                    <pre className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{template.content}</pre>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

