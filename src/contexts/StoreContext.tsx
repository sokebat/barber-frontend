import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/ProductService.types";
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";
import { Category } from "@/types/CategoryService.types";

interface StoreContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  fetchProducts: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType>({
  products: [],
  categories: [],
  loading: true,
  error: null,
  fetchCategories: async () => {},
  fetchProducts: async () => {},
});

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching categories...");
      const categoriesData = await CategoryService.getAllCategories();
      console.log("Categories response:", categoriesData);
      if (categoriesData.success && categoriesData.data) {
        setCategories(categoriesData.data);
      } else {
        setError(categoriesData.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching products...");
      const productsData = await ProductService.getAllProducts();
      console.log("Products response:", productsData);
      if (productsData.success && productsData.data) {
        setProducts(productsData.data);
      } else {
        setError(productsData.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      console.log("Starting data load...");
      setLoading(true);
      setError(null);
      try {
        await Promise.all([fetchCategories(), fetchProducts()]);
      } catch (error) {
        console.error("Data load failed:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
        console.log("Data load complete.");
      }
    };

    loadData();
  }, []);

  return (
    <StoreContext.Provider
      value={{ products, categories, loading, error, fetchCategories, fetchProducts }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);