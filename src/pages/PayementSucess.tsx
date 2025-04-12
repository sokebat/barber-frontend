// src/pages/PaymentSuccess.tsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import * as CryptoJS from 'crypto-js';

const PaymentSuccess: React.FC = () => {
  const { clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get and decode the data parameter
        const dataParam = searchParams.get('data');
        if (!dataParam) {
          throw new Error('No payment data received');
        }

        let paymentData;
        try {
          paymentData = JSON.parse(atob(dataParam));
        } catch (error) {
          throw new Error('Invalid payment data format');
        }

        const {
          transaction_code,
          status,
          total_amount,
          transaction_uuid,
          product_code,
          signed_field_names,
          signature,
        } = paymentData;

        // Validate required fields
        if (!transaction_code || !status || !total_amount || !transaction_uuid || !signature) {
          throw new Error('Missing required payment fields');
        }

        // Verify status
        if (status !== 'COMPLETE') {
          throw new Error(`Payment status is ${status}, not COMPLETE`);
        }

        // Verify signature
        const secretKey = import.meta.env.VITE_ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q';
        const message = signed_field_names
          .split(',')
          .map((field: string) => `${field}=${paymentData[field]}`)
          .join(',');
        console.log('Verification Message:', message); // Debug
        const computedHash = CryptoJS.HmacSHA256(message, secretKey);
        const computedSignature = CryptoJS.enc.Base64.stringify(computedHash);

        if (computedSignature !== signature) {
          throw new Error('Invalid signature');
        }

        // Verify amount (compare with cart total, ideally stored in localStorage or backend)
       

        // Payment verified
        toast({
          title: 'Payment Successful',
          description: `Your order has been placed successfully. Transaction ID: ${transaction_code}`,
        });
        clearCart();
        localStorage.removeItem("cartTotal"); // Clean up
        setTimeout(() => navigate("/store"), 5000);
      } catch (error) {
        console.error("Payment verification error:", error);
        toast({
          title: 'Payment Verification Failed',
          description: error instanceof Error ? error.message : 'Unable to verify payment. Please contact support.',
          variant: 'destructive',
        });
        setTimeout(() => navigate("/cart"), 2000);
      }
    };
    verifyPayment();
  }, [clearCart, navigate, toast, searchParams]);

  return (
    <div className="container-custom py-16 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
        <p className="text-gray-600">Please wait while we verify your payment.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;