import { Product } from "./ProductService.types";

// Authentication
export interface User {
  id?: number;
  email: string;
  fullName: string;
  role?: 'customer' | 'staff' | 'admin';
}



export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  fullName: string;
  password: string;
}

// Appointment
export interface Appointment {
  id: number;
  serviceName: string;
  specialistName: string;
  customerName: string;
  appointmentDate: string;
  appointmentTime: string;
  isApproved: boolean;
}

// Service Category
 

// Service
export interface Service {
  id: number;
  name: string;
  description: string;
  serviceImageUrl: string;
  duration?: string;
  price?: number;
  categoryId?: number;
  categoryName?: string;
  data?: any[];
}

  

// Team Member
export interface TeamMember {
  id: number;
  name: string;
  description: string;
  profileImageUrl: string;
  specialty: string;
}

// Cart Item
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

// Shopping Cart
export interface Cart {
  items: CartItem[];
  total: number;
}
