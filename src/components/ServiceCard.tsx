import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Update interface to match the transformed API data
interface ServiceItem {
  id: string | number;
  name: string;
  description: string;
  serviceImageUrl: string;
  price: number;
  duration: string;
  categoryId: number;
  categoryName: string;
  type?: string; // For male/female distinction if needed
}

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {

  console.log(service.serviceImageUrl,"service.serviceImageUrl")
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.serviceImageUrl}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {service.type && (
          <div className="absolute top-2 right-2 bg-brand-blue text-white text-xs px-2 py-1 rounded-full">
            {service.type === 'male' ? 'For Men' : 'For Women'}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-brand-blue">{service.name}</h3>
          {service.categoryName && (
            <div className="flex items-center text-xs text-gray-500">
              <Tag className="h-3 w-3 mr-1" />
              <span>{service.categoryName}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          {service.price && (
            <div className="flex items-center text-gray-700">
              <DollarSign className="h-4 w-4 mr-1 text-brand-gold" />
              <span>${service.price.toFixed(2)}</span>
            </div>
          )}
          
          {service.duration && (
            <div className="flex items-center text-gray-700">
              <Clock className="h-4 w-4 mr-1 text-brand-gold" />
              <span>{service.duration}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-end items-center">
          {/* <Button asChild variant="outline" size="sm">
            <Link to={`/services/${service.id}`}>Details</Link>
          </Button> */}
          <Button asChild>
            <Link to={`/book?service=${service.id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 