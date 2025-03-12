
import React from 'react';
import { cn } from '@/lib/utils';

interface BlurPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  borderVisible?: boolean;
  colorVariant?: 'white' | 'dark' | 'primary';
  glowEffect?: boolean;
}

/**
 * BlurPanel component creates a glass morphism effect container
 */
export function BlurPanel({ 
  children, 
  intensity = 'medium', 
  className,
  borderVisible = true,
  colorVariant = 'white',
  glowEffect = false,
  ...props 
}: BlurPanelProps) {
  const blurIntensity = {
    light: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
    heavy: 'backdrop-blur-xl',
  };
  
  const colorVariants = {
    white: 'bg-white/60 dark:bg-white/10',
    dark: 'bg-black/20 dark:bg-black/40',
    primary: 'bg-primary/20 dark:bg-primary/10',
  };
  
  const borderStyles = borderVisible 
    ? 'border border-white/20 dark:border-white/10' 
    : '';
  
  const glowStyles = glowEffect 
    ? 'shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.05)]' 
    : 'shadow-glass';

  return (
    <div
      className={cn(
        'rounded-2xl',
        blurIntensity[intensity],
        colorVariants[colorVariant],
        borderStyles,
        glowStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default BlurPanel;
