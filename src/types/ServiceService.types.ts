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
  description: string;
  serviceImageUrl: string;
  price: number;
  type: string;
  duration: string;
  categoryId: number;
  categoryName: string;
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


export interface ServicesContextProps {
  services: UIService[];
  serviceCategories: ServiceCategory[];
  selectedCategory: number | null;
  setSelectedCategory: (categoryId: number | null) => void;
  searchTerm: string;
  fetchServices: () => void;
  setSearchTerm: (term: string) => void;
  filteredServices: UIService[];
  resetFilters: () => void;
  loading: boolean;
  error: string | null;
}


// Utility to transform ServiceCategory to UIService
export const transformToUIServices = (
  categories: ServiceCategory[]
): UIService[] => {
  return categories.flatMap((category) =>
    category.data.map((item) => ({
      id: `${category.id}-${item.id}`,
      name: item.title,
      subtitle: item.subtitle,
      description: `${item.subtitle} - ${category.description}`,
      serviceImageUrl: item.image || category.serviceImageUrl,
      price: item.price,
      type: item.type,
      duration: "30 minutes", // Placeholder; update when backend supports duration
      categoryId: category.id,
      categoryName: category.name,
    }))
  );
};
