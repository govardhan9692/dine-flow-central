
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import RestaurantsSection from '@/components/home/RestaurantsSection';
import PopularDishesSection from '@/components/home/PopularDishesSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <RestaurantsSection />
      <PopularDishesSection />
      <CTASection />
    </div>
  );
};

export default Index;
