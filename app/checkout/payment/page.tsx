// app/checkout/payment/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Wallet, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentPage() {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const cartData = localStorage.getItem("cart")
    if (cartData) {
      const cart = JSON.parse(cartData)
      const totalPrice = cart.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      )
      setTotal(totalPrice)
    }
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>

      <div className="grid gap-4">
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-blue-600" />
            <span className="font-medium">Online Payment</span>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-6 h-6 text-yellow-600" />
            <span className="font-medium">Cash on Delivery</span>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Total Amount: ৳{total}</h3>
      </div>

      <div className="mt-6">
        <Link href="/checkout/confirmation">
          <Button className="w-full">Place Order</Button>
        </Link>
      </div>
    </div>
  )
}
