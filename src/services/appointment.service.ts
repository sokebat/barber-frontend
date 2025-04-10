import { axiosPrivate, axiosPublic } from "@/axios/axios";
import {
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from "@/types/AppointmentService.types";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  status: number;
  error?: any;
}

class AppointmentService {
  async getAllAppointments(): Promise<ApiResponse<Appointment[]>> {
    try {
      const res = await axiosPrivate.get(" /Appointment");
      return {
        success: true,
        data: res.data,
        message: "Appointments fetched successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getAppointmentById(id: string): Promise<ApiResponse<Appointment>> {
    try {
      const res = await axiosPublic.get(`/Appointment/${id}`);
      return {
        success: true,
        data: res.data,
        message: "Appointment fetched",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async createAppointment(data: CreateAppointmentDto): Promise<ApiResponse<Appointment>> {
    try {
      const res = await axiosPublic.post("/Appointment", data);
      return {
        success: true,
        data: res.data,
        message: "Appointment created successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async updateAppointment(
    id: string,
    data: UpdateAppointmentDto
  ): Promise<ApiResponse<Appointment>> {
    try {
      const res = await axiosPrivate.put(`/Appointment/${id}`, data);
      return {
        success: true,
        data: res.data,
        message: "Appointment updated successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async deleteAppointment   (id: string): Promise<ApiResponse<null>> {
    try {
      const res = await axiosPrivate.delete(`/Appointment/${id}`);
      return {
        success: true,
        data: null,
        message: "Appointment deleted successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse<any> {
    return {
      success: false,
      data: null,
      message: error?.response?.data?.message || "Something went wrong",
      status: error?.response?.status || 500,
      error: error?.response?.data?.errors || null,
    };
  }
}

export default new AppointmentService();
