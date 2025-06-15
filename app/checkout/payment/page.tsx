"use client"

import { useState, useEffect } from "react"

interface CartItem {
  name: string
  price: number
  quantity: number
}

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartItems(savedCart)
    } catch (error) {
      console.error("Error loading cart:", error)
    }
  }, [])

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      <div className="space-y-2">
        {cartItems.map((item, i) => (
          <div key={i} className="border p-2 rounded">
            <p className="font-medium">{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ৳{item.price * item.quantity}</p>
          </div>
        ))}
        <div className="mt-4 font-bold text-lg">Total: ৳{total}</div>
      </div>
    </div>
  )
}
