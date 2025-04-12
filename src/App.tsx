import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import BookingPage from "./pages/BookingPage";
import StorePage from "./pages/StorePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Provider from "./contexts/provider";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccess from "./pages/PayementSucess";
import PaymentFailure from "./pages/PayementFailure";
const App = () => (
  
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="store">
          <Route index element={<StorePage />} />
          <Route path=":productId" element={<ProductDetailPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
            path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
