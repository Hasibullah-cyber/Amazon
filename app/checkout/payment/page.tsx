"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle, CreditCard, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Safely load total from localStorage
    const storedTotal = localStorage.getItem("cartTotal")
    if (storedTotal) {
      setTotal(Number(storedTotal))
    }
  }, [])

  const handlePlaceOrder = () => {
    // Save selected payment method (optional)
    localStorage.setItem("selectedPaymentMethod", paymentMethod)
    // Redirect to confirmation page
    router.push("/order-confirmation")
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Choose Payment Method</h1>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online" className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 mr-2" />
                <span>Online Payment</span>
              </Label>
            </div>
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center space-x-2">
                <Wallet className="w-5 h-5 mr-2" />
                <span>Cash on Delivery</span>
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal:</span>
              <span>৳{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Shipping:</span>
              <span>৳120.00</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-lg mt-2">
              <span>Total:</span>
              <span>৳{(total + 120).toFixed(2)}</span>
            </div>
          </div>

          <Button className="mt-6 w-full amazon-button" onClick={handlePlaceOrder}>
            <CheckCircle className="w-5 h-5 mr-2" />
            Place Order
          </Button>
        </Card>
      </div>
    </div>
  )
}
