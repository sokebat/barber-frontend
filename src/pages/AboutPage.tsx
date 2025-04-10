import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/SectionTitle';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* About Hero Section */}
      <div className="bg-brand-blue text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About SalonSuite</h1>
          <p className="text-xl max-w-3xl">
            Premium beauty and wellness services to rejuvenate your mind, body, and spirit.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-4">
                Founded in 2015, SalonSuite began with a simple mission: to provide exceptional beauty and wellness services in a luxurious, welcoming environment. What started as a small salon with just three chairs has now grown into a comprehensive beauty destination.
              </p>
              <p className="mb-4">
                Our founder, Sarah James, began her career as a stylist and had a vision of creating a space where clients could receive top-quality services from passionate professionals who truly care about their craft and their clients.
              </p>
              <p>
                Today, SalonSuite is proud to offer a wide range of services from haircare to massage therapy, facials, and more. We've assembled a team of talented professionals who share our commitment to excellence and customer satisfaction.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80" 
                alt="Salon interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Our Values" 
            subtitle="The principles that guide everything we do at SalonSuite."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p>
                We strive for excellence in every service we provide, using only premium products and continuously updating our techniques and knowledge.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Integrity</h3>
              <p>
                We operate with honesty, transparency, and ethical practices in all aspects of our business, from pricing to product recommendations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Client-Centered</h3>
              <p>
                Our clients are at the heart of everything we do. We listen, understand, and tailor our services to meet their unique needs and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p>123 Beauty Lane</p>
                    <p>Wellness City, WC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-brand-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-brand-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p>info@salonsuite.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-brand-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p>Saturday: 9:00 AM - 6:00 PM</p>
                    <p>Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
              {/* This would typically be a Google Map or similar */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215583065787!2d-74.00597242346168!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s123%20Broadway%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1642809505176!5m2!1sen!2sus" 
                className="w-full h-full border-0" 
                allowFullScreen 
                loading="lazy"
                title="SalonSuite Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;