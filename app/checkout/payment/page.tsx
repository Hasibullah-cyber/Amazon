"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CreditCard, Banknote, Shield, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface PaymentMethod {
  id: string
  type: "card" | "mobile" | "cod"
  name: string
  icon: React.ReactNode
  description: string
}

interface CartItem {
  name: string
  price: number
  quantity: number
}

export default function PaymentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedPayment, setSelectedPayment] = useState<string>("")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [mobileNumber, setMobileNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        const validCart = savedCart.filter((item: any) =>
          item &&
          typeof item.name === 'string' &&
          typeof item.price === 'number' &&
          typeof item.quantity === 'number'
        )
        setCartItems(validCart)
      } catch (error) {
        console.error("Failed to load cart:", error)
      }
    }
  }, [])

  function handlePlaceOrder() {
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      localStorage.removeItem("cart")
      toast({
        title: "Order placed successfully!",
      })
      router.push("/order-confirmation")
    }, 2000)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select Payment Method</h1>
      {/* Your payment method UI here */}

      <Button onClick={handlePlaceOrder} disabled={isProcessing} className="mt-4 w-full">
        {isProcessing ? (
          <div className="flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            Processing...
          </div>
        ) : (
          "Place Order"
        )}
      </Button>
    </div>
  )
}
