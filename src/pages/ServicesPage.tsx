
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';
import { Service, Category } from '@/types';
import { serviceAPI, categoryAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const [servicesData, categoriesData] = await Promise.all([
        //   serviceAPI.getAll(),
        //   categoryAPI.getAll()
        // ]);
        
        // Mock data for demonstration
        const servicesData: Service[] = [
          {
            id: 1,
            name: 'Premium Haircut & Styling',
            description: 'Complete transformation with expert cutting and styling techniques customized to your face shape and lifestyle.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 65,
            duration: '60 min',
            categoryId: 1,
            categoryName: 'Hair'
          },
          {
            id: 2,
            name: 'Men\'s Haircut & Beard Trim',
            description: 'Classic men\'s haircut with precision beard trimming and styling for a polished look.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 45,
            duration: '45 min',
            categoryId: 1,
            categoryName: 'Hair'
          },
          {
            id: 3,
            name: 'Hair Coloring',
            description: 'Vibrant, long-lasting hair color services including full color, highlights, balayage, and ombre techniques.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 95,
            duration: '120 min',
            categoryId: 1,
            categoryName: 'Hair'
          },
          {
            id: 4,
            name: 'Relaxation Massage',
            description: 'Release tension and promote relaxation with our skilled therapists. Customized pressure to suit your preferences.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 85,
            duration: '60 min',
            categoryId: 2,
            categoryName: 'Massage'
          },
          {
            id: 5,
            name: 'Deep Tissue Massage',
            description: 'Intensive massage focusing on relieving chronic tension with firm pressure and targeted techniques.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 95,
            duration: '60 min',
            categoryId: 2,
            categoryName: 'Massage'
          },
          {
            id: 6,
            name: 'Signature Facial',
            description: 'Revitalize your skin with our customized facial treatments targeting your specific skin concerns.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 75,
            duration: '45 min',
            categoryId: 3,
            categoryName: 'Facial'
          },
          {
            id: 7,
            name: 'Manicure & Pedicure',
            description: 'Complete nail care service including nail shaping, cuticle care, exfoliation, massage, and polish application.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1610992136753-22f0242cdef7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 65,
            duration: '75 min',
            categoryId: 4,
            categoryName: 'Nails'
          },
          {
            id: 8,
            name: 'Waxing Services',
            description: 'Smooth, long-lasting hair removal for any area of the body using premium wax for minimal discomfort.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 40,
            duration: '30 min',
            categoryId: 5,
            categoryName: 'Hair Removal'
          }
        ];
        
        const categoriesData: Category[] = [
          { id: 1, name: 'Hair' },
          { id: 2, name: 'Massage' },
          { id: 3, name: 'Facial' },
          { id: 4, name: 'Nails' },
          { id: 5, name: 'Hair Removal' }
        ];
        
        setServices(servicesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory ? service.categoryId === selectedCategory : true;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <Layout>
      <div className="bg-brand-blue text-white py-20">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl">
            Discover our comprehensive range of beauty and wellness services designed to enhance your natural beauty and promote relaxation.
          </p>
        </div>
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Search & Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading services...</p>
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No services found matching your criteria.</p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
