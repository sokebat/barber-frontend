import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@/contexts/storeContext";
import { Search, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";

const StorePage: React.FC = () => {
  const {
    products,
    categories,
    loading,
    error,
    fetchCategories,
    fetchProducts,
  } = useStore();
  console.log("StorePage - Products:", products);
  console.log("StorePage - Categories:", categories);
  console.log("StorePage - Loading:", loading);
  console.log("StorePage - Error:", error);

  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  // Update price range when products load
  useEffect(() => {
    if (products.length > 0 && priceRange[1] === 100) {
      const maxPrice = Math.max(...products.map((p) => p.price));
      setPriceRange([0, maxPrice]);
    }
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategoryName
      ? product.categoryName === selectedCategoryName
      : true;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const price = product.discountPrice || product.price;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategoryName(null);
    setPriceRange([
      0,
      products.length > 0 ? Math.max(...products.map((p) => p.price)) : 100,
    ]);
  };

  const handleRefresh = async () => {
    console.log("Manually refreshing data...");
    await Promise.all([fetchCategories(), fetchProducts()]);
  };

  return (
    <Layout>
      <div className="bg-brand-blue text-white py-20">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Shop Our Products</h1>
          <p className="text-xl max-w-3xl">
            Take home the same high-quality products we use in our salon for
            ongoing care and maintenance.
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

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  Refresh
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 animate-fade-in">
                <h3 className="text-lg font-medium mb-4">Filters</h3>

                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={
                        selectedCategoryName === null ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategoryName(null)}
                    >
                      All
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategoryName === category.name
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategoryName(category.name)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={
                        products.length > 0
                          ? Math.max(...products.map((p) => p.price))
                          : 100
                      }
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

          {error && (
            <div className="text-center py-12 text-red-500">
              <p>{error}</p>
              <Button onClick={handleRefresh} className="mt-4">
                Try Again
              </Button>
            </div>
          )}

          {loading && !error ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : !error && filteredProducts.length > 0 ? (
            <>
              <p className="text-gray-500 mb-6">
                {filteredProducts.length} products found
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            !error && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  No products found matching your criteria.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )
          )}
        </div>
      </section>
    </Layout>
  );
};

export default StorePage;
