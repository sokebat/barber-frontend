import AppointmentTab from "@/components/admin/AppointmentTab";
import DashboardTab from "@/components/admin/DashboardTab";
import ProductsTab from "@/components/admin/ProductsTab";
import ReportsTab from "@/components/admin/ReportsTab";
import ServiceTab from "@/components/admin/ServiceTab";
import Sidebar from "@/components/admin/Sidebar";
import TeamTab from "@/components/admin/TeamTab";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useServices } from "@/contexts/ServiceContext";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { Appointment, Product, Service, TeamMember } from "@/types";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeam } from "@/contexts/TeamContext";
import { useAppointment } from "@/contexts/ApointmentContext";
const AdminDashboard: React.FC = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");

  // Mock data
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const { teams } = useTeam();
  const { appointments: allAppointments, getAllAppointments } =
    useAppointment();
  const { services } = useServices();
  useEffect(() => {
    // Check if user is admin, otherwise redirect

    const fetchData = async () => {
      setLoading(true);
      try {
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

        setAppointments(allAppointments);

        setProducts(productsData);
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
  }, [authState, navigate, toast]);

  useEffect(() => {
    getAllAppointments();
  }, []);

  // useEffect(() => {
  //   if (!authState.isAuthenticated || authState.user?.role !== "admin") {
  //     toast({
  //       title: "Unauthorized",
  //       description: "You don't have permission to access this page.",
  //       variant: "destructive",
  //     });
  //     navigate("/");
  //     return;
  //   }
  // }, [ ]);

  // useEffect(() => {
  //   if (!authState.isAuthenticated || authState.user?.role !== "admin") {
  //     toast({
  //       title: "Unauthorized",
  //       description: "You don't have permission to access this page.",
  //       variant: "destructive",
  //     });
  //     navigate("/");
  //     return;
  //   }
  // }, [authState , navigate, toast]);

  const getOverviewStats = () => {
    return {
      totalAppointments: appointments.length,
      pendingAppointments: appointments.filter((a) => !a.isApproved).length,
      totalServices: services.length,
      totalProducts: products.length,
      totalTeamMembers: teams.length,
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
              {activeTab === "appointments" && <AppointmentTab />}

              {/* Services Tab */}
              {activeTab === "services" && <ServiceTab />}

              {/* Products Tab */}
              {activeTab === "products" && <ProductsTab products={products} />}

              {/* Team Tab */}
              {activeTab === "team" && <TeamTab />}

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
