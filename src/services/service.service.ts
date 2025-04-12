import { axiosPublic } from "@/axios/axios";
import { ServiceCategory, UpdateServiceDto } from "@/types/ServiceService.types";
import { ApiResponse } from "@/types/team.type";

class ServiceService {
  async getAllServices(): Promise<ApiResponse<ServiceCategory[]>> {
    try {
      const res = await axiosPublic.get("/OurServices");
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

  async getServiceById(id: string): Promise<ApiResponse<ServiceCategory>> {
    try {
      const res = await axiosPublic.get(`/OurServices/${id}`);
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

  async createService(data: ServiceCategory): Promise<ApiResponse<ServiceCategory>> {
    try {
      const res = await axiosPublic.post("/OurServices", data);
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
  ): Promise<ApiResponse<ServiceCategory>> {
    try {
      const res = await axiosPublic.put(`/OurServices/${id}`, data);
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
      const res = await axiosPublic.delete(`/OurServices/${id}`);
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
