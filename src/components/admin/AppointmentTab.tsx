import React, { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { Check, Search, X, Pencil, Plus } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import AppointmentService from "@/services/appointment.service";
import {
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from "@/types/AppointmentService.types";

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

const AppointmentTab = () => {
  const { appointments, getAllAppointments, loading, error } = useAppointment();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<UpdateAppointmentDto | CreateAppointmentDto>({
    customerName: "",
    serviceName: "",
    specialistName: "",
    appointmentDate: "",
    appointmentTime: "",
    isApproved: false,
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Fetch appointments on mount
  useEffect(() => {
    getAllAppointments();
  }, [ ]);

  // Validate form data
  const validateForm = (data: UpdateAppointmentDto | CreateAppointmentDto) => {
    const errors: { [key: string]: string } = {};
    if (!data.customerName.trim()) {
      errors.customerName = "Customer name is required";
    }
    if (!data.serviceName.trim()) {
      errors.serviceName = "Service name is required";
    }
    if (!data.specialistName.trim()) {
      errors.specialistName = "Specialist name is required";
    }
    if (!data.appointmentDate) {
      errors.appointmentDate = "Date is required";
    } else {
      const date = new Date(data.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        errors.appointmentDate = "Date must be today or in the future";
      }
    }
    if (!data.appointmentTime) {
      errors.appointmentTime = "Time is required";
    } else if (!/^\d{2}:\d{2}$/.test(data.appointmentTime)) {
      errors.appointmentTime = "Time must be in HH:MM format";
    }
    return errors;
  };

  // Approve an appointment
  const handleApproveAppointment = async (id: string) => {
    const appointment = appointments.find((a) => a.id === id);
    if (!appointment) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Appointment not found",
      });
      return;
    }
    try {
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
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to approve appointment",
      });
    }
  };

  // Reject (delete) an appointment
  const handleRejectAppointment = async (id: string) => {
    if (confirm("Are you sure you want to reject and delete this appointment?")) {
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
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to reject appointment",
        });
      }
    }
  };

  // Edit Handlers
  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      customerName: appointment.customerName,
      serviceName: appointment.serviceName,
      specialistName: appointment.specialistName,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      isApproved: appointment.isApproved,
    });
    setFormErrors({});
    setIsEditing(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await AppointmentService.updateAppointment(selectedAppointment.id, formData);
      if (response.success) {
        await getAllAppointments();
        setIsEditing(false);
        setSelectedAppointment(null);
        setFormErrors({});
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
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update appointment",
      });
    }
  };

  // Add Handlers
  const handleAddClick = () => {
    setFormData({
      customerName: "",
      serviceName: "",
      specialistName: "",
      appointmentDate: "",
      appointmentTime: "",
      isApproved: false,
    });
    setFormErrors({});
    setIsAdding(true);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await AppointmentService.createAppointment(formData as CreateAppointmentDto);
      if (response.success) {
        await getAllAppointments();
        setIsAdding(false);
        setFormErrors({});
        toast({
          title: "Success",
          description: "Appointment created successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create appointment",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(
    (a) =>
      a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.specialistName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>
                View, add, edit, and manage client appointments
              </CardDescription>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-2">
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search appointments..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button onClick={handleAddClick}>
                <Plus className="h-4 w-4 mr-2" />
                Add Appointment
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
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
                    {filteredAppointments
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
                    {filteredAppointments.filter((a) => a.isApproved).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                          No upcoming appointments
                        </TableCell>
                      </TableRow>
                    )}
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
                    {filteredAppointments
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
                              onClick={() => handleApproveAppointment(appointment.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-300 text-red-500 hover:text-red-600"
                              onClick={() => handleRejectAppointment(appointment.id)}
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
                    {filteredAppointments.filter((a) => !a.isApproved).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
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
                    {filteredAppointments.map((appointment) => (
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
                          <Badge variant={appointment.isApproved ? "default" : "outline"}>
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
                    {filteredAppointments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                          No appointments found
                        </TableCell>
                      </TableRow>
                    )}
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
              <label htmlFor="customerName" className="block text-sm font-medium">
                Customer Name
              </label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className={formErrors.customerName ? "border-red-500" : ""}
              />
              {formErrors.customerName && (
                <p className="text-red-500 text-sm">{formErrors.customerName}</p>
              )}
            </div>
            <div>
              <label htmlFor="serviceName" className="block text-sm font-medium">
                Service
              </label>
              <Input
                id="serviceName"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
                required
                className={formErrors.serviceName ? "border-red-500" : ""}
              />
              {formErrors.serviceName && (
                <p className="text-red-500 text-sm">{formErrors.serviceName}</p>
              )}
            </div>
            <div>
              <label htmlFor="specialistName" className="block text-sm font-medium">
                Specialist
              </label>
              <Input
                id="specialistName"
                name="specialistName"
                value={formData.specialistName}
                onChange={handleInputChange}
                required
                className={formErrors.specialistName ? "border-red-500" : ""}
              />
              {formErrors.specialistName && (
                <p className="text-red-500 text-sm">{formErrors.specialistName}</p>
              )}
            </div>
            <div>
              <label htmlFor="appointmentDate" className="block text-sm font-medium">
                Date
              </label>
              <Input
                id="appointmentDate"
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                required
                className={formErrors.appointmentDate ? "border-red-500" : ""}
              />
              {formErrors.appointmentDate && (
                <p className="text-red-500 text-sm">{formErrors.appointmentDate}</p>
              )}
            </div>
            <div>
              <label htmlFor="appointmentTime" className="block text-sm font-medium">
                Time
              </label>
              <Input
                id="appointmentTime"
                name="appointmentTime"
                type="time"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                required
                className={formErrors.appointmentTime ? "border-red-500" : ""}
              />
              {formErrors.appointmentTime && (
                <p className="text-red-500 text-sm">{formErrors.appointmentTime}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Appointment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium">
                Customer Name
              </label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className={formErrors.customerName ? "border-red-500" : ""}
              />
              {formErrors.customerName && (
                <p className="text-red-500 text-sm">{formErrors.customerName}</p>
              )}
            </div>
            <div>
              <label htmlFor="serviceName" className="block text-sm font-medium">
                Service
              </label>
              <Input
                id="serviceName"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
                required
                className={formErrors.serviceName ? "border-red-500" : ""}
              />
              {formErrors.serviceName && (
                <p className="text-red-500 text-sm">{formErrors.serviceName}</p>
              )}
            </div>
            <div>
              <label htmlFor="specialistName" className="block text-sm font-medium">
                Specialist
              </label>
              <Input
                id="specialistName"
                name="specialistName"
                value={formData.specialistName}
                onChange={handleInputChange}
                required
                className={formErrors.specialistName ? "border-red-500" : ""}
              />
              {formErrors.specialistName && (
                <p className="text-red-500 text-sm">{formErrors.specialistName}</p>
              )}
            </div>
            <div>
              <label htmlFor="appointmentDate" className="block text-sm font-medium">
                Date
              </label>
              <Input
                id="appointmentDate"
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                required
                className={formErrors.appointmentDate ? "border-red-500" : ""}
              />
              {formErrors.appointmentDate && (
                <p className="text-red-500 text-sm">{formErrors.appointmentDate}</p>
              )}
            </div>
            <div>
              <label htmlFor="appointmentTime" className="block text-sm font-medium">
                Time
              </label>
              <Input
                id="appointmentTime"
                name="appointmentTime"
                type="time"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                required
                className={formErrors.appointmentTime ? "border-red-500" : ""}
              />
              {formErrors.appointmentTime && (
                <p className="text-red-500 text-sm">{formErrors.appointmentTime}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Appointment</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentTab;