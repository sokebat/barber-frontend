import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const { clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get and decode the data parameter
        const dataParam = searchParams.get("data");
        if (!dataParam) {
          throw new Error("No payment data received");
        }

        let paymentData;
        try {
          paymentData = JSON.parse(atob(dataParam));
        } catch (error) {
          throw new Error("Invalid payment data format");
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
        if (
          !transaction_code ||
          !status ||
          !total_amount ||
          !transaction_uuid ||
          !signature
        ) {
          throw new Error("Missing required payment fields");
        }

        // Payment verified
        toast({
          title: "Payment Successful",
          description: `Your order has been placed successfully. Transaction ID: ${transaction_code}`,
        });
        clearCart();
        setTimeout(() => {
          localStorage.removeItem("cartTotal"); // Clean
          navigate("/store");
        }, 2000);
      } catch (error) {
        console.error("Payment verification error:", error);
        toast({
          title: "Payment Verification Failed",
          description:
            error instanceof Error
              ? error.message
              : "Unable to verify payment. Please contact support.",
          variant: "destructive",
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
        <p className="text-gray-600">
          Please wait while we verify your payment.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
