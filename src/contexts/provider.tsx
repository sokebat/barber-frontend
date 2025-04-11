import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ServiceProvider } from "@/contexts/ServiceContext";
import { TeamProvider } from "@/contexts/TeamContext";
import { AppointmentProvider } from "./ApointmentContext";
import { StoreProvider } from "./storeContext";
const Provider = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <CookiesProvider>
      <AuthProvider>
        <AppointmentProvider>
          <StoreProvider>
            <ServiceProvider>
              <TeamProvider>
                <CartProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    {children}
                  </TooltipProvider>
                </CartProvider>
              </TeamProvider>
            </ServiceProvider>
          </StoreProvider>
        </AppointmentProvider>
      </AuthProvider>
    </CookiesProvider>
  );
};

export default Provider;
