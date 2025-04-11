import React from "react";
import { Button } from "../ui/button";
import {
  LogOut,
  Calendar,
  Scissors,
  Store,
  Users,
  FileText,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeBg?: string; // Optional custom background for active state
}

const Sidebar = ({
  isSidebarOpen,

  activeTab,
  setActiveTab,
}: SidebarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Navigation items as JSON array
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Calendar },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "services", label: "Services", icon: Scissors },
    { id: "products", label: "Products", icon: Store },
    {
      id: "categories",
      label: "Categories",
      icon: Store,
    },
    { id: "team", label: "Team", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  // Footer items (separate for different behavior)
  const footerItems: NavItem[] = [
    { id: "home", label: "Back to Site", icon: Home },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  return (
    <aside
      className={`fixed lg:relative z-10 min-h-screen bg-brand-blue text-white transition-all duration-300 ${
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
          </div>
        </div>

        <nav className="flex-1 px-4 pb-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-brand-gold ${
                    activeTab === item.id ? "bg-brand-gold" : ""
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span className={!isSidebarOpen ? "lg:hidden" : ""}>
                    {item.label}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-brand-blue/30">
          {footerItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start text-white hover:bg-brand-gold ${
                activeTab === item.id ? "bg-brand-gold" : ""
              }`}
              onClick={() =>
                item.id === "logout" ? (logout(), navigate("/")) : navigate("/")
              }
            >
              <item.icon className="h-5 w-5 mr-2" />
              <span className={!isSidebarOpen ? "lg:hidden" : ""}>
                {item.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
