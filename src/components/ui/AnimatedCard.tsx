
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delayAnimation?: number;
}

/**
 * AnimatedCard component with hover effects and entrance animations
 */
export function AnimatedCard({ 
  children, 
  className, 
  hoverEffect = true,
  delayAnimation = 0,
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

  return (
    <div
      ref={cardRef}
      className={cn(
        'rounded-2xl bg-card shadow-subtle overflow-hidden',
        isVisible ? 'animate-scale-up' : 'opacity-0',
        hoverEffect && 'transition-all duration-300 hover:shadow-elevated hover:-translate-y-1',
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
