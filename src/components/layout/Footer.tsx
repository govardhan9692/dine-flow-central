
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary mt-auto pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and intro */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-xl font-semibold">
                Dine<span className="text-primary">Flow</span>
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connecting you with the best restaurants and seamless ordering experiences.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4 mt-6">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Menu', path: '/menu' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* For restaurants */}
          <div>
            <h3 className="text-sm font-semibold mb-4">For Restaurants</h3>
            <ul className="space-y-2">
              {[
                { name: 'Join as Partner', path: '/partners' },
                { name: 'Restaurant Login', path: '/owner-login' },
                { name: 'Restaurant Dashboard', path: '/owner-dashboard' },
                { name: 'FAQs', path: '/faqs' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {[
                { icon: MapPin, text: '123 Restaurant Avenue, Foodie City, FC 12345' },
                { icon: Phone, text: '+1 (555) 123-4567' },
                { icon: Mail, text: 'support@dineflow.com' }
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <item.icon size={16} className="mr-2 mt-1 flex-shrink-0 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {currentYear} DineFlow. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
