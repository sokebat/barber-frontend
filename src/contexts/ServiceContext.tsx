import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
      
import { ServiceCategory, UIService, ServicesContextProps } from '@/types/ServiceService.types';
import ServiceService from '@/services/service.service';
const ServiceContext = createContext<ServicesContextProps | undefined>(undefined);

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

interface ServicesProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServicesProviderProps> = ({ children }) => {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<UIService[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ServiceService.getAllServices();
      
      if (response.success && response.data) {
        const categories = response.data as ServiceCategory[];
        setServiceCategories(categories);

        // Transform categories into a flat list of UI services
        const transformedServices: UIService[] = categories.flatMap(category => 
          category.data.map(item => ({
            id: `${category.id}-${item.id}`,
            name: item.title,
            subtitle: item.subtitle,
            description: `${item.subtitle} | ${category.description}`,
            serviceImageUrl: item.image || category.serviceImageUrl,
            price: item.price,
            type: item.type,
            duration:  '30 min', // Use backend duration, fallback to default
            categoryId: category.id,
            categoryName: category.name,
          }))
        );

        setServices(transformedServices);
      } else {
        throw new Error(response.message || 'No services data received');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services';
      setError(errorMessage);
      setServices([]);
      setServiceCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = React.useMemo(() => {
    return services.filter(service => {
      const matchesCategory = selectedCategory === null || service.categoryId === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
        
      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchTerm]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  const value: ServicesContextProps = {
    services,
    serviceCategories,
    selectedCategory,
    searchTerm,
    loading,
    error,
    setSelectedCategory,
    setSearchTerm,
    fetchServices,
    filteredServices,
    resetFilters,
  };

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
};

export default ServiceProvider;