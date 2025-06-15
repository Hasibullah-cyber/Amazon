"use client"

import { useEffect, useState } from "react"

interface CartItem {
  name: string
  price: number
  quantity: number
}

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        setCartItems(savedCart)
      } catch (error) {
        console.error("Error reading cart from localStorage:", error)
      }
    }
  }, [])

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment Summary</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-semibold">৳{item.price * item.quantity}</p>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total:</span>
            <span>৳{total}</span>
          </div>
        </div>
      )}
    </div>
  )
}
