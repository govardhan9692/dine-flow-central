
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogIn, Menu, X, Home, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export function Header() {
  const location = useLocation();
  const { cartItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: Home },
    { name: 'About', path: '/about', icon: Info },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on navigation
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div 
        className={`transition-all duration-300 px-4 sm:px-6 ${
          isScrolled 
            ? 'py-2 bg-background/80 backdrop-blur-md shadow-md' 
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-semibold text-xl">
            Dine<span className="text-primary">Flow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Cart button with counter */}
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Sign In button (desktop) */}
            <Link to="/login" className="hidden md:block">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <LogIn size={16} />
                Sign In
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="bg-background/95 backdrop-blur-sm shadow-lg p-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`px-4 py-3 rounded-xl flex items-center space-x-2 ${
                    location.pathname === link.path 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-secondary'
                  }`}
                >
                  <link.icon size={18} />
                  <span>{link.name}</span>
                </Link>
              ))}
              
              <div className="border-t border-border my-2 pt-2">
                <Link 
                  to="/login"
                  className="px-4 py-3 rounded-xl flex items-center space-x-2 hover:bg-secondary"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
                <Link 
                  to="/register"
                  className="px-4 py-3 rounded-xl flex items-center space-x-2 hover:bg-secondary"
                >
                  <User size={18} />
                  <span>Register</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
