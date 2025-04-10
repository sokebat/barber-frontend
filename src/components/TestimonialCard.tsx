
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  image?: string;
  date?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  rating,
  text,
  image,
  date,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {image && (
          <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <h4 className="font-semibold text-lg">{name}</h4>
          {date && <p className="text-gray-500 text-sm">{date}</p>}
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-600 italic">"{text}"</p>
    </div>
  );
};

export default TestimonialCard;
