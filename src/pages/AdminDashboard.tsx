import AppointmentTab from "@/components/admin/AppointmentTab";
import DashboardTab from "@/components/admin/DashboardTab";
import ProductsTab from "@/components/admin/ProductsTab";
import ReportsTab from "@/components/admin/ReportsTab";
import ServiceTab from "@/components/admin/ServiceTab";
import TeamTab from "@/components/admin/TeamTab";
import Sidebar from "@/components/admin/Sidebar";
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
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Appointment, Product, Service, TeamMember } from "@/types";
import {
  Calendar,
  FileText,
  Home,
  LogOut,
  Menu,
  PlusCircle,
  Scissors,
  Store,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminDashboard: React.FC = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");
  const [isMobile, setIsMobile] = useState(false);

  // Mock data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin, otherwise redirect
    if (!authState.isAuthenticated || authState.user?.role !== "admin") {
      toast({
        title: "Unauthorized",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app we would fetch data from the API

        // Mock data
        const appointmentsData: Appointment[] = [
          {
            id: 1,
            serviceName: "Premium Haircut & Styling",
            specialistName: "Sophia Rodriguez",
            customerName: "John Smith",
            appointmentDate: "2025-04-12T10:00:00",
            appointmentTime: "10:00 AM",
            isApproved: true,
          },
          {
            id: 2,
            serviceName: "Relaxation Massage",
            specialistName: "James Wilson",
            customerName: "Emma Johnson",
            appointmentDate: "2025-04-12T14:00:00",
            appointmentTime: "2:00 PM",
            isApproved: true,
          },
          {
            id: 3,
            serviceName: "Hair Coloring",
            specialistName: "Sophia Rodriguez",
            customerName: "Michael Davis",
            appointmentDate: "2025-04-13T11:00:00",
            appointmentTime: "11:00 AM",
            isApproved: false,
          },
          {
            id: 4,
            serviceName: "Signature Facial",
            specialistName: "Emma Chen",
            customerName: "Sarah Wilson",
            appointmentDate: "2025-04-14T15:00:00",
            appointmentTime: "3:00 PM",
            isApproved: false,
          },
        ];

        const servicesData: Service[] = [
          {
            id: 1,
            name: "Premium Haircut & Styling",
            description:
              "Complete transformation with expert cutting and styling techniques.",
            serviceImageUrl:
              "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
            price: 65,
            duration: "60 min",
          },
          {
            id: 2,
            name: "Relaxation Massage",
            description:
              "Release tension and promote relaxation with our skilled therapists.",
            serviceImageUrl:
              "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
            price: 85,
            duration: "60 min",
          },
          {
            id: 3,
            name: "Signature Facial",
            description:
              "Revitalize your skin with our customized facial treatments.",
            serviceImageUrl:
              "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
            price: 75,
            duration: "45 min",
          },
        ];

        const productsData: Product[] = [
          {
            id: 1,
            name: "Hydrating Shampoo",
            description: "Premium hydrating shampoo for all hair types.",
            price: 24.99,
            discountPrice: 19.99,
            imageUrl:
              "https://images.unsplash.com/photo-1626766632648-f5e0c0a1506a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
            categoryName: "Hair Care",
          },
          {
            id: 2,
            name: "Beard Oil",
            description: "Nourishing beard oil for a healthy, shiny beard.",
            price: 29.99,
            imageUrl:
              "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
            categoryName: "Beard Care",
          },
        ];

        const teamData: TeamMember[] = [
          {
            id: 1,
            name: "Sophia Rodriguez",
            description:
              "With over 10 years of experience, Sophia specializes in cutting-edge hair design and coloring techniques.",
            profileImageUrl:
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
            specialty: "Hair Stylist",
          },
          {
            id: 2,
            name: "James Wilson",
            description:
              "James is a certified massage therapist with expertise in Swedish, deep tissue, and hot stone massage.",
            profileImageUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
            specialty: "Massage Therapist",
          },
          {
            id: 3,
            name: "Emma Chen",
            description:
              "Emma is a licensed esthetician specializing in customized facials and skin treatments.",
            profileImageUrl:
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
            specialty: "Esthetician",
          },
        ];

        setAppointments(appointmentsData);
        setServices(servicesData);
        setProducts(productsData);
        setTeam(teamData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [authState, navigate, toast]);

  const handleApproveAppointment = (id: number) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, isApproved: true }
          : appointment
      )
    );

    toast({
      title: "Appointment Approved",
      description: "The appointment has been approved successfully.",
    });
  };

  const handleRejectAppointment = (id: number) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );

    toast({
      title: "Appointment Rejected",
      description: "The appointment has been rejected and removed.",
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getOverviewStats = () => {
    return {
      totalAppointments: appointments.length,
      pendingAppointments: appointments.filter((a) => !a.isApproved).length,
      totalServices: services.length,
      totalProducts: products.length,
      totalTeamMembers: team.length,
    };
  };

  const stats = getOverviewStats();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <div className="block lg:hidden fixed z-20 top-4 left-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white shadow-md"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <main
        className={`flex-1 h-full overflow-y-scroll  p-6 lg:p-8 ${
          isSidebarOpen ? "lg:ml-0" : ""
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "dashboard" && "Dashboard Overview"}
                {activeTab === "appointments" && "Appointment Management"}
                {activeTab === "services" && "Services Management"}
                {activeTab === "products" && "Product Management"}
                {activeTab === "team" && "Team Management"}
                {activeTab === "reports" && "Reports & Analytics"}
              </h1>
              <p className="text-gray-500 mt-1">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center">
              <div className="w-10 h-10 rounded-full bg-brand-gold text-brand-blue flex items-center justify-center font-bold mr-2">
                {authState.user?.fullName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">
                  {authState.user?.fullName}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* Dashboard Overview */}
              {activeTab === "dashboard" && (
                <DashboardTab
                  stats={stats}
                  appointments={appointments}
                  setActiveTab={setActiveTab}
                  formatDate={formatDate}
                />
              )}

              {/* Appointments Tab */}
              {activeTab === "appointments" && (
                <AppointmentTab
                  appointments={appointments}
                  formatDate={formatDate}
                  handleApproveAppointment={handleApproveAppointment}
                  handleRejectAppointment={handleRejectAppointment}
                />
              )}

              {/* Services Tab */}
              {activeTab === "services" && <ServiceTab services={services} />}

              {/* Products Tab */}
              {activeTab === "products" && <ProductsTab products={products} />}

              {/* Team Tab */}
              {activeTab === "team" && <TeamTab team={team} />}

              {/* Reports Tab */}
              {activeTab === "reports" && <ReportsTab />}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
