
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '@/components/ui/ItemCard';
import { useToast } from "@/components/ui/use-toast";

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('dineflow_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('dineflow_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: MenuItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.item.id === item.id);
      
      if (existingItem) {
        toast({
          title: "Item updated",
          description: `${item.name} quantity updated in your cart`,
        });
        
        return prevItems.map(cartItem => 
          cartItem.item.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        toast({
          title: "Item added",
          description: `${item.name} has been added to your cart`,
        });
        
        return [...prevItems, { item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => {
      const item = prevItems.find(cartItem => cartItem.item.id === itemId);
      
      if (item) {
        toast({
          title: "Item removed",
          description: `${item.item.name} has been removed from your cart`,
        });
      }
      
      return prevItems.filter(cartItem => cartItem.item.id !== itemId);
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(cartItem => 
        cartItem.item.id === itemId 
          ? { ...cartItem, quantity } 
          : cartItem
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, { item, quantity }) => total + item.price * quantity, 
      0
    );
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
