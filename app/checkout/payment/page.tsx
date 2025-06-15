"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentPage() {
  const [cart, setCart] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState("online")

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      const cartItems = JSON.parse(storedCart)
      setCart(cartItems)
      const totalAmount = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
      setTotal(totalAmount)
    }
  }, [])

  const handlePlaceOrder = () => {
    alert(`Order placed with ${selected === "online" ? "Online Payment" : "Cash on Delivery"}!`)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Select Payment Method</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Card
          onClick={() => setSelected("online")}
          className={`p-4 cursor-pointer ${selected === "online" ? "border-blue-500" : ""}`}
        >
          <CreditCard className="mb-2" />
          <h3 className="font-semibold">Online Payment</h3>
          <p className="text-sm text-muted-foreground">Pay using card, bKash, or mobile banking.</p>
        </Card>

        <Card
          onClick={() => setSelected("cod")}
          className={`p-4 cursor-pointer ${selected === "cod" ? "border-blue-500" : ""}`}
        >
          <Truck className="mb-2" />
          <h3 className="font-semibold">Cash on Delivery</h3>
          <p className="text-sm text-muted-foreground">Pay with cash when you receive the order.</p>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
        {cart.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </li>
          </ul>
        )}
      </Card>

      <Button onClick={handlePlaceOrder} className="w-full">
        <CheckCircle className="mr-2 h-5 w-5" /> Place Order
      </Button>

      <Link href="/" className="block text-center text-blue-600 text-sm mt-4">Back to Home</Link>
    </div>
  )
}
