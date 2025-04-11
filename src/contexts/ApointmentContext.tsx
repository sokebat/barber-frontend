import React, { createContext, useContext, ReactNode } from "react";
import AppointmentService from "@/services/appointment.service";
import { Appointment } from "@/types/AppointmentService.types";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  status: number;
  error?: any;
}

interface AppointmentContextType {
  getAllAppointments: () => Promise<ApiResponse<Appointment[]>>;
  getAppointmentById: (id: string) => Promise<ApiResponse<Appointment>>;
  loading: boolean;
  error: string | null;
  appointments: Appointment[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);

  // Get all appointments with proper loading/error state
  const getAllAppointments = async (): Promise<ApiResponse<Appointment[]>> => {
    setLoading(true);
    setError(null);
    try {
      const response = await AppointmentService.getAllAppointments();
      if (response.success && response.data) {
        console.log(response.data,"full appoinments")
        setAppointments(response.data);
      } else {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError("An unexpected error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAppointmentById = async (id: string): Promise<ApiResponse<Appointment>> => {
    setLoading(true);
    setError(null);
    try {
      const response = await AppointmentService.getAppointmentById(id);
      if (!response.success) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError("An unexpected error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: AppointmentContextType = {
    getAllAppointments,
    getAppointmentById,
    loading,
    error,
    appointments,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointment must be used within an AppointmentProvider");
  }
  return context;
};
