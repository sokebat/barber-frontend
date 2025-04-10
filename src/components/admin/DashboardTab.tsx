import React from "react";
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "../ui/card";
import { Calendar, Scissors, Store, Users, Bell } from "lucide-react";
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

interface DashboardTabProps {
  stats: any;
  appointments: any;
  setActiveTab: (tab: string) => void;
  formatDate: (date: string) => string;
}

const DashboardTab: React.FC<DashboardTabProps> = ({
  stats,
  appointments,
  setActiveTab,
  formatDate,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.pendingAppointments} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalServices}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available services
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">In inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeamMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">Active staff</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>Latest appointment bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.slice(0, 5).map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.customerName}</TableCell>
                    <TableCell>{appointment.serviceName}</TableCell>
                    <TableCell>
                      {formatDate(appointment.appointmentDate)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={appointment.isApproved ? "default" : "outline"}
                      >
                        {appointment.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full justify-start"
              onClick={() => setActiveTab("appointments")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Manage Appointments
            </Button>
            <Button
              className="w-full justify-start"
              onClick={() => setActiveTab("services")}
            >
              <Scissors className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
            <Button
              className="w-full justify-start"
              onClick={() => setActiveTab("products")}
            >
              <Store className="mr-2 h-4 w-4" />
              Manage Inventory
            </Button>
            <Button
              className="w-full justify-start"
              onClick={() => setActiveTab("team")}
            >
              <Users className="mr-2 h-4 w-4" />
              Schedule Staff
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Send Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardTab;
