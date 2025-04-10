
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Salon<span className="text-brand-gold">Suite</span></h3>
            <p className="text-gray-300 mb-4">
              Premium hair, beauty, and spa services for the discerning client. Experience luxury and rejuvenation in our tranquil environment.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-brand-gold transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/book" className="text-gray-300 hover:text-brand-gold transition-colors">Book Appointment</Link>
              </li>
              <li>
                <Link to="/store" className="text-gray-300 hover:text-brand-gold transition-colors">Shop Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brand-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-brand-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/haircuts" className="text-gray-300 hover:text-brand-gold transition-colors">Haircuts & Styling</Link>
              </li>
              <li>
                <Link to="/services/color" className="text-gray-300 hover:text-brand-gold transition-colors">Hair Coloring</Link>
              </li>
              <li>
                <Link to="/services/facials" className="text-gray-300 hover:text-brand-gold transition-colors">Facials & Skincare</Link>
              </li>
              <li>
                <Link to="/services/massage" className="text-gray-300 hover:text-brand-gold transition-colors">Massage Therapy</Link>
              </li>
              <li>
                <Link to="/services/nails" className="text-gray-300 hover:text-brand-gold transition-colors">Nail Services</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-brand-gold" />
                <p className="text-gray-300">123 Beauty Lane<br />Stylish City, SC 12345</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-brand-gold" />
                <a href="tel:+15551234567" className="text-gray-300 hover:text-brand-gold transition-colors">
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-brand-gold" />
                <a href="mailto:info@salonsuite.com" className="text-gray-300 hover:text-brand-gold transition-colors">
                  info@salonsuite.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} SalonSuite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
