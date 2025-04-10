
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem, Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface CartContextProps {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => {
      const price = item.product.discountPrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(item => item.product.id === product.id);
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item if product not in cart
        updatedItems = [
          ...prevCart.items,
          { id: Date.now(), product, quantity }
        ];
      }
      
      const newTotal = calculateTotal(updatedItems);
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
      
      return { items: updatedItems, total: newTotal };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(item => item.product.id !== productId);
      const newTotal = calculateTotal(updatedItems);
      
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      });
      
      return { items: updatedItems, total: newTotal };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
      const newTotal = calculateTotal(updatedItems);
      
      return { items: updatedItems, total: newTotal };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
