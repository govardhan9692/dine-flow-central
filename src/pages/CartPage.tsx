
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Trash, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/ui/CartItem';
import { BlurPanel } from '@/components/ui/BlurPanel';
import { useCart } from '@/context/CartContext';
import { toast } from "@/components/ui/use-toast";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Your food is being prepared. You'll receive updates soon.",
      });
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };
  
  // Calculate totals
  const subtotal = getCartTotal();
  const deliveryFee = 4.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-soft">
              <ShoppingCart size={36} className="text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
            Explore our menu and discover delicious meals.
          </p>
          
          <Link to="/menu">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Menu
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <Link to="/menu">
            <Button variant="ghost" className="flex items-center gap-1 mb-4">
              <ArrowLeft size={16} />
              Continue Shopping
            </Button>
          </Link>
          
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <Button
              variant="outline"
              className="flex items-center gap-1 text-muted-foreground"
              onClick={clearCart}
            >
              <Trash size={16} />
              Clear Cart
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((cartItem, i) => (
                <CartItem
                  key={cartItem.item.id}
                  item={cartItem.item}
                  quantity={cartItem.quantity}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                  className={`animate-fade-in [animation-delay:${i * 100}ms]`}
                />
              ))}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <BlurPanel className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start gap-2 text-sm bg-primary/5 p-3 rounded-lg">
                  <Info size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <p>
                    Your order will be prepared as soon as you complete the checkout.
                    Estimated delivery time: 30-45 minutes.
                  </p>
                </div>
              </div>
              
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-pulse">Processing...</span>
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </BlurPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
