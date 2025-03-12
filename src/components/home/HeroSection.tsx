
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
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
  );
}

export default HeroSection;
