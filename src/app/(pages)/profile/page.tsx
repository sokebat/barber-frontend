"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const appointments = [
  {
    id: "1",
    service: "Classic Haircut",
    date: "2024-02-24",
    time: "09:00 AM",
    status: "Completed",
  },
  {
    id: "2",
    service: "Beard Trim",
    date: "2024-02-25",
    time: "02:30 PM",
    status: "Upcoming",
  },
];

const orders = [
  {
    id: "1",
    date: "2024-02-23",
    items: ["Premium Hair Pomade", "Beard Oil"],
    total: 54.98,
    status: "Delivered",
  },
  {
    id: "2",
    date: "2024-02-22",
    items: ["Grooming Kit"],
    total: 89.99,
    status: "Processing",
  },
];

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "",
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Name</label>
                <div className="flex items-center justify-between">
                  <span>{user.name}</span>
                  <Button variant="outline">Edit</Button>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email</label>
                <div className="flex items-center justify-between">
                  <span>{user.email}</span>
                  <Button variant="outline">Edit</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="appointments">
          <TabsList>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Your Appointments</CardTitle>
                <CardDescription>
                  View and manage your appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.status}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            {appointment.status === "Upcoming"
                              ? "Cancel"
                              : "Book Again"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>View your order history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items.join(", ")}</TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>{order.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
