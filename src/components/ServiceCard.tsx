
import React from 'react';
import { Service } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={service.serviceImageUrl} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-brand-blue">{service.name}</h3>
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
        
        <div className="flex justify-between items-center">
          <Button asChild variant="outline" size="sm">
            <Link to={`/services/${service.id}`}>Details</Link>
          </Button>
          <Button asChild>
            <Link to={`/book?service=${service.id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
