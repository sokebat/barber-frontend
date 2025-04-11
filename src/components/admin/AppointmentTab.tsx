import React, { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { Check, Search, X, Pencil } from "lucide-react";
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
import { toast } from "../ui/use-toast";
import { useAppointment } from "@/contexts/ApointmentContext";
import { formatDate } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import AppointmentService from "@/services/appointment.service";
import {
  Appointment,
  UpdateAppointmentDto,
} from "@/types/AppointmentService.types";

const AppointmentTab = () => {
  const { appointments, getAllAppointments, loading } = useAppointment();
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateAppointmentDto>({
    id: Math.floor(Math.random() * 100000), // Example id; adjust as needed
    serviceName: "",
    specialistName: "",
    customerName: "",
    appointment: "", // Combined datetime
    appointmentDate: "",
    appointmentTime: "",
    isApproved: false,
  });

  // Fetch appointments on mount
  useEffect(() => {
    getAllAppointments();
    
  }, []);

  // Approve (update) an appointment
  const handleApproveAppointment = async (id: string) => {
    // Convert appointment.id to string for comparison
    const appointment = appointments.find((a) => a.id.toString() === id);
    if (!appointment) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Appointment not found",
      });
      return;
    }
    try {
      // Update appointment to mark it as approved
      const response = await AppointmentService.updateAppointment(id, {
        ...appointment,
        isApproved: true,
      });
      if (response.success) {
        await getAllAppointments();
        toast({
          title: "Appointment Approved",
          description: "The appointment has been approved successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve appointment",
      });
    }
  };

  // Reject (delete) an appointment
  const handleRejectAppointment = async (id: string) => {
    if (
      confirm("Are you sure you want to reject and delete this appointment?")
    ) {
      try {
        const response = await AppointmentService.deleteAppointment(id);
        if (response.success) {
          await getAllAppointments();
          toast({
            title: "Appointment Rejected",
            description: "The appointment has been rejected and removed.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: response.message,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to reject appointment",
        });
      }
    }
  };

  // Edit Handlers
  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      id: appointment.id,
      customerName: appointment.customerName,
      serviceName: appointment.serviceName,
      specialistName: appointment.specialistName,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      isApproved: appointment.isApproved,
    });
    setIsEditing(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    try {
      const response = await AppointmentService.updateAppointment(
        selectedAppointment.id.toString(),
        formData
      );
      if (response.success) {
        await getAllAppointments();
        setIsEditing(false);
        setSelectedAppointment(null);
        toast({
          title: "Success",
          description: "Appointment updated successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update appointment",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 ">
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
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                <TabsTrigger value="all">All Appointments</TabsTrigger>
              </TabsList>

              {/* Upcoming (Approved) Appointments */}
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
                    {appointments
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
                          <TableCell className="text-right space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditClick(appointment)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* Pending Appointments */}
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
                                handleApproveAppointment(
                                  appointment.id.toString()
                                )
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
                                handleRejectAppointment(
                                  appointment.id.toString()
                                )
                              }
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditClick(appointment)}
                            >
                              <Pencil className="h-4 w-4" />
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

              {/* All Appointments */}
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
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditClick(appointment)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium"
              >
                Customer Name
              </label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium"
              >
                Service
              </label>
              <Input
                id="serviceName"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="specialistName"
                className="block text-sm font-medium"
              >
                Specialist
              </label>
              <Input
                id="specialistName"
                name="specialistName"
                value={formData.specialistName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="appointmentDate"
                className="block text-sm font-medium"
              >
                Date
              </label>
              <Input
                id="appointmentDate"
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="appointmentTime"
                className="block text-sm font-medium"
              >
                Time
              </label>
              <Input
                id="appointmentTime"
                name="appointmentTime"
                type="time"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentTab;
