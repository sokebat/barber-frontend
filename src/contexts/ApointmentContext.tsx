import React, { createContext, useContext, ReactNode, useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const getAllAppointments = async (): Promise<ApiResponse<Appointment[]>> => {
    setLoading(true);
    setError(null);
    try {
      const response = await AppointmentService.getAllAppointments();
      if (response.success && response.data) {
        setAppointments(response.data);
      } else {
        setError(response.message);
      }
      return response;
    } catch (err: any) {
      const message = err.message || "An unexpected error occurred";
      setError(message);
      return {
        success: false,
        data: null,
        message,
        status: 500,
        error: err,
      };
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
    } catch (err: any) {
      const message = err.message || "An unexpected error occurred";
      setError(message);
      return {
        success: false,
        data: null,
        message,
        status: 500,
        error: err,
      };
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