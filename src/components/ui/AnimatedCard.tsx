
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delayAnimation?: number;
  animationType?: 'scale-up' | 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right';
  hoverScale?: boolean;
  hoverElevate?: boolean;
}

/**
 * AnimatedCard component with hover effects and entrance animations
 */
export function AnimatedCard({ 
  children, 
  className, 
  hoverEffect = true,
  delayAnimation = 0,
  animationType = 'scale-up',
  hoverScale = true,
  hoverElevate = true,
  ...props 
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delayAnimation);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delayAnimation]);

  const animationClasses = {
    'scale-up': 'animate-scale-up',
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
  };
  
  const hoverClasses = [];
  if (hoverEffect) {
    if (hoverScale) hoverClasses.push('hover:scale-[1.02]');
    if (hoverElevate) hoverClasses.push('hover:shadow-elevated');
    hoverClasses.push('transition-all duration-300');
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        'rounded-2xl bg-card shadow-subtle overflow-hidden',
        isVisible ? animationClasses[animationType] : 'opacity-0',
        hoverClasses.join(' '),
        className
      )}
      style={{ 
        animationDelay: `${delayAnimation}ms`,
        animationFillMode: 'forwards',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default AnimatedCard;
