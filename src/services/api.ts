
import axios from 'axios';
import { Appointment, Category, LoginCredentials, Product, RegisterCredentials, Service, TeamMember, User } from '@/types';

// Create axios instance
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },
  register: async (credentials: RegisterCredentials) => {
    const response = await api.post('/api/auth/register', credentials);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

// Appointment API
export const appointmentAPI = {
  getAll: async () => {
    const response = await api.get('/api/Appointment');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/Appointment/${id}`);
    return response.data;
  },
  create: async (appointment: Omit<Appointment, 'id'>) => {
    const response = await api.post('/api/Appointment', appointment);
    return response.data;
  },
  update: async (id: number, appointment: Omit<Appointment, 'id'>) => {
    const response = await api.put(`/api/Appointment/${id}`, appointment);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/api/Appointment/${id}`);
    return response.data;
  },
};

// Category API
export const categoryAPI = {
  getAll: async () => {
    const response = await api.get('/api/Category');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/Category/${id}`);
    return response.data;
  },
  create: async (category: Omit<Category, 'id'>) => {
    const response = await api.post('/api/Category', category);
    return response.data;
  },
  update: async (id: number, category: Omit<Category, 'id'>) => {
    const response = await api.put(`/api/Category/${id}`, category);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/api/Category/${id}`);
    return response.data;
  },
};

// Service API
export const serviceAPI = {
  getAll: async () => {
    const response = await api.get('/api/OurServices');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/OurServices/${id}`);
    return response.data;
  },
  create: async (service: Omit<Service, 'id'>) => {
    const response = await api.post('/api/OurServices', service);
    return response.data;
  },
  update: async (id: number, service: Omit<Service, 'id'>) => {
    const response = await api.put(`/api/OurServices/${id}`, service);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/api/OurServices/${id}`);
    return response.data;
  },
};

// Product API
export const productAPI = {
  getAll: async () => {
    const response = await api.get('/api/Product');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/Product/${id}`);
    return response.data;
  },
  create: async (product: Omit<Product, 'id'>) => {
    const response = await api.post('/api/Product', product);
    return response.data;
  },
  update: async (product: Product) => {
    const response = await api.put('/api/Product', product);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/api/Product/${id}`);
    return response.data;
  },
};

// Team API
export const teamAPI = {
  getAll: async () => {
    const response = await api.get('/api/Team');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/Team/${id}`);
    return response.data;
  },
  create: async (member: Omit<TeamMember, 'id'>) => {
    const response = await api.post('/api/Team', member);
    return response.data;
  },
  update: async (id: number, member: Omit<TeamMember, 'id'>) => {
    const response = await api.put(`/api/Team/${id}`, member);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/api/Team/${id}`);
    return response.data;
  },
};

export default api;
