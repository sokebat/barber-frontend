import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types";
import {
  ArrowLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();


  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const productData = await productAPI.getById(productId);

        // Mock data for demonstration
        const productsData = [
          {
            id: 1,
            name: "Hydrating Shampoo",
            description:
              "Premium hydrating shampoo for all hair types. Enriched with natural oils and vitamins for healthy, shiny hair.",
            price: 24.99,
            discountPrice: 19.99,
            imageUrl:
              "https://images.unsplash.com/photo-1626766632648-f5e0c0a1506a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
            categoryName: "Hair Care",
            categoryId: 1,
            details:
              "Our Hydrating Shampoo is specially formulated to nourish and hydrate all hair types. The rich blend of natural oils, vitamins, and botanical extracts work together to cleanse while maintaining your hair's natural moisture balance. Perfect for daily use, this gentle formula helps prevent dryness and breakage, leaving your hair feeling soft, healthy, and looking its best.",
            ingredients:
              "Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Panthenol, Argan Oil, Vitamin E, Aloe Vera Extract, Citric Acid, Fragrance, Phenoxyethanol, Ethylhexylglycerin.",
            directions:
              "Apply to wet hair, massage into scalp and hair, rinse thoroughly. For best results, follow with our Hydrating Conditioner.",
            sku: "HC-001",
            weight: "250ml",
            rating: 4.7,
            reviewCount: 124,
          },
          {
            id: 2,
            name: "Beard Oil",
            description:
              "Nourishing beard oil for a healthy, shiny beard. Contains argan oil and vitamin E to soften and condition facial hair.",
            price: 29.99,
            imageUrl:
              "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
            categoryName: "Beard Care",
            categoryId: 2,
            details:
              "Our premium Beard Oil is designed to nourish, soften, and condition your facial hair while moisturizing the skin underneath. The lightweight formula absorbs quickly without leaving a greasy residue, helping to reduce itchiness and flakiness while promoting healthier beard growth.",
            ingredients:
              "Argan Oil, Jojoba Oil, Sweet Almond Oil, Vitamin E, Cedarwood Essential Oil, Sandalwood Essential Oil",
            directions:
              "Apply 3-5 drops to palm, rub hands together, and work through beard from roots to ends. Use daily for best results.",
            sku: "BC-001",
            weight: "30ml",
            rating: 4.8,
            reviewCount: 87,
          },
          {
            id: 3,
            name: "Anti-Aging Serum",
            description:
              "Powerful anti-aging serum with retinol and hyaluronic acid. Reduces fine lines and wrinkles for a youthful appearance.",
            price: 49.99,
            discountPrice: 39.99,
            imageUrl:
              "https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
            categoryName: "Skin Care",
            categoryId: 3,
            details:
              "Our powerful Anti-Aging Serum combines retinol and hyaluronic acid to target multiple signs of aging. This advanced formula works to reduce the appearance of fine lines and wrinkles while improving skin elasticity and texture. The added hyaluronic acid provides deep hydration, plumping the skin for a more youthful appearance.",
            ingredients:
              "Water, Retinol, Hyaluronic Acid, Glycerin, Niacinamide, Vitamin C, Vitamin E, Aloe Vera Extract, Peptide Complex",
            directions:
              "Apply a small amount to clean, dry skin in the evening. Allow to fully absorb before applying moisturizer. Use 2-3 times per week initially, gradually increasing frequency as tolerated.",
            sku: "SC-001",
            weight: "30ml",
            rating: 4.9,
            reviewCount: 156,
          },
          // More products...
        ];

        const foundProduct = productsData.find(
          (p) => p.id === parseInt(productId || "0")
        );

        if (foundProduct) {
          setProduct(foundProduct);

          // Get related products from the same category
          const related = productsData
            .filter(
              (p) =>
                p.categoryId === foundProduct.categoryId &&
                p.id !== foundProduct.id
            )
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <p className="text-gray-500">Loading product information...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <p className="text-gray-500">Product not found</p>
          <Button asChild className="mt-4">
            <Link to="/store">Return to Store</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container-custom">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-brand-blue">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/store" className="hover:text-brand-blue">
              Store
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              to={`/store?category=${product.categoryId}`}
              className="hover:text-brand-blue"
            >
              {product.categoryName}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-700 font-medium truncate">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>

            {/* Product Info */}
            <div>
              <Link
                to="/store"
                className="inline-flex items-center text-gray-500 hover:text-brand-blue mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to store
              </Link>

              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                {product.discountPrice ? (
                  <>
                    <span className="text-2xl font-bold">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                      Save ${(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-8">{product.description}</p>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <p className="text-sm text-gray-500 mr-4">Quantity:</p>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="px-3 py-2 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-2 border-x text-center w-12">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full md:w-auto mr-2 mb-2"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="flex gap-x-4 text-sm">
                  <div>
                    <p className="text-gray-500">SKU</p>
                    <p className="font-medium">{product.sku}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Size</p>
                    <p className="font-medium">{product.weight}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium">{product.categoryName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="howToUse">How to Use</TabsTrigger>
              </TabsList>
              <TabsContent
                value="details"
                className="p-6 border rounded-md mt-2"
              >
                <p className="text-gray-700">{product.details}</p>
              </TabsContent>
              <TabsContent
                value="ingredients"
                className="p-6 border rounded-md mt-2"
              >
                <p className="text-gray-700">{product.ingredients}</p>
              </TabsContent>
              <TabsContent
                value="howToUse"
                className="p-6 border rounded-md mt-2"
              >
                <p className="text-gray-700">{product.directions}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 section-padding">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetailPage;
