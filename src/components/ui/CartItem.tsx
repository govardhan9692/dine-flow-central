
import React from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurPanel } from './BlurPanel';
import { cn } from '@/lib/utils';
import { MenuItem } from './ItemCard';

interface CartItemProps {
  item: MenuItem;
  quantity: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  className?: string;
}

export function CartItem({ 
  item, 
  quantity, 
  onRemove, 
  onUpdateQuantity,
  className 
}: CartItemProps) {
  const handleIncrease = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(item.id, quantity - 1);
    } else {
      onRemove(item.id);
    }
  };

  return (
    <BlurPanel
      intensity="light"
      className={cn('p-4 animate-fade-in', className)}
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base mb-1 truncate">{item.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="font-semibold">${(item.price * quantity).toFixed(2)}</span>
            
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="outline" 
                className="h-8 w-8"
                onClick={handleDecrease}
              >
                <Minus size={14} />
              </Button>
              
              <span className="w-8 text-center">{quantity}</span>
              
              <Button 
                size="icon" 
                variant="outline" 
                className="h-8 w-8"
                onClick={handleIncrease}
              >
                <Plus size={14} />
              </Button>
              
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => onRemove(item.id)}
              >
                <Trash size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BlurPanel>
  );
}

export default CartItem;
