
import React from 'react';
import { cn } from '@/lib/utils';

interface BlurPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  borderVisible?: boolean;
}

/**
 * BlurPanel component creates a glass morphism effect container
 */
export function BlurPanel({ 
  children, 
  intensity = 'medium', 
  className,
  borderVisible = true,
  ...props 
}: BlurPanelProps) {
  const blurIntensity = {
    light: 'backdrop-blur-sm bg-white/60',
    medium: 'backdrop-blur-md bg-white/70',
    heavy: 'backdrop-blur-xl bg-white/80',
  };

  return (
    <div
      className={cn(
        'rounded-2xl shadow-glass',
        blurIntensity[intensity],
        borderVisible && 'border border-white/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default BlurPanel;
