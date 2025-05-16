"use client";

import { useState } from "react";
import { toast } from "sonner";
import useCartData from "@/components/features/ShoppingCart/hooks/useCartData";
import CartItem from "@/components/features/ShoppingCart/components/CartItem";
import CartSummary from "@/components/features/ShoppingCart/components/CartSummary";

const Cart = () => {
  const { items: cartItems } = useCartData();

  const [totalPrice, setTotalPrice] = useState(0);
  const calculateTotalPrice = (items: any[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
          <a
            href="/"
            className="bg-lama text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      toast.success("Cart updated");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  // const handleCheckout = () => {};
  const handleRemoveItem = (id: string) => {
    try {
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cartItems.map((item: CartProduct) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                mainImageUrl={item.mainImageUrl}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>

        <CartSummary totalPrice={totalPrice} onCheckout={() => {}} />
      </div>
    </div>
  );
};

export default Cart;
