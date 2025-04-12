import { axiosPublic } from "@/axios/axios";
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
      const res = await axiosPublic.get("/Appointment");
      return {
        success: res.data.success,
        data: res.data.data,
        message: res.data.message,
        status: res.status,
        error: res.data.error,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getAppointmentById(id: string): Promise<ApiResponse<Appointment>> {
    try {
      const res = await axiosPublic.get(`/Appointment/${id}`);
      return {
        success: res.data.success,
        data: res.data.data,
        message: res.data.message,
        status: res.status,
        error: res.data.error,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async createAppointment(data: CreateAppointmentDto): Promise<ApiResponse<Appointment>> {
    try {
      const res = await axiosPublic.post("/Appointment", data);
      return {
        success: res.data.success,
        data: res.data.data,
        message: res.data.message,
        status: res.status,
        error: res.data.error,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async updateAppointment(id: string, data: UpdateAppointmentDto): Promise<ApiResponse<Appointment>> {
    try {
      const res = await axiosPublic.put(`/Appointment/${id}`, data);
      return {
        success: res.data.success,
        data: res.data.data,
        message: res.data.message,
        status: res.status,
        error: res.data.error,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async deleteAppointment(id: string): Promise<ApiResponse<null>> {
    try {
      const res = await axiosPublic.delete(`/Appointment/${id}`);
      return {
        success: res.data.success,
        data: null,
        message: res.data.message,
        status: res.status,
        error: res.data.error,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse<any> {
    const response = error?.response?.data || {};
    return {
      success: false,
      data: null,
      message: response.message || "Something went wrong",
      status: error?.response?.status || 500,
      error: response.error || null,
    };
  }
}

export default new AppointmentService();