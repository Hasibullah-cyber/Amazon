"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Cart error:", err);
    }
  }, []);

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Payment Page</h1>

      {cart.map((item, i) => (
        <div key={i} className="flex justify-between border p-2 rounded">
          <span>{item.name}</span>
          <span>৳{item.price} x {item.quantity}</span>
        </div>
      ))}

      <Button className="w-full mt-4" onClick={() => alert("Payment complete!")}>
        Place Order
      </Button>
    </div>
  );
}
