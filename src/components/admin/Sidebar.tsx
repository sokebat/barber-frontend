import React from "react";
import { Button } from "../ui/button";
import { LogOut, Calendar, Scissors, Store, Users, FileText, Home, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  setActiveTab,
}: SidebarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isMobile = window.innerWidth < 768;

  return (
    <aside
      className={`fixed lg:relative z-10  min-h-screen bg-brand-blue text-white transition-all duration-300 ${
        isSidebarOpen
          ? "w-64 translate-x-0"
          : "w-0 -translate-x-full lg:w-20 lg:translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1
              className={`text-xl font-bold ${!isSidebarOpen && "lg:hidden"}`}
            >
              Admin<span className="text-brand-gold">Panel</span>
            </h1>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="text-white hover:bg-brand-blue/60 -mr-2"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 pb-4">
          <ul className="space-y-2">
            <li>
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-brand-blue/60 ${
                  activeTab === "dashboard" ? "bg-brand-blue/60" : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <Calendar className="h-5 w-5 mr-2" />
                <span className={!isSidebarOpen ? "lg:hidden" : ""}>
                  Dashboard
                </span>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-brand-blue/60 ${
                  activeTab === "appointments" ? "bg-brand-blue/60" : ""
                }`}
                onClick={() => setActiveTab("appointments")}
              >
                <Calendar className="h-5 w-5 mr-2" />
                <span className={!isSidebarOpen ? "lg:hidden" : ""}>
                  Appointments
                </span>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-brand-blue/60 ${
                  activeTab === "services" ? "bg-brand-blue/60" : ""
                }`}
                onClick={() => setActiveTab("services")}
              >
                <Scissors className="h-5 w-5 mr-2" />
                <span className={!isSidebarOpen ? "lg:hidden" : ""}>
                  Services
                </span>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-brand-blue/60 ${
                  activeTab === "products" ? "bg-brand-blue/60" : ""
                }`}
                onClick={() => setActiveTab("products")}
              >
                <Store className="h-5 w-5 mr-2" />
                <span className={!isSidebarOpen ? "lg:hidden" : ""}>
                  Products
                </span>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-brand-blue/60 ${
                  activeTab === "team" ? "bg-brand-blue/60" : ""
                }`}
                onClick={() => setActiveTab("team")}
              >
                <Users className="h-5 w-5 mr-2" />
                <span className={!isSidebarOpen ? "lg:hidden" : ""}>Team</span>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-brand-blue/60 ${
                  activeTab === "reports" ? "bg-brand-blue/60" : ""
                }`}
                onClick={() => setActiveTab("reports")}
              >
                <FileText className="h-5 w-5 mr-2" />
                <span className={!isSidebarOpen ? "lg:hidden" : ""}>
                  Reports
                </span>
              </Button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-brand-blue/30">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-brand-blue/60"
            onClick={() => navigate("/")}
          >
            <Home className="h-5 w-5 mr-2" />
            <span className={!isSidebarOpen ? "lg:hidden" : ""}>
              Back to Site
            </span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-brand-blue/60 mt-2"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span className={!isSidebarOpen ? "lg:hidden" : ""}>Logout</span>
          </Button>
        </div>
      </div>
    </aside>        
  );
};

export default Sidebar;
