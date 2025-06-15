'use client';

import { useEffect, useState } from 'react';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const cart = localStorage.getItem('cart');
      if (cart) {
        setCartItems(JSON.parse(cart));
      }
    } catch (err) {
      console.error('Error reading cart:', err);
    } finally {
      setLoaded(true);
    }
  }, []);

  if (!loaded) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-3">
          {cartItems.map((item, i) => (
            <li
              key={i}
              className="border p-3 rounded-lg shadow bg-white"
            >
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm">Qty: {item.quantity}</div>
              <div className="text-sm text-green-600">${item.price}</div>
            </li>
          ))}
        </ul>
      )}

      <button
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        onClick={() => alert('Demo payment — no real gateway connected.')}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
