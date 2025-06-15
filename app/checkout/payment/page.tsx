"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CreditCard, Banknote, Shield, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

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
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      const validCart = savedCart.filter((item: any) => 
        item && 
        typeof item.name === 'string' && 
        typeof item.price === 'number' && 
        typeof item.quantity === 'number'
      )
      setCartItems(validCart)
    } catch (e) {
      console.error("Failed to load cart", e)
      setCartItems([])
      toast({
        title: "Cart Error",
        description: "Failed to load your cart items",
        variant: "destructive",
      })
    }
  }, [toast])

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 120
  const vat = Math.round(totalPrice * 0.1)
  const grandTotal = totalPrice + shipping + vat

  const paymentMethods: PaymentMethod[] = [
    {
      id: "bkash",
      type: "mobile",
      name: "bKash",
      icon: <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center text-white font-bold text-sm">bK</div>,
      description: "Pay with your bKash mobile wallet",
    },
    {
      id: "nagad",
      type: "mobile",
      name: "Nagad",
      icon: <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-sm">N</div>,
      description: "Pay with your Nagad mobile wallet",
    },
    {
      id: "rocket",
      type: "mobile",
      name: "Rocket",
      icon: <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-sm">R</div>,
      description: "Pay with your Rocket mobile wallet",
    },
    {
      id: "card",
      type: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "cod",
      type: "cod",
      name: "Cash on Delivery",
      icon: <Banknote className="h-6 w-6 text-green-600" />,
      description: "Pay when your order is delivered",
    },
  ]

  const handlePlaceOrder = async () => {
    if (!selectedPayment) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue",
        variant: "destructive",
      })
      return
    }

    if (selectedPayment === "card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        toast({
          title: "Card Details Required",
          description: "Please fill in all card details",
          variant: "destructive",
        })
        return
      }
    }

    if (["bkash", "nagad", "rocket"].includes(selectedPayment)) {
      if (!mobileNumber) {
        toast({
          title: "Mobile Number Required",
          description: "Please enter your mobile number",
          variant: "destructive",
        })
        return
      }
    }

    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been confirmed. You will receive a confirmation email shortly.",
        duration: 5000,
      })
      localStorage.removeItem("cart")
      router.push("/order-confirmation")
    }, 3000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.join(" ")
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) return v.substring(0, 2) + "/" + v.substring(2, 4)
    return v
  }

  if (!isClient) {
    return (
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-4 mb-4 border-b">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-3" />
                    <Skeleton className="w-8 h-8 rounded" />
                    <div className="ml-3 space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <Card className="p-4">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <div className="space-y-3 mb-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="w-12 h-12 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
                <Skeleton className="w-full h-10 mt-6" />
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-4 mb-4 border-b">
          <h1 className="text-2xl font-medium text-black">Select a payment method</h1>
          <p className="text-sm text-gray-600 mt-1">Choose how you want to pay for your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <h3 className="font-medium text-green-800">Secure Payment</h3>
                  <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
                </div>
              </div>
            </Card>

            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`p-4 cursor-pointer transition-all ${selectedPayment === method.id ? "ring-2 ring-[#ff9900] bg-orange-50" : "hover:shadow-md"}`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center flex-1">
                    {method.icon}
                    <div className="ml-3">
                      <h3 className="font-medium text-black">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </div>

                {selectedPayment === method.id && (
                  <div className="mt-4 pl-8">
                    {method.type === "card" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <Input
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <Input
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <Input
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })}
                              placeholder="123"
                              maxLength={4}
                              type="password"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                          <Input
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}

                    {method.type === "mobile" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                        <Input
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="+880 1XXXXXXXXX"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          You will be redirected to {method.name} to complete the payment
                        </p>
                      </div>
                    )}

                    {method.type === "cod" && (
                      <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> You will pay ৳{grandTotal} in cash when your order is delivered. Please have the exact amount ready.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4">
              <h3 className="text-lg font-medium text-black mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>৳{totalPrice}</span>
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
                  <span>Order Total:</span>
                  <span className="amazon-price">৳{grandTotal}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handlePlaceOrder}
                  className="amazon-button w-full"
                  disabled={!selectedPayment || isProcessing}
                >
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

              <div className="mt-4 text-xs text-gray-500">
                <div className="flex items-center mb-2">
                  <Lock className="h-4 w-4 mr-1" />
                  <span>SSL encrypted secure payment</span>
                </div>
                <p>By placing your order, you agree to Hasib Shop's Terms of Service and Privacy Policy.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
