export interface User {
  id: string
  name: string
  email: string
  role: "customer" | "staff" | "admin"
  image?: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  image: string
  category: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export interface Appointment {
  id: string
  userId: string
  serviceId: string
  staffId: string
  date: Date
  status: "pending" | "confirmed" | "completed" | "cancelled"
}

export interface CartItem {
  id: string
  quantity: number
  type: "product" | "service"
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  createdAt: Date
}

