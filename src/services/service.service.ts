import { axiosPrivate, axiosPublic } from "@/axios/axios";
import {
  Service,
  CreateServiceDto,
  UpdateServiceDto,
} from "@/types/ServiceService.types";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  status: number;
  error?: any;
}

class ServiceService {
  async getAllServices(): Promise<ApiResponse<Service[]>> {
    try {
      const res = await axiosPublic.get("/OurServices");
      console.log(res.data, "res.data");
      console.log(res,"all services")
      return {
        success: true,
        data: res.data,
        message: "Services fetched successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getServiceById(id: string): Promise<ApiResponse<Service>> {
    try {
      const res = await axiosPublic.get(`/services/${id}`);
      return {
        success: true,
        data: res.data,
        message: "Service fetched",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async createService(data: CreateServiceDto): Promise<ApiResponse<Service>> {
    try {
      const res = await axiosPublic.post("/services", data);
      return {
        success: true,
        data: res.data,
        message: "Service created successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async updateService(
    id: string,
    data: UpdateServiceDto
  ): Promise<ApiResponse<Service>> {
    try {
      const res = await axiosPrivate.put(`/services/${id}`, data);
      return {
        success: true,
        data: res.data,
        message: "Service updated successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async deleteService(id: string): Promise<ApiResponse<null>> {
    try {
      const res = await axiosPrivate.delete(`/services/${id}`);
      return {
        success: true,
        data: null,
        message: "Service deleted successfully",
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

export default new ServiceService();
