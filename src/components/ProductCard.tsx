
import React from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/store/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
          {product.discountPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              Sale
            </div>
          )}
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-500 mb-1">{product.categoryName}</p>
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center gap-2 mb-4">
            {product.discountPrice ? (
              <>
                <span className="font-semibold text-lg">${product.discountPrice.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <Button asChild variant="outline" size="sm">
              <Link to={`/store/${product.id}`}>Details</Link>
            </Button>
            <Button onClick={handleAddToCart} size="sm">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
