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
      console.log("getAllAppointments");
      const res = await axiosPublic.get("/Appointment");
      console.log(res.data, "getAllAppointments");
      return {
        success: true,
        data: res.data,
        message: "Appointments fetched successfully",
        status: res.status,
      };
    } catch (error: any) {
      console.log(error, "getAllAppointments");
      return this.handleError(error);
    }
  }

  async getAppointmentById(id: string): Promise<ApiResponse<Appointment>> {
    try {
      const res = await axiosPublic.get(`/Appointment/${id}`);
      console.log(res.data, "getAppointmentById");
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
      const res = await axiosPublic.put(`/Appointment/${id}`, data);
      console.log(res.data, "updateAppointment"); 
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

  async deleteAppointment(id: string): Promise<ApiResponse<null>> {
    try {
      const res = await axiosPublic.delete(`/Appointment/${id}`);
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
