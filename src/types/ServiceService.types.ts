// types/AppointmentService.types.ts
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
  id: string; // Format: `${categoryId}-${itemId}`
  name: string;
  subtitle: string;
  description: string; // Combines item subtitle and category description
  serviceImageUrl: string; // Item image, fallback to category image
  price: number;
  type: string;
  duration: string; // Not in JSON, adding for completeness
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
}

export interface Services {
  id: number;
  name: string;
  description: string;
  serviceImageUrl: string;
  data: ServiceItem[];
}

export interface UpdateServiceDto {
  id: number;
  name?: string;
  description?: string;
  serviceImageUrl?: string;
  data?: {
    id?: number;
    image?: string;
    title?: string;
    subtitle?: string;
    price?: number;
    type?: string;
  }[];
}
