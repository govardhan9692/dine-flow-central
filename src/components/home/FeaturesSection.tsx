
import React from 'react';
import { Star, Clock, Tag, ShoppingBag } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

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

export function FeaturesSection() {
  return (
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
  );
}

export default FeaturesSection;
