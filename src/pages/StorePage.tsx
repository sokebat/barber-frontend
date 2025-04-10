
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Slider
} from "@/components/ui/slider";
import { Category, Product } from '@/types';
import { Search, SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const [productsData, categoriesData] = await Promise.all([
        //   productAPI.getAll(),
        //   categoryAPI.getAll()
        // ]);
        
        // Mock data for demonstration
        const productsData: Product[] = [
          {
            id: 1,
            name: 'Hydrating Shampoo',
            description: 'Premium hydrating shampoo for all hair types. Enriched with natural oils and vitamins for healthy, shiny hair.',
            price: 24.99,
            discountPrice: 19.99,
            imageUrl: 'https://images.unsplash.com/photo-1626766632648-f5e0c0a1506a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            categoryName: 'Hair Care',
            categoryId: 1
          },
          {
            id: 2,
            name: 'Beard Oil',
            description: 'Nourishing beard oil for a healthy, shiny beard. Contains argan oil and vitamin E to soften and condition facial hair.',
            price: 29.99,
            imageUrl: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            categoryName: 'Beard Care',
            categoryId: 2
          },
          {
            id: 3,
            name: 'Anti-Aging Serum',
            description: 'Powerful anti-aging serum with retinol and hyaluronic acid. Reduces fine lines and wrinkles for a youthful appearance.',
            price: 49.99,
            discountPrice: 39.99,
            imageUrl: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            categoryName: 'Skin Care',
            categoryId: 3
          },
          {
            id: 4,
            name: 'Professional Hair Dryer',
            description: 'Salon-quality hair dryer with multiple heat and speed settings. Features ionic technology for smooth, frizz-free results.',
            price: 89.99,
            imageUrl: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            categoryName: 'Grooming Tools',
            categoryId: 4
          },
          {
            id: 5,
            name: 'Hair Styling Cream',
            description: 'Medium-hold styling cream for natural-looking styles. Perfect for all hair types and lengths.',
            price: 18.99,
            imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            categoryName: 'Hair Care',
            categoryId: 1
          },
          {
            id: 6,
            name: 'Beard Grooming Kit',
            description: 'Complete beard care set including beard wash, oil, balm, and trimming scissors.',
            price: 59.99,
            discountPrice: 49.99,
            imageUrl: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            categoryName: 'Beard Care',
            categoryId: 2
          },
          {
            id: 7,
            name: 'Moisturizing Face Cream',
            description: 'Deeply hydrating face cream suitable for all skin types. Provides 24-hour hydration with natural ingredients.',
            price: 34.99,
            imageUrl: 'https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            categoryName: 'Skin Care',
            categoryId: 3
          },
          {
            id: 8,
            name: 'Professional Beard Trimmer',
            description: 'High-precision beard trimmer with multiple length settings and ergonomic design.',
            price: 79.99,
            discountPrice: 69.99,
            imageUrl: 'https://images.unsplash.com/photo-1621607512051-36f7c777f6ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            categoryName: 'Grooming Tools',
            categoryId: 4
          }
        ];
        
        const categoriesData: Category[] = [
          { id: 1, name: 'Hair Care' },
          { id: 2, name: 'Beard Care' },
          { id: 3, name: 'Skin Care' },
          { id: 4, name: 'Grooming Tools' }
        ];
        
        setProducts(productsData);
        setCategories(categoriesData);
        
        // Find max price for price slider
        const maxPrice = Math.max(...productsData.map(p => p.price));
        setPriceRange([0, maxPrice]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const price = product.discountPrice || product.price;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setPriceRange([0, Math.max(...products.map(p => p.price))]);
  };
  
  return (
    <Layout>
      <div className="bg-brand-blue text-white py-20">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Shop Our Products</h1>
          <p className="text-xl max-w-3xl">
            Take home the same high-quality products we use in our salon for ongoing care and maintenance.
          </p>
        </div>
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Search & Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
              <div className="relative w-full md:w-1/3">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <Button 
                variant="outline" 
                className="md:ml-auto flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            {showFilters && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 animate-fade-in">
                <h3 className="text-lg font-medium mb-4">Filters</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All
                    </Button>
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={Math.max(...products.map(p => p.price))}
                      step={1}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="mt-6"
                    />
                  </div>
                </div>
                
                <Button onClick={clearFilters} variant="outline" size="sm">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <p className="text-gray-500 mb-6">{filteredProducts.length} products found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
              <Button onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default StorePage;
