import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Review & Payment</h1>

      {/* Cart Summary */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold">Your Items</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b py-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="text-lg font-semibold">Shipping Address</h2>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your full address..."
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border p-2 rounded-md"
          >
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Cash on Delivery</option>
            <option>SSLCommerz</option>
          </select>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="flex justify-between">
            <span>Items Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-right">
        <Button onClick={placeOrder} disabled={!address.trim()} className="px-6 py-2">
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
