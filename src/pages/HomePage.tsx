import Hero from "@/components/Hero";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import TeamMemberCard from "@/components/TeamMemberCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { useServices } from "@/contexts/ServiceContext";
import { useTeam } from "@/contexts/TeamContext";
import { Product, Service } from "@/types";
import { Award, Calendar, Check, Clock } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const { teams } = useTeam();

  const {
    serviceCategories,
    selectedCategory,
    searchTerm,
    loading,
    error,
    setSelectedCategory,
    setSearchTerm,
    filteredServices,
    resetFilters,
  } = useServices();

  console.log(teams, "teams");

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Hydrating Shampoo",
      description: "Premium hydrating shampoo for all hair types.",
      price: 24.99,
      discountPrice: 19.99,
      imageUrl:
        "https://images.unsplash.com/photo-1626766632648-f5e0c0a1506a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
      categoryName: "Hair Care",
    },
    {
      id: 2,
      name: "Beard Oil",
      description: "Nourishing beard oil for a healthy, shiny beard.",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
      categoryName: "Beard Care",
    },
  ];

  const testimonials = [
    {
      name: "Emily Johnson",
      rating: 5,
      text: "The haircut I received was absolutely amazing! The stylist understood exactly what I wanted and delivered beyond my expectations.",
      date: "April 2, 2025",
    },
    {
      name: "Michael Thompson",
      rating: 5,
      text: "The massage was incredibly relaxing. I've been to many spas, but this experience was truly exceptional. Will definitely come back!",
      date: "March 25, 2025",
    },
    {
      name: "Sarah Parker",
      rating: 4,
      text: "Wonderful facial treatment. My skin feels rejuvenated and looks much better. The staff was very professional and friendly.",
      date: "April 5, 2025",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Hero
        title="Experience Luxury & Renewal"
        subtitle="Premium hair, beauty, and spa services tailored to enhance your natural beauty and well-being."
        ctaText="Book Appointment"
        ctaLink="/book"
        secondaryCtaText="Explore Services"
        secondaryCtaLink="/services"
        backgroundImage="https://images.unsplash.com/photo-1610368171057-56a6327c1aff?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Exceptional services with premium products for outstanding
                results.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Staff</h3>
              <p className="text-gray-600">
                Highly trained professionals dedicated to your satisfaction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple online booking system to schedule your appointments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
              <p className="text-gray-600">
                Open 7 days a week with early and late appointments available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle
            title="Our Services"
            subtitle="Discover our range of premium beauty and wellness services designed to rejuvenate and transform."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a New Look?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book your appointment today and let our experts help you look and
            feel your best.
          </p>
          <Button
            asChild
            className="bg-brand-gold text-brand-blue hover:bg-brand-gold/90"
            size="lg"
          >
            <Link to="/book">Book Appointment</Link>
          </Button>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Meet Our Team"
            subtitle="Our team of skilled professionals is dedicated to providing you with exceptional service and care."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teams.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/about">View All Team Members</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle
            title="Shop Our Products"
            subtitle="Take home the same high-quality products we use in our salon for ongoing care and maintenance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/store">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Client Testimonials"
            subtitle="Don't take our word for it. Hear what our clients have to say about their experiences."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
