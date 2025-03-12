
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Tag, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurPanel } from '@/components/ui/BlurPanel';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { MenuItem, ItemCard } from '@/components/ui/ItemCard';
import { useCart } from '@/context/CartContext';
import { getStaggerDelay } from '@/utils/animations';

// Mock data for featured restaurants
const restaurants = [
  {
    id: 'rest1',
    name: 'The Gourmet Kitchen',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    cuisine: 'Contemporary',
    rating: 4.8,
    deliveryTime: '25-35 min',
    priceRange: '$$$'
  },
  {
    id: 'rest2',
    name: 'Spice Paradise',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    cuisine: 'Indian',
    rating: 4.6,
    deliveryTime: '30-40 min',
    priceRange: '$$'
  },
  {
    id: 'rest3',
    name: 'Bella Italia',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    cuisine: 'Italian',
    rating: 4.9,
    deliveryTime: '20-30 min',
    priceRange: '$$$'
  }
];

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

// Features list
const features = [
  {
    icon: Star,
    title: 'Premium Restaurants',
    description: 'Order from the finest restaurants in your area'
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Get your food delivered in 30 minutes or less'
  },
  {
    icon: Tag,
    title: 'Exclusive Deals',
    description: 'Enjoy special discounts and promotions daily'
  },
  {
    icon: ShoppingBag,
    title: 'Easy Ordering',
    description: 'Order with just a few taps on your device'
  }
];

const Index = () => {
  const { addToCart } = useCart();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format"
            alt="Delicious food"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background"></div>
        </div>
        
        <div className="container px-4 max-w-7xl text-center relative z-10 animate-fade-in">
          <div className="rounded-full bg-accent text-accent-foreground inline-flex px-4 py-1 text-sm font-medium mb-6 animate-slide-up">
            The Ultimate Food Ordering Experience
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 animate-slide-up [animation-delay:200ms]">
            Discover and Order Amazing Food
          </h1>
          
          <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto animate-slide-up [animation-delay:400ms]">
            Order from the best restaurants in your area with just a few clicks. 
            Fast delivery, exclusive deals, and a premium experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:600ms]">
            <Link to="/menu">
              <Button size="lg" className="px-8">
                Explore Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="px-8">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-20 bg-secondary">
        <div className="container px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose DineFlow</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide an exceptional food ordering experience with premium features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <AnimatedCard 
                key={i} 
                delayAnimation={i * 100}
                className="p-6 text-center hover:bg-accent transition-colors"
              >
                <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured restaurants */}
      <section className="py-20">
        <div className="container px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Restaurants</h2>
              <p className="text-muted-foreground">
                Discover our handpicked selection of top restaurants
              </p>
            </div>
            <Link to="/restaurants">
              <Button variant="outline" className="hidden md:flex">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant, i) => (
              <AnimatedCard 
                key={restaurant.id} 
                delayAnimation={i * 100} 
                className="overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">{restaurant.cuisine}</span>
                    <span className="text-sm text-muted-foreground">{restaurant.priceRange}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/restaurants">
              <Button variant="outline">
                View All Restaurants
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured dishes */}
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
      
      {/* CTA section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2080&auto=format"
            alt="Restaurant interior"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/90"></div>
        </div>
        
        <div className="container px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Culinary Journey?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Join DineFlow today and discover a world of flavors from the comfort of your home.
              Register now to enjoy exclusive offers and a seamless ordering experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="px-8">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
