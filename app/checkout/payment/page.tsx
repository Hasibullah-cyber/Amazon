"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()

  const [isMounted, setIsMounted] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [cartData, setCartData] = useState({
    cartItems: [],
    subtotal: 0,
    shipping: 120,
    vat: 0,
    total: 0,
  })

  useEffect(() => {
    setIsMounted(true)

    try {
      const rawData = localStorage.getItem("orderData")
      const data = rawData ? JSON.parse(rawData) : {}
      const items = data.cartItems || []
      const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
      const shipping = 120
      const vat = Math.round(subtotal * 0.1)
      const total = subtotal + shipping + vat

      setCartData({ cartItems: items, subtotal, shipping, vat, total })
    } catch (error) {
      console.error("Failed to load orderData:", error)
    }
  }, [])

  const handlePlaceOrder = () => {
    if (!isMounted) return

    const orderInfo = {
      ...cartData,
      paymentMethod,
      paymentStatus: paymentMethod === "online" ? "Confirmed" : "Pending",
      transactionId: paymentMethod === "online" ? "SSL123456" : "COD",
    }

    localStorage.setItem("orderData", JSON.stringify(orderInfo))
    router.push("/order-confirmation")
  }

  if (!isMounted) return null // Prevent server-side mismatch

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto max-w-4xl px-4 space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Select Payment Method</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem id="online" value="online" />
              <Label htmlFor="online">Online Payment (bKash, Card, etc.)</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem id="cod" value="cod" />
              <Label htmlFor="cod">Cash on Delivery</Label>
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>৳{cartData.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>৳{cartData.shipping}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (10%):</span>
              <span>৳{cartData.vat}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span className="text-green-600">৳{cartData.total}</span>
            </div>
          </div>
        </Card>

        <Button className="w-full amazon-button text-white text-lg py-6" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  )
}
