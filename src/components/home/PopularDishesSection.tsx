
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuItem, ItemCard } from '@/components/ui/ItemCard';
import { useCart } from '@/context/CartContext';

// Mock data for featured menu items
const featuredItems: MenuItem[] = [
  {
    id: 'item1',
    name: 'Truffle Pasta',
    price: 18.99,
    description: 'Homemade pasta with black truffle and parmesan cheese',
    image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9',
    category: 'Pasta',
    available: true
  },
  {
    id: 'item2',
    name: 'Beef Wellington',
    price: 29.99,
    description: 'Tender beef fillet wrapped in puff pastry with mushroom duxelles',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    category: 'Main Course',
    available: true
  },
  {
    id: 'item3',
    name: 'Matcha Cheesecake',
    price: 9.99,
    description: 'Creamy cheesecake with a hint of matcha green tea',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
    category: 'Dessert',
    available: true
  },
  {
    id: 'item4',
    name: 'Salmon Poke Bowl',
    price: 16.99,
    description: 'Fresh salmon, avocado, and vegetables on a bed of sushi rice',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    category: 'Bowls',
    available: true
  }
];

export function PopularDishesSection() {
  const { addToCart } = useCart();
  
  return (
    <section className="py-20 bg-secondary">
      <div className="container px-4 max-w-7xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Dishes</h2>
            <p className="text-muted-foreground">
              Our customers' favorite selections from top restaurants
            </p>
          </div>
          <Link to="/menu">
            <Button variant="outline" className="hidden md:flex">
              Full Menu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, i) => (
            <ItemCard 
              key={item.id}
              item={item}
              index={i}
              onAddToCart={addToCart}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/menu">
            <Button variant="outline">
              View Full Menu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PopularDishesSection;
