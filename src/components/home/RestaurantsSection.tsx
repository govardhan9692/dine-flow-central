
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

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

export function RestaurantsSection() {
  return (
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
  );
}

export default RestaurantsSection;
