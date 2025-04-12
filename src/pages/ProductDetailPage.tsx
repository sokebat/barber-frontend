import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/ProductService.types";
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
import ProductService from "@/services/product.service";
import { useStore } from "@/contexts/StoreContext";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { products } = useStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching product with ID: ${productId}`);
        const response = await ProductService.getProductById(
          parseInt(productId)
        );
        console.log("Product response:", response);

        if (response.success && response.data) {
          setProduct(response.data);

          // Find related products from the same category using context products
          const related = products
            .filter(
              (p) =>
                p.categoryName === response.data.categoryName &&
                p.id !== response.data.id
            )
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          setError(response.message || "Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, products]);

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

  if (error || !product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <p className="text-red-500">{error || "Product not found"}</p>
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
              to={`/store?category=${product.categoryName}`}
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

              <div className="flex items-center gap-3 mb-6">
                {product.discountPrice ? (
                  <>
                    <span className="text-2xl font-bold">
                      NPR{" "}{product.price - product.discountPrice}
                    </span>
                    <span className="text-gray-500 line-through">
                      NPR{" "}{product.price}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                      Save NPR{" "}{product.discountPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">
                    NPR{product.price.toFixed(2)}
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
            </div>
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
