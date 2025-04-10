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
export interface Category {
  id: number;
  name: string;
}

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

// Product
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  categoryName: string;
  categoryId?: number;
  rating?: number;
  reviewCount?: number;
  sku?: string;
  weight?: string;
  details?: string;
  ingredients?: string;
  directions?: string;
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
