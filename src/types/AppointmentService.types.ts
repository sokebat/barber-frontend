export interface Appointment {
  id: number;
  serviceName: string;
  specialistName: string;
  customerName: string;
  appointmentDate: string; // ISO string (e.g., "2025-04-10T00:00:00")
  appointmentTime: string; // "13:30:00"
  isApproved: boolean;
}

export interface CreateAppointmentDto {
  id: number;
  serviceName: string;
  specialistName: string;
  customerName: string;
  appointment: string; // full ISO datetime (optional in backend maybe?)
  appointmentDate: string;
  appointmentTime: string;
  isApproved: boolean;
}

export interface UpdateAppointmentDto {
  id: number;
  serviceName?: string;
  specialistName?: string;
  customerName?: string;
  appointment?: string; // full ISO datetime (optional in backend maybe?)
  appointmentDate?: string;
  appointmentTime?: string;
  isApproved?: boolean;
}

export interface ServiceItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  type: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  serviceImageUrl: string;
  data: ServiceItem[];
}

export interface UIService {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  description: string;
  serviceImageUrl: string;
  price: number;
  duration: string;
  categoryId: number;
  categoryName: string;
}

export interface ServicesContextProps {
  services: UIService[];
  serviceCategories: ServiceCategory[];
  selectedCategory: number | null;
  searchTerm: string;
  loading: boolean;
  error: string | null;
  setSelectedCategory: (categoryId: number | null) => void;
  setSearchTerm: (term: string) => void;
  filteredServices: UIService[];
  resetFilters: () => void;
  fetchServices: () => Promise<void>;
}
