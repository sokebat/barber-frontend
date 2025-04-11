import { axiosPrivate, axiosPublic } from "@/axios/axios";
import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/ProductService.types";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  status: number;
  error?: any;
}

class ProductService {
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const res = await axiosPublic.get("/Product");
      return {
        success: true,
        data: res.data,
        message: "Products fetched successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getProductById(id: number): Promise<ApiResponse<Product>> {
    try {
      const res = await axiosPublic.get(`/Product/${id}`);
      return {
        success: true,
        data: res.data,
        message: "Product fetched",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async createProduct(data: CreateProductDto): Promise<ApiResponse<Product>> {
    try {
      const res = await axiosPublic.post("/Product", data);
      console.log(res.data, "res.data from create product");
      return {
        success: true,
        data: res.data,
        message: "Product created successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async updateProduct(
    id: number,
    data: UpdateProductDto
  ): Promise<ApiResponse<Product>> {
    try {
      const res = await axiosPublic.put(`/Product/${id}`, data);
      return {
        success: true,
        data: res.data,
        message: "Product updated successfully",
        status: res.status,
      };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async deleteProduct(id: number): Promise<ApiResponse<null>> {
    try {
      const res = await axiosPublic.delete(`/Product/${id}`);
      return {
        success: true,
        data: null,
        message: "Product deleted successfully",
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

export default new ProductService();
