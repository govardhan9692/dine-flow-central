
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurPanel } from '@/components/ui/BlurPanel';
import { MenuItem } from '@/components/ui/ItemCard';
import { useCart } from '@/context/CartContext';

// Mock menu items data (same as in MenuPage)
const menuItems: MenuItem[] = [
  {
    id: 'item1',
    name: 'Truffle Pasta',
    price: 18.99,
    description: 'Homemade pasta with black truffle and parmesan cheese. Our signature dish made with fresh ingredients and authentic Italian techniques.',
    image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9',
    category: 'Pasta',
    available: true
  },
  {
    id: 'item2',
    name: 'Beef Wellington',
    price: 29.99,
    description: 'Tender beef fillet wrapped in puff pastry with mushroom duxelles. Served with roasted vegetables and red wine sauce. A classic British dish with a modern twist.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    category: 'Main Course',
    available: true
  },
  {
    id: 'item3',
    name: 'Matcha Cheesecake',
    price: 9.99,
    description: 'Creamy cheesecake with a hint of matcha green tea. Made with premium Japanese matcha powder and served with a berry compote.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
    category: 'Dessert',
    available: true
  },
  {
    id: 'item4',
    name: 'Salmon Poke Bowl',
    price: 16.99,
    description: 'Fresh salmon, avocado, and vegetables on a bed of sushi rice. Topped with sesame seeds and a spicy mayo dressing. A healthy and satisfying choice.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    category: 'Bowls',
    available: true
  },
  {
    id: 'item5',
    name: 'Margherita Pizza',
    price: 14.99,
    description: 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil. Made with our homemade dough and baked in a traditional stone oven for the perfect crust.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
    category: 'Pizza',
    available: true
  }
];

// Mock related items (a few items from the same category or recommended)
const getRelatedItems = (currentItemId: string, category: string): MenuItem[] => {
  return menuItems
    .filter(item => item.id !== currentItemId && (item.category === category || Math.random() > 0.5))
    .slice(0, 3);
};

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedItems, setRelatedItems] = useState<MenuItem[]>([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate fetching item details
    setLoading(true);
    setTimeout(() => {
      const foundItem = menuItems.find(item => item.id === id) || null;
      setItem(foundItem);
      
      if (foundItem) {
        setRelatedItems(getRelatedItems(foundItem.id, foundItem.category));
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (item && item.available) {
      // Add the same item multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(item);
      }
      
      // Reset quantity after adding to cart
      setQuantity(1);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse-soft text-3xl mb-4">Loading...</div>
          <p className="text-muted-foreground">Fetching item details</p>
        </div>
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/menu">
            <Button>Back to Menu</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/menu">
            <Button variant="ghost" className="flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Menu
            </Button>
          </Link>
        </div>
        
        {/* Item details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden">
            <div 
              className={`aspect-square bg-muted ${isImageLoaded ? 'hidden' : 'animate-pulse'}`}
            ></div>
            <img
              src={item.image}
              alt={item.name}
              className={`w-full h-full object-cover ${isImageLoaded ? 'animate-fade-in' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
            />
            {!item.available && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <p className="text-lg font-medium text-muted-foreground">Currently Unavailable</p>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-sm font-medium bg-background/80 backdrop-blur-sm rounded-full">
                {item.category}
              </span>
            </div>
          </div>
          
          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2 animate-fade-in">{item.name}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-4 animate-fade-in [animation-delay:100ms]">
              <Clock className="h-4 w-4 mr-1" />
              <span>Preparation time: 20-30 min</span>
            </div>
            
            <p className="text-2xl font-semibold mb-6 animate-fade-in [animation-delay:200ms]">
              ${item.price.toFixed(2)}
            </p>
            
            <p className="text-muted-foreground mb-8 animate-fade-in [animation-delay:300ms]">
              {item.description}
            </p>
            
            {/* Nutritional info */}
            <BlurPanel className="p-4 mb-8 animate-fade-in [animation-delay:400ms]">
              <h3 className="font-medium mb-2">Nutritional Information</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: 'Calories', value: '450 kcal' },
                  { name: 'Protein', value: '18g' },
                  { name: 'Carbs', value: '45g' },
                  { name: 'Fat', value: '22g' }
                ].map((info, i) => (
                  <div key={i}>
                    <p className="text-sm text-muted-foreground">{info.name}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                ))}
              </div>
            </BlurPanel>
            
            {/* Quantity and add to cart */}
            <div className="mt-auto animate-fade-in [animation-delay:500ms]">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-none h-10 w-10 border-none"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  
                  <span className="w-10 text-center">{quantity}</span>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-none h-10 w-10 border-none"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                
                <Button 
                  className="flex-1 h-10"
                  disabled={!item.available}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart - ${(item.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related items */}
        {relatedItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem, i) => (
                <Link
                  key={relatedItem.id}
                  to={`/menu/${relatedItem.id}`}
                  className="block group animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <BlurPanel className="overflow-hidden">
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={relatedItem.image} 
                        alt={relatedItem.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{relatedItem.name}</h3>
                        <span className="font-semibold">${relatedItem.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {relatedItem.description}
                      </p>
                    </div>
                  </BlurPanel>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
