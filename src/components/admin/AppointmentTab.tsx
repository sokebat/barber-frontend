import React from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { Check, Search, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

interface AppointmentTabProps {
  appointments: any;
  formatDate: (date: string) => string;
  handleApproveAppointment: (id: number) => void;
  handleRejectAppointment: (id: number) => void;
}

const AppointmentTab = ({
  appointments,
  formatDate,
  handleApproveAppointment,
  handleRejectAppointment,
}: AppointmentTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>
                View and manage client appointments
              </CardDescription>
            </div>
            <div className="flex mt-4 md:mt-0">
              <div className="relative w-full md:w-64">
                <Input placeholder="Search appointments..." className="pl-10" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="all">All Appointments</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Specialist</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments &&
                    appointments
                      .filter((a) => a.isApproved)
                      .map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.customerName}</TableCell>
                          <TableCell>{appointment.serviceName}</TableCell>
                          <TableCell>{appointment.specialistName}</TableCell>
                          <TableCell>
                            {formatDate(appointment.appointmentDate)}
                            <div className="text-sm text-gray-500">
                              {appointment.appointmentTime}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge>Approved</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Specialist</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments
                    .filter((a) => !a.isApproved)
                    .map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.customerName}</TableCell>
                        <TableCell>{appointment.serviceName}</TableCell>
                        <TableCell>{appointment.specialistName}</TableCell>
                        <TableCell>
                          {formatDate(appointment.appointmentDate)}
                          <div className="text-sm text-gray-500">
                            {appointment.appointmentTime}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Pending</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() =>
                              handleApproveAppointment(appointment.id)
                            }
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-500 hover:text-red-600"
                            onClick={() =>
                              handleRejectAppointment(appointment.id)
                            }
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                  {appointments.filter((a) => !a.isApproved).length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        No pending appointments
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Specialist</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.customerName}</TableCell>
                      <TableCell>{appointment.serviceName}</TableCell>
                      <TableCell>{appointment.specialistName}</TableCell>
                      <TableCell>
                        {formatDate(appointment.appointmentDate)}
                        <div className="text-sm text-gray-500">
                          {appointment.appointmentTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            appointment.isApproved ? "default" : "outline"
                          }
                        >
                          {appointment.isApproved ? "Approved" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentTab;
