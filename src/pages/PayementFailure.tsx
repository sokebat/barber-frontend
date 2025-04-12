// src/pages/PaymentFailure.tsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const PaymentFailure: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleFailure = () => {
      // Extract any error details (if provided by eSewa)
      const errorMessage = searchParams.get('error') || 'Unknown error';

      toast({
        title: 'Payment Failed',
        description: `Your payment could not be processed. Reason: ${errorMessage}. Please try again.`,
        variant: 'destructive',
      });
      setTimeout(() => navigate('/cart'), 3000); // Redirect to cart after 3 seconds
    };
    handleFailure();
  }, [navigate, toast, searchParams]);

  return (
    <div className="container-custom py-16 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Payment Failed</h2>
        <p className="text-gray-600">We’re sorry, your payment could not be processed.</p>
        <p className="text-gray-600">You will be redirected to your cart shortly.</p>
      </div>
    </div>
  );
};

export default PaymentFailure;