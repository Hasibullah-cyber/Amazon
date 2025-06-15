import React, { useEffect, useState } from 'react';

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handlePlaceOrder = () => {
    if (!address || !paymentMethod) {
      alert('Please complete all fields!');
      return;
    }

    alert('✅ Order placed successfully!');
    localStorage.removeItem('cart');
    setCartItems([]);
    setAddress('');
    setPaymentMethod('');
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Amazon-style Checkout</h1>

      {/* Address Section */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Shipping Address</label>
        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Payment Method Section */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Payment Method</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="e.g. **** **** **** 1234"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
      </div>

      {/* Cart Summary */}
      <div className="border-t pt-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, idx) => (
              <li key={idx} className="flex justify-between mb-1">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-2 font-bold flex justify-between">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={cartItems.length === 0}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Place Your Order
      </button>
    </div>
  );
};

export default PaymentPage;
