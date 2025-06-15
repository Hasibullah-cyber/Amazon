"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<{ name: string; price: number; quantity: number }[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch {
        setCartItems([])
      }
    }
  }, [])

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-xl mx-auto p-6">
        <h1 className="text-xl font-bold mb-4">Payment Page</h1>

        {cartItems.length > 0 ? (
          <>
            <ul className="mb-4">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>৳{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <hr className="my-2" />
            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span>৳{total}</span>
            </div>

            <Input placeholder="Enter Card or Mobile Number" className="mb-2" />
            <Button className="w-full">Pay Now</Button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Card>
    </div>
  )
}
