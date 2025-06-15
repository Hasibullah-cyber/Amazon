"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Truck, MapPin } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://lqbivpzpknvjxjjeogve.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxYml2cHpwa252anhqamVvZ3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDc2ODYsImV4cCI6MjA2NTU4MzY4Nn0.lN_3IBa8-PVi_bs04omZkIYU4nC68RJu92eiUoFchto"
)

export default function PaymentPage() {
  const [cart, setCart] = useState<any[]>([])
  const [address, setAddress] = useState<any>({})
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    const storedAddress = localStorage.getItem("address")

    if (storedCart) setCart(JSON.parse(storedCart))
    if (storedAddress) setAddress(JSON.parse(storedAddress))
  }, [])

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)

    const { data, error } = await supabase.from("orders").insert([
      {
        name: address.name || "Guest",
        address: address.address || "Unknown",
        total: totalAmount,
        payment_method: paymentMethod,
        items: cart,
      },
    ])

    console.log("📦 Order Result", { data, error })

    if (error) {
      alert("❌ Order failed: " + error.message)
    } else {
      alert("✅ Order placed successfully!")
      localStorage.removeItem("cart")
      window.location.href = "/order-confirmation"
    }

    setIsPlacingOrder(false)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-bold flex items-center gap-2"><MapPin size={20} /> Delivery Address</h2>
        <p>{address.name}</p>
        <p>{address.address}</p>
      </div>

      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-bold flex items-center gap-2"><CreditCard size={20} /> Payment Method</h2>
        <div className="space-y-2 mt-2">
          <label>
            <input type="radio" value="Online Payment" checked={paymentMethod === "Online Payment"} onChange={() => setPaymentMethod("Online Payment")} />
            Online Payment
          </label>
          <br />
          <label>
            <input type="radio" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={() => setPaymentMethod("Cash on Delivery")} />
            Cash on Delivery
          </label>
        </div>
      </div>

      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-bold flex items-center gap-2"><Truck size={20} /> Order Summary</h2>
        <p>Total: ৳{totalAmount}</p>
      </div>

      <Button disabled={isPlacingOrder} onClick={handlePlaceOrder} className="w-full">
        {isPlacingOrder ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  )
}
