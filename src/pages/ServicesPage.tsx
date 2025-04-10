// /pages/services.tsx
import React from 'react';
import Layout from '@/components/layout/Layout';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useServices } from '@/contexts/ServiceContext';

const ServicesPage: React.FC = () => {
  const {
    serviceCategories,
    selectedCategory,
    searchTerm,
    loading,
    error,
    setSelectedCategory,
    setSearchTerm,
    filteredServices,
    resetFilters,
  } = useServices();

  return (
    <Layout>
      <div className="bg-brand-blue text-white py-20">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl">
            Discover our comprehensive range of beauty and wellness services
            designed to enhance your natural beauty and promote relaxation.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <div className="flex flex-col gap-6">
              <div className="relative max-w-md">
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                  disabled={loading}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  disabled={loading}
                >
                  All Services
                </Button>
                {serviceCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    disabled={loading}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading services...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                No services found matching your search criteria
              </p>
              <Button onClick={resetFilters}>
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