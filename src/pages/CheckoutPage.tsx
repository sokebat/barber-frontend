import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, Truck } from "lucide-react";
import * as CryptoJS from "crypto-js";

interface UserInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [transactionUuid, setTransactionUuid] = useState("");

  // eSewa configuration
  const secretKey = import.meta.env.VITE_ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q"; // Fallback for testing
  const productCode = "EPAYTEST";
  const successUrl = `${window.location.origin}/payment-success`;
  const failureUrl = `${window.location.origin}/payment-failure`;

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      navigate("/cart");
    }
  }, [cart.items, navigate, toast]);

  // Pre-fill user info if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserInfo({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        address: "",
        city: "",
        postalCode: "",
      });
    }
  }, [isAuthenticated, user]);

  // Generate transaction UUID
  useEffect(() => {
    const generateTransactionUuid = () => {
      const currentTime = new Date();
      const formattedTime =
        currentTime.toISOString().slice(2, 10).replace(/-/g, "") +
        "-" +
        currentTime.getHours() +
        currentTime.getMinutes() +
        currentTime.getSeconds();
      setTransactionUuid(formattedTime);
    };
    generateTransactionUuid();
  }, []);

  // Validate user info
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate eSewa signature
  const generateSignature = (totalAmount: string) => {
    const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
    console.log("Signature Message:", message); // Debug
    console.log("Secret Key:", secretKey); // Debug (remove in production)
    const hash = CryptoJS.HmacSHA256(message, secretKey);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  };

  // Handle form submission to eSewa
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
      const totalAmount = cart.total.toFixed(2);
      const signature = generateSignature(totalAmount);

      // Store cart total for verification
      localStorage.setItem("cartTotal", totalAmount);

      // Log form data for debugging
      const fields = {
        amount: totalAmount,
        tax_amount: "0",
        total_amount: totalAmount,
        transaction_uuid: transactionUuid,
        product_code: productCode,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: successUrl,
        failure_url: failureUrl,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: signature,
      };
      console.log("eSewa Form Fields:", fields);

      // Create a form programmatically
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      form.target = "_blank";

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      toast({
        title: "Redirecting to eSewa",
        description: "You are being redirected to the eSewa payment page.",
      });
    } catch (error) {
      console.error("Error initiating eSewa payment:", error);
      toast({
        title: "Payment Failed",
        description:
          "There was an error initiating the payment. Please try again.",
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
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 mb-4"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.product.categoryName}
                    </p>
                    <p className="text-sm">
                      Quantity: {item.quantity} x $
                      {(
                        item.product.discountPrice || item.product.price
                      ).toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">
                    $
                    {(
                      (item.product.discountPrice || item.product.price) *
                      item.quantity
                    ).toFixed(2)}
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
                    className={errors.fullName ? "border-red-500" : ""}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                  />
                  {errors.fullName && (
                    <p
                      id="fullName-error"
                      className="text-red-500 text-sm mt-1"
                    >
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
                    className={errors.email ? "border-red-500" : ""}
                    aria-describedby={errors.email ? "email-error" : undefined}
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
                    className={errors.phone ? "border-red-500" : ""}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
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
                    className={errors.address ? "border-red-500" : ""}
                    aria-describedby={
                      errors.address ? "address-error" : undefined
                    }
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
                    className={errors.city ? "border-red-500" : ""}
                    aria-describedby={errors.city ? "city-error" : undefined}
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
                    className={errors.postalCode ? "border-red-500" : ""}
                    aria-describedby={
                      errors.postalCode ? "postalCode-error" : undefined
                    }
                  />
                  {errors.postalCode && (
                    <p
                      id="postalCode-error"
                      className="text-red-500 text-sm mt-1"
                    >
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
                <ShoppingBag className="h-5 w-5" /> Payment
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">
                    You will be redirected to eSewa to complete your payment.
                  </p>
                  <p className="font-medium mt-2">
                    Total Amount: ${cart.total.toFixed(2)}
                  </p>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={handleConfirmOrder}
                  disabled={loading}
                  aria-label="Pay with eSewa"
                >
                  {loading ? "Processing..." : "Pay with eSewa"}
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
