import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleCheckout = () => {
    // In a real application, this would navigate to a checkout page or process
    toast({
      title: "Checkout initiated",
      description: "In a real application, you would proceed to payment."
    });
    
    // Clear the cart after checkout
    clearCart();
  };
  
  if (cart.items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/store">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-12 p-4 bg-gray-50 font-medium text-sm">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <Separator />
              
              {cart.items.map((item) => (
                <div key={item.id}>
                  <div className="grid grid-cols-12 p-4 items-center">
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.categoryName}</p>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 text-sm flex items-center gap-1 mt-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center">
                      {item.product.discountPrice ? (
                        <div>
                          <span className="text-red-500 font-medium">${item.product.discountPrice.toFixed(2)}</span>
                          <span className="text-gray-400 line-through text-sm block">${item.product.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span>${item.product.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <div className="col-span-2 flex items-center justify-center">
                      <div className="flex items-center border rounded">
                        <button 
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                          className="w-12 border-0 text-center p-0 h-8"
                        />
                        <button 
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-right font-medium">
                      $
                      {((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
              
              <div className="p-4 flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-sm"
                >
                  Clear Cart
                </Button>
                <Button asChild variant="outline" className="text-sm">
                  <Link to="/store">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">We Accept:</h3>
                <div className="flex justify-between">
                  {/* Placeholder for payment method icons */}
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;