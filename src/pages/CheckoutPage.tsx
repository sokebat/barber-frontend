import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, ShoppingBag, Truck, User } from 'lucide-react';

interface UserInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      navigate('/cart');
    }
  }, [cart.items, navigate, toast]);

  // Pre-fill user info if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserInfo({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        address: '',
        city: '',
        postalCode: '',
      });
    }
  }, [isAuthenticated, user]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate user info
    if (!userInfo.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!userInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(userInfo.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!userInfo.address.trim()) newErrors.address = "Address is required";
    if (!userInfo.city.trim()) newErrors.city = "City is required";
    if (!userInfo.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^\d{5}$/.test(userInfo.postalCode)) {
      newErrors.postalCode = "Postal code must be 5 digits";
    }

    // Validate payment info
    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format";
    }
    if (!paymentInfo.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = async () => {
    if (!validateForm()) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // In a real application, this would process the payment and create an order
      // Example: Integrate with Stripe or another payment gateway
      // const paymentResponse = await processPayment(paymentInfo, cart.total);

      // Simulate a delay for the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Order Confirmed",
        description: "Thank you for your purchase! Your order has been placed.",
      });

      clearCart();
      navigate('/orders'); // Redirect to an orders page (you can create this later)
    } catch (error) {
      console.error("Error confirming order:", error);
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Format card number as XXXX XXXX XXXX XXXX
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" /> Order Summary
              </h2>
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 mb-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">{item.product.categoryName}</p>
                    <p className="text-sm">
                      Quantity: {item.quantity} x $
                      {(item.product.discountPrice || item.product.price).toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5" /> Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={userInfo.fullName}
                    onChange={handleUserInfoChange}
                    placeholder="John Doe"
                    className={errors.fullName ? 'border-red-500' : ''}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    placeholder="john.doe@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleUserInfoChange}
                    placeholder="1234567890"
                    className={errors.phone ? 'border-red-500' : ''}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={userInfo.address}
                    onChange={handleUserInfoChange}
                    placeholder="123 Main St"
                    className={errors.address ? 'border-red-500' : ''}
                    aria-describedby={errors.address ? 'address-error' : undefined}
                  />
                  {errors.address && (
                    <p id="address-error" className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={userInfo.city}
                    onChange={handleUserInfoChange}
                    placeholder="New York"
                    className={errors.city ? 'border-red-500' : ''}
                    aria-describedby={errors.city ? 'city-error' : undefined}
                  />
                  {errors.city && (
                    <p id="city-error" className="text-red-500 text-sm mt-1">
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={userInfo.postalCode}
                    onChange={handleUserInfoChange}
                    placeholder="12345"
                    className={errors.postalCode ? 'border-red-500' : ''}
                    aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
                  />
                  {errors.postalCode && (
                    <p id="postalCode-error" className="text-red-500 text-sm mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Payment Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={formatCardNumber(paymentInfo.cardNumber)}
                    onChange={handlePaymentInfoChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={errors.cardNumber ? 'border-red-500' : ''}
                    aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
                  />
                  {errors.cardNumber && (
                    <p id="cardNumber-error" className="text-red-500 text-sm mt-1">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentInfoChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={errors.expiryDate ? 'border-red-500' : ''}
                      aria-describedby={errors.expiryDate ? 'expiryDate-error' : undefined}
                    />
                    {errors.expiryDate && (
                      <p id="expiryDate-error" className="text-red-500 text-sm mt-1">
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentInfoChange}
                      placeholder="123"
                      maxLength={3}
                      className={errors.cvv ? 'border-red-500' : ''}
                      aria-describedby={errors.cvv ? 'cvv-error' : undefined}
                    />
                    {errors.cvv && (
                      <p id="cvv-error" className="text-red-500 text-sm mt-1">
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>
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
                <Button
                  className="w-full mt-4"
                  onClick={handleConfirmOrder}
                  disabled={loading}
                  aria-label="Confirm order"
                >
                  {loading ? "Processing..." : "Confirm Order"}
                </Button>
                <Button asChild variant="outline" className="w-full mt-2">
                  <Link to="/cart">Back to Cart</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;