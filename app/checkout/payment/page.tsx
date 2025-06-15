import React, { useState, useEffect } from 'react';

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    let storedCart = localStorage.getItem('cart');
    
    // If no cart in storage, create dummy cart (for phone testing)
    if (!storedCart) {
      const dummyCart = [
        { name: 'Phone', price: 299.99, quantity: 1 },
        { name: 'Charger', price: 19.99, quantity: 2 }
      ];
      localStorage.setItem('cart', JSON.stringify(dummyCart));
      storedCart = JSON.stringify(dummyCart);
    }

    setCartItems(JSON.parse(storedCart));
  }, []);

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!address || !cardNumber) {
      alert('Please fill in all fields');
      return;
    }
    alert('✅ Order Placed Successfully!');
    localStorage.removeItem('cart');
    setCartItems([]);
    setAddress('');
    setCardNumber('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Address */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address"
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Card Number (e.g. **** **** **** 1234)"
        />
      </div>

      {/* Order Summary */}
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <span>{item.name} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4">
          <span>Total:</span>
          <span>${getTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-6 rounded w-full font-bold"
      >
        Place your order
      </button>
    </div>
  );
};

export default PaymentPage;
