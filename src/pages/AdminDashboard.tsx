import AppointmentTab from "@/components/admin/AppointmentTab";
import CategoriesTab from "@/components/admin/CategoriesTab";
import DashboardTab from "@/components/admin/DashboardTab";
import ProductsTab from "@/components/admin/ProductsTab";
import ReportsTab from "@/components/admin/ReportsTab";
import ServiceTab from "@/components/admin/ServiceTab";
import Sidebar from "@/components/admin/Sidebar";
import TeamTab from "@/components/admin/TeamTab";
import { Button } from "@/components/ui/button";
import { useAppointment } from "@/contexts/ApointmentContext";
import { useAuth } from "@/contexts/AuthContext";
import { useServices } from "@/contexts/ServiceContext";
import { useStore } from "@/contexts/storeContext";
import { useTeam } from "@/contexts/TeamContext";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const AdminDashboard: React.FC = () => {
  const { user} = useAuth();
  
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { teams } = useTeam();
  const { appointments , getAllAppointments } =
    useAppointment();
  const { services } = useServices();
  const { products, fetchProducts } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([getAllAppointments(), fetchProducts()]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen   gap-4   bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <main className=" w-full  pr-8  py-8">
        <div className="w-full  ">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "dashboard" && "Dashboard Overview"}
                {activeTab === "appointments" && "Appointment Management"}
                {activeTab === "services" && "Services Management"}
                {activeTab === "products" && "Product Management"}
                {activeTab === "categories" && "Categories Management"}
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
              <div
                className="w-10 h-10 rounded-full bg-brand-gold text-brand-blue flex items-center justify-center font-bold mr-2"
                aria-label={`Profile of ${user?.fullName}`}
              >
                {user?.fullName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{user?.fullName}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>

          <div className=" ">
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
            {activeTab === "products" && <ProductsTab />}

            {/* Categories Tab */}
            {activeTab === "categories" && <CategoriesTab />}

            {/* Team Tab */}
            {activeTab === "team" && <TeamTab />}

            {/* Reports Tab */}
            {activeTab === "reports" && <ReportsTab />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
