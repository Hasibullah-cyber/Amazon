"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

const supabase = createClient(
  "https://lqbivpzpknvjxjjeogve.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxYml2cHpwa252anhqamVvZ3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDc2ODYsImV4cCI6MjA2NTU4MzY4Nn0.lN_3IBa8-PVi_bs04omZkIYU4nC68RJu92eiUoFchto"
)

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
  const [totalAmount, setTotalAmount] = useState(0)
  const [cartItems, setCartItems] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const total = cart.reduce((sum: number, item: any) => sum + item.price, 0)
    setCartItems(cart)
    setTotalAmount(total)
  }, [])

  const handlePlaceOrder = async () => {
    const address = JSON.parse(localStorage.getItem("address") || "{}")

    const { data, error } = await supabase.from("orders").insert([
      {
        name: address.name || "Guest",
        address: address.address || "",
        city: address.city || "",
        phone: address.phone || "",
        payment_method: paymentMethod,
        total_amount: totalAmount,
        items: cartItems,
      },
    ])

    if (error) {
      console.error("Error placing order:", error)
      alert("❌ Order failed.")
    } else {
      alert("✅ Order placed successfully!")
      localStorage.removeItem("cart")
      router.push("/order-confirmation")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">Select Payment Method</h2>
        <RadioGroup
          defaultValue={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Online Payment" id="online" />
            <Label htmlFor="online">Online Payment</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Cash on Delivery" id="cod" />
            <Label htmlFor="cod">Cash on Delivery</Label>
          </div>
        </RadioGroup>

        <div className="mt-4">
          <h3 className="text-lg font-medium">Total: ৳{totalAmount}</h3>
        </div>

        <Button className="w-full" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Card>
    </div>
  )
}
