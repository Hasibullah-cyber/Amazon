"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Wait for the component to mount on client side
    setIsMounted(true);

    if (typeof window !== "undefined") {
      try {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(savedCart);
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
  }, []);

  if (!isMounted) return null; // Prevent render on server

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
      <Card className="p-4 w-full max-w-md">
        <h1 className="text-xl font-bold mb-2">Payment Page</h1>
        <p className="mb-4">Cart Items:</p>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map((item, i) => (
            <div key={i} className="text-left text-sm mb-2">
              <strong>{item.name}</strong> — ৳{item.price} × {item.quantity}
            </div>
          ))
        )}
        <Button className="mt-6 w-full">Place Order</Button>
      </Card>
    </div>
  );
}
