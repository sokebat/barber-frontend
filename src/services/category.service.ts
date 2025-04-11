import { axiosPrivate, axiosPublic } from "@/axios/axios";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/CategoryService.types";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  status: number;
  error?: any;
}

class CategoryService {
  async getAllCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const res = await axiosPublic.get("/Category");
      console.log(res.data, "res.data from category service");
      return {
        success: true,
        data: res.data,
        message: "Categories fetched successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getCategoryById(id: number): Promise<ApiResponse<Category>> {
    try {
      const res = await axiosPublic.get(`/Category/${id}`);
      return {
        success: true,
        data: res.data,
        message: "Category fetched",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async createCategory(
    data: CreateCategoryDto
  ): Promise<ApiResponse<Category>> {
    try {
      const res = await axiosPublic.post("/Category", data);
      return {
        success: true,
        data: res.data,
        message: "Category created successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async updateCategory(
    id: number,
    data: UpdateCategoryDto
  ): Promise<ApiResponse<Category>> {
    try {
      const res = await axiosPublic.put(`/Category/${id}`, data);
      return {
        success: true,
        data: res.data,
        message: "Category updated successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async deleteCategory(id: number): Promise<ApiResponse<null>> {
    try {
      const res = await axiosPublic.delete(`/Category/${id}`);
      return {
        success: true,
        data: res.data,
        message: "Category deleted successfully",
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

export default new CategoryService();
