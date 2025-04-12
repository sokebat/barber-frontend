import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Salon<span className="text-brand-gold">Suite</span>
            </h3>
            <p className="text-gray-300">
              Premium hair, beauty, and spa services for the discerning client. Experience luxury and rejuvenation in our tranquil environment.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-gold">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-gold">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-brand-gold">Services</Link>
              </li>
              <li>
                <Link to="/book" className="text-gray-300 hover:text-brand-gold">Book Appointment</Link>
              </li>
              <li>
                <Link to="/store" className="text-gray-300 hover:text-brand-gold">Shop Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brand-gold">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-brand-gold">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-brand-gold" />
                <p className="text-gray-300">
                   Pokhara, Nepal
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-brand-gold" />
                <a href="tel:+9779812345678" className="text-gray-300 hover:text-brand-gold">
                  +977 9812345678
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-brand-gold" />
                <a href="mailto:info@salonsuite.com" className="text-gray-300 hover:text-brand-gold">
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
