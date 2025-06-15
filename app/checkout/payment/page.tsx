'use client';

import { useEffect, useState } from 'react';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);

  useEffect(() => {
    try {
      const cart = localStorage.getItem('cart');
      if (cart) {
        setCartItems(JSON.parse(cart));
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Cart loading failed:', error);
      setCartItems([]);
    }
  }, []);

  if (cartItems === null) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, idx) => (
            <li key={idx} className="border rounded p-4 shadow">
              <p><strong>{item.name}</strong></p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => alert('Payment Processed')}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}
