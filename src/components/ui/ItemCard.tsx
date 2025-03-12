
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from './AnimatedCard';
import { cn } from '@/lib/utils';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  available: boolean;
}

interface ItemCardProps {
  item: MenuItem;
  index: number;
  onAddToCart?: (item: MenuItem) => void;
  className?: string;
}

export function ItemCard({ item, index, onAddToCart, className }: ItemCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToCart && item.available) {
      setIsAdding(true);
      
      // Add a slight delay to show the animation
      setTimeout(() => {
        onAddToCart(item);
        setIsAdding(false);
        setIsAdded(true);
        
        // Reset the "added" state after 2 seconds
        setTimeout(() => {
          setIsAdded(false);
        }, 2000);
      }, 300);
    }
  };

  return (
    <AnimatedCard 
      delayAnimation={index * 50} 
      className={cn('group relative overflow-hidden', className)}
    >
      <Link to={`/menu/${item.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!item.available && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <p className="text-sm font-medium text-muted-foreground">Currently Unavailable</p>
            </div>
          )}
          <div className="absolute bottom-0 left-0 p-2">
            <span className="px-2 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full">
              {item.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-lg line-clamp-1">{item.name}</h3>
            <span className="font-semibold">${item.price.toFixed(2)}</span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
            {item.description}
          </p>
          
          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!item.available || isAdding || isAdded}
              className={cn(
                'transition-all',
                isAdded ? 'bg-green-500 hover:bg-green-600' : ''
              )}
            >
              {isAdding ? (
                <span className="animate-pulse">Adding...</span>
              ) : isAdded ? (
                <>
                  <Check size={16} className="mr-1" />
                  Added
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-1" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  );
}

export default ItemCard;
