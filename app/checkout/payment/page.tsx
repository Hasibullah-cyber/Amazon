"use client"

import { useEffect, useState } from "react"

export default function PaymentPage() {
  const [cart, setCart] = useState<any[] | null>(null)

  useEffect(() => {
    try {
      const cartData = localStorage.getItem("cart")
      if (cartData) {
        setCart(JSON.parse(cartData))
      } else {
        setCart([])
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
      setCart([])
    }
  }, [])

  if (cart === null) {
    return <div className="p-4 text-center">Loading payment info...</div>
  }

  if (cart.length === 0) {
    return <div className="p-4 text-center">Your cart is empty. Go add some items!</div>
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      <ul className="space-y-4">
        {cart.map((item, index) => (
          <li key={index} className="border rounded-lg p-4 shadow">
            <p className="font-semibold">{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Proceed to Pay
        </button>
      </div>
    </div>
  )
}
