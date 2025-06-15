"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export default function LocationPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      try {
        setCartItems(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse cart:", e)
      }
    }
  }, [])

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 120
  const vat = Math.round(subtotal * 0.1)
  const total = subtotal + shipping + vat

  const handleContinue = () => {
    if (!name || !phone || !address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before continuing.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Location Saved",
      description: "Your shipping details have been saved.",
    })

    router.push("/checkout/payment")
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-4 mb-4 border-b">
          <h1 className="text-2xl font-medium text-black">Delivery Information</h1>
          <p className="text-sm text-gray-600 mt-1">Enter your address to continue to payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-black">Full Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-black">Phone Number</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+8801XXXXXXXXX"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-black">Delivery Address</label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your complete delivery address"
                  required
                />
              </div>

              <Button className="amazon-button" onClick={handleContinue}>
                Continue to Payment
              </Button>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4">
              <h3 className="text-lg font-medium text-black mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm">৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <hr className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>৳{shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (10%):</span>
                  <span>৳{vat}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium text-base">
                  <span>Total:</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
