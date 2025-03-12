
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MenuItem, ItemCard } from '@/components/ui/ItemCard';
import { useCart } from '@/context/CartContext';

// Mock menu items data
const menuItems: MenuItem[] = [
  {
    id: 'item1',
    name: 'Truffle Pasta',
    price: 18.99,
    description: 'Homemade pasta with black truffle and parmesan cheese',
    image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9',
    category: 'Pasta',
    available: true
  },
  {
    id: 'item2',
    name: 'Beef Wellington',
    price: 29.99,
    description: 'Tender beef fillet wrapped in puff pastry with mushroom duxelles',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    category: 'Main Course',
    available: true
  },
  {
    id: 'item3',
    name: 'Matcha Cheesecake',
    price: 9.99,
    description: 'Creamy cheesecake with a hint of matcha green tea',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
    category: 'Dessert',
    available: true
  },
  {
    id: 'item4',
    name: 'Salmon Poke Bowl',
    price: 16.99,
    description: 'Fresh salmon, avocado, and vegetables on a bed of sushi rice',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    category: 'Bowls',
    available: true
  },
  {
    id: 'item5',
    name: 'Margherita Pizza',
    price: 14.99,
    description: 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
    category: 'Pizza',
    available: true
  },
  {
    id: 'item6',
    name: 'Chocolate Lava Cake',
    price: 8.99,
    description: 'Warm chocolate cake with a molten chocolate center',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51',
    category: 'Dessert',
    available: true
  },
  {
    id: 'item7',
    name: 'Avocado Toast',
    price: 12.99,
    description: 'Toasted sourdough bread topped with smashed avocado and poached eggs',
    image: 'https://images.unsplash.com/photo-1603046891744-76e6300f82ef',
    category: 'Breakfast',
    available: false
  },
  {
    id: 'item8',
    name: 'Caesar Salad',
    price: 10.99,
    description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
    category: 'Salad',
    available: true
  }
];

// All categories extracted from the menu items
const allCategories = Array.from(new Set(menuItems.map(item => item.category)));

const Menu = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
  
  // Filter and sort items whenever search query, category, or sort order changes
  useEffect(() => {
    let results = [...menuItems];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortOrder) {
      results = results.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }
    
    setFilteredItems(results);
  }, [searchQuery, selectedCategory, sortOrder]);
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our wide range of delicious dishes prepared by top chefs
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-card/60 backdrop-blur-sm rounded-xl shadow-subtle mb-8 p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for dishes, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    {selectedCategory || 'All Categories'}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem 
                    onClick={() => setSelectedCategory(null)}
                    className={!selectedCategory ? 'bg-accent' : ''}
                  >
                    All Categories
                  </DropdownMenuItem>
                  {allCategories.map(category => (
                    <DropdownMenuItem 
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? 'bg-accent' : ''}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    Sort by Price
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={() => setSortOrder('asc')}
                    className={sortOrder === 'asc' ? 'bg-accent' : ''}
                  >
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSortOrder('desc')}
                    className={sortOrder === 'desc' ? 'bg-accent' : ''}
                  >
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSortOrder(null)}
                    className={sortOrder === null ? 'bg-accent' : ''}
                  >
                    Clear Sorting
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            {selectedCategory && ` in ${selectedCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
        
        {/* Menu grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, i) => (
              <ItemCard 
                key={item.id}
                item={item}
                index={i}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No items found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setSortOrder(null);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
