"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function PaymentPage() {
  const router = useRouter()

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [name, setName] = useState("")

  const [cart, setCart] = useState<any[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [vat, setVat] = useState(0)
  const [shipping, setShipping] = useState(120)
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      setCart(parsedCart)

      const calculatedSubtotal = parsedCart.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      )
      const calculatedVat = Math.round(calculatedSubtotal * 0.1)
      const calculatedTotal = calculatedSubtotal + calculatedVat + shipping

      setSubtotal(calculatedSubtotal)
      setVat(calculatedVat)
      setTotalAmount(calculatedTotal)
    }
  }, [])

  const handlePlaceOrder = () => {
    if (!name || !address || !phone || !city) {
      alert("Please fill in all address fields.")
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
      cartItems: cart,
      subtotal,
      shipping,
      vat,
      totalAmount,
    }

    localStorage.setItem("order", JSON.stringify(order))

    // Redirect to confirmation page
    router.push("/order-confirmation")
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <div className="grid grid-cols-1 gap-4">
          <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
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

      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm">
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
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>৳{totalAmount}</span>
          </div>
        </div>
      </Card>

      <Button className="w-full amazon-button" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  )
}
