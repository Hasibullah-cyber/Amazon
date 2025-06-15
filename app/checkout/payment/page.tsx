"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [shipping] = useState(120)
  const [vat, setVat] = useState(0)
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      const items = JSON.parse(storedCart)
      setCartItems(items)
      const sub = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
      const calculatedVat = Math.round(sub * 0.1)
      setSubtotal(sub)
      setVat(calculatedVat)
      setTotal(sub + calculatedVat + shipping)
    }
  }, [])

  const handlePlaceOrder = () => {
    if (!name || !address || !phone || !city) {
      alert("Please fill in all fields.")
      return
    }

    const order = {
      orderId: "#HS-" + Date.now(),
      name,
      address,
      city,
      phone,
      paymentMethod,
      transactionId: paymentMethod === "Online Payment" ? "TXN-" + Date.now() : null,
      estimatedDelivery: "1-2 business days",
      cartItems,
      subtotal,
      shipping,
      vat,
      totalAmount: total,
    }

    localStorage.setItem("order", JSON.stringify(order))
    router.push("/order-confirmation")
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout - Payment</h1>

      <Card className="p-6 space-y-4 mb-6">
        <div>
          <Label>Full Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>Address</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <Label>City</Label>
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <Label>Phone Number</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Cash on Delivery" id="cod" />
            <Label htmlFor="cod">Cash on Delivery</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Online Payment" id="online" />
            <Label htmlFor="online">Online Payment</Label>
          </div>
        </RadioGroup>
      </Card>

      <Card className="p-6 mb-6 text-sm">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>৳{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>৳{shipping}</span>
        </div>
        <div className="flex justify-between">
          <span>VAT (10%)</span>
          <span>৳{vat}</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>৳{total}</span>
        </div>
      </Card>

      <Button className="w-full amazon-button" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  )
}
