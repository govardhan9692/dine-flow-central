
import React from 'react';

export function About() {
  return (
    <div className="container mx-auto px-4 pt-20 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mt-10 mb-6">About DineFlow</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="mb-4">
            Welcome to DineFlow, where culinary excellence meets convenience. We're passionate about connecting you with the best restaurants in your area, bringing gourmet experiences right to your doorstep.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2023, DineFlow began with a simple mission: to transform how people experience food delivery. We noticed a gap in the market for a platform that truly cares about both the customer experience and restaurant partnerships.
          </p>
          <p className="mb-4">
            What started as a small operation serving just a few neighborhoods has quickly grown into a beloved service connecting thousands of food lovers with their favorite local restaurants.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-4">
            At DineFlow, we believe everyone deserves access to exceptional dining experiences, whether at a restaurant or in the comfort of their own home. We strive to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Connect food lovers with quality restaurants that match their preferences and dietary needs</li>
            <li>Support local businesses and help them reach new customers</li>
            <li>Ensure reliable, timely delivery with real-time order tracking</li>
            <li>Minimize our environmental impact through sustainable packaging options</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Join Our Journey</h2>
          <p className="mb-4">
            We're constantly evolving and improving our service. Your feedback helps us grow and better serve our community of food enthusiasts and restaurant partners.
          </p>
          <p className="mb-4">
            Thank you for choosing DineFlow for your culinary adventures. We look forward to being part of your next memorable meal!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
