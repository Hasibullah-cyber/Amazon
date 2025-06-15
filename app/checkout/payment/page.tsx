"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard, Banknote, Shield, Lock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type PaymentType = "card" | "mobile" | "cod"

interface CartItem {
  name: string
  price: number
  quantity: number
}

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | "">("")
  const [cardNumber, setCardNumber] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart")
      if (stored) {
        setCartItems(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Failed to load cart", e)
    }
  }, [])

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 120
  const vat = Math.round(total * 0.1)
  const grandTotal = total + shipping + vat

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      toast({ title: "Select a payment method", variant: "destructive" })
      return
    }

    toast({ title: "Order placed!", description: "Your order is confirmed." })
    router.push("/order-confirmation")
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Payment</h1>

      <Card className="mb-4 p-4">
        <Shield className="text-green-600 mb-2" />
        <p className="text-green-700">Your payment is secure</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card className="p-4">
            <h2 className="font-medium mb-2">Select Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="card"
                  checked={selectedPayment === "card"}
                  onChange={() => setSelectedPayment("card")}
                />
                <CreditCard className="w-5 h-5 text-blue-500" />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="cod"
                  checked={selectedPayment === "cod"}
                  onChange={() => setSelectedPayment("cod")}
                />
                <Banknote className="w-5 h-5 text-green-500" />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {selectedPayment === "card" && (
              <div className="mt-4 space-y-2">
                <Input
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
            )}
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>৳{item.price * item.quantity}</span>
              </div>
            ))}
            <hr />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>৳{shipping}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (10%)</span>
              <span>৳{vat}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>৳{grandTotal}</span>
            </div>
          </div>

          <Button className="w-full mt-4" onClick={handlePlaceOrder}>
            Place Order
          </Button>

          <div className="mt-2 text-xs text-gray-500 flex items-center">
            <Lock className="w-4 h-4 mr-1" /> Secure SSL Checkout
          </div>
        </Card>
      </div>
    </div>
  )
}
