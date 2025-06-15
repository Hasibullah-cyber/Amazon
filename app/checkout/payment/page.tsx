// app/checkout/payment/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Truck, CheckCircle } from "lucide-react"

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<any[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <CreditCard className="w-6 h-6" />
        Payment Options
      </h1>

      <Card className="mb-4 p-4">
        <h2 className="text-lg font-semibold mb-2">Choose a Payment Method:</h2>
        <div className="flex flex-col gap-3">
          <Button variant="outline" className="justify-start">
            💳 Online Payment
          </Button>
          <Button variant="outline" className="justify-start">
            💵 Cash on Delivery
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="mb-4 space-y-2">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="text-right font-bold text-xl">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </Card>

      <div className="mt-6 text-center">
        <Button className="w-full flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Place Order
        </Button>
      </div>
    </div>
  )
}
