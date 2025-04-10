
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronDown 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authState, logout } = useAuth();

  console.log(authState, "authState")
  const { cart } = useCart();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Store', path: '/store' },
    { name: 'Book Appointment', path: '/book' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-brand-blue">Salon<span className="text-brand-gold">Suite</span></h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${isActive(link.path) ? 'active-nav-link' : 'nav-link'}`}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Auth and Cart Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart Button with Counter */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-brand-blue">
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-blue rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                  {cart.items.length}
                </span>
              )}
            </Button>
          </Link>
          
          {/* Auth Buttons */}
          {authState.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {/* <span className="hidden sm:inline">{authState.user?.fullName.split(' ')[0]}</span> */}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">My Profile</Link>
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem asChild>
                  <Link to="/appointments" className="w-full cursor-pointer">My Appointments</Link>
                </DropdownMenuItem> */}
                {authState.user?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="w-full cursor-pointer">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button asChild variant="outline">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-blue rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                  {cart.items.length}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" onClick={toggleMenu} size="icon">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-4 pb-6 px-6 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${isActive(link.path) ? 'active-nav-link' : 'nav-link'} py-2 border-b border-gray-100`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4">
              {authState.isAuthenticated ? (
                <div className="space-y-3">
                  <Link to="/profile" className="block py-2 nav-link" onClick={closeMenu}>
                    My Profile
                  </Link>
                  <Link to="/appointments" className="block py-2 nav-link" onClick={closeMenu}>
                    My Appointments
                  </Link>
                  {authState.user?.role === 'admin' && (
                    <Link to="/admin" className="block py-2 nav-link" onClick={closeMenu}>
                      Admin Dashboard
                    </Link>
                  )}
                  <Button onClick={() => { logout(); closeMenu(); }} variant="outline" className="w-full text-red-500 mt-2">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <Button asChild variant="outline">
                    <Link to="/login" onClick={closeMenu}>Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register" onClick={closeMenu}>Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
