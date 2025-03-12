
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, User, LogIn, Menu, X, Home, Book, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurPanel } from '@/components/ui/BlurPanel';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const location = useLocation();
  const { cartItems } = useCart();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: Book },
  ];
  
  // User menu links
  const userLinks = user 
    ? [
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Dashboard', path: '/dashboard', icon: User },
        { name: 'Sign Out', action: signOut, icon: LogOut },
      ]
    : [
        { name: 'Sign In', path: '/login', icon: LogIn },
        { name: 'Register', path: '/register', icon: User },
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
      <BlurPanel 
        intensity={isScrolled ? 'heavy' : 'light'}
        className={`transition-all duration-300 px-4 sm:px-6 ${
          isScrolled ? 'py-2 shadow-elevated' : 'py-4'
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

            {/* User menu */}
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{user.displayName || user.email}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={signOut}
                  >
                    <LogOut size={20} />
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <LogIn size={16} />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

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
      </BlurPanel>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <BlurPanel 
              intensity="heavy" 
              className="m-2 p-4 shadow-elevated"
            >
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
                  {userLinks.map((link, i) => 
                    link.action ? (
                      <button 
                        key={i}
                        onClick={link.action}
                        className="w-full px-4 py-3 rounded-xl flex items-center space-x-2 text-left hover:bg-secondary"
                      >
                        <link.icon size={18} />
                        <span>{link.name}</span>
                      </button>
                    ) : (
                      <Link 
                        key={i}
                        to={link.path}
                        className="px-4 py-3 rounded-xl flex items-center space-x-2 hover:bg-secondary"
                      >
                        <link.icon size={18} />
                        <span>{link.name}</span>
                      </Link>
                    )
                  )}
                </div>
              </nav>
            </BlurPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
