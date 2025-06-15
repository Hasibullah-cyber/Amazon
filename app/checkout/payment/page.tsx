"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CreditCard, Banknote, Shield, Lock } from "lucide-react"
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
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      if (Array.isArray(savedCart)) setCartItems(savedCart)
    } catch {
      setCartItems([])
    }
  }, [])

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 120
  const vat = Math.round(totalPrice * 0.1)
  const grandTotal = totalPrice + shipping + vat

  const paymentMethods: PaymentMethod[] = [
    {
      id: "bkash",
      type: "mobile",
      name: "bKash",
      icon: <div className="w-8 h-8 bg-pink-500 rounded text-white font-bold flex items-center justify-center">bK</div>,
      description: "Pay with your bKash mobile wallet",
    },
    {
      id: "nagad",
      type: "mobile",
      name: "Nagad",
      icon: <div className="w-8 h-8 bg-orange-500 rounded text-white font-bold flex items-center justify-center">N</div>,
      description: "Pay with your Nagad mobile wallet",
    },
    {
      id: "rocket",
      type: "mobile",
      name: "Rocket",
      icon: <div className="w-8 h-8 bg-purple-500 rounded text-white font-bold flex items-center justify-center">R</div>,
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

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      toast({
        title: "Select a payment method",
        description: "Please choose how you want to pay",
        variant: "destructive",
      })
      return
    }

    if (selectedPayment === "card" &&
      (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)
    ) {
      toast({
        title: "Incomplete card details",
        description: "Fill out all card fields",
        variant: "destructive",
      })
      return
    }

    if (["bkash", "nagad", "rocket"].includes(selectedPayment) && !mobileNumber) {
      toast({
        title: "Mobile number required",
        description: "Enter your mobile number",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Order Placed!",
        description: "You will receive a confirmation email shortly.",
        duration: 5000,
      })
      router.push("/order-confirmation")
    }, 3000)
  }

  const formatCardNumber = (value: string) =>
    value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19)

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 4)
    return v.length >= 3 ? `${v.slice(0, 2)}/${v.slice(2)}` : v
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-4 mb-4 border-b">
          <h1 className="text-2xl font-medium">Select a payment method</h1>
          <p className="text-sm text-gray-600">Choose how you want to pay for your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Section */}
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
                className={`p-4 cursor-pointer ${selectedPayment === method.id ? "ring-2 ring-[#ff9900] bg-orange-50" : "hover:shadow"}`}
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
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </div>

                {/* Conditional Inputs */}
                {selectedPayment === method.id && (
                  <div className="mt-4 pl-8 space-y-4">
                    {method.type === "card" && (
                      <>
                        <Input
                          placeholder="Card Number"
                          value={cardDetails.number}
                          maxLength={19}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })
                          }
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardDetails.expiry}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })
                            }
                          />
                          <Input
                            placeholder="CVV"
                            maxLength={4}
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })
                            }
                          />
                        </div>
                        <Input
                          placeholder="Cardholder Name"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, name: e.target.value })
                          }
                        />
                      </>
                    )}

                    {method.type === "mobile" && (
                      <>
                        <Input
                          placeholder="+8801XXXXXXXXX"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                        <p className="text-xs text-gray-500">
                          You will be redirected to {method.name} to complete the payment
                        </p>
                      </>
                    )}

                    {method.type === "cod" && (
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm text-yellow-800">
                        <strong>Note:</strong> You will pay ৳{grandTotal} in cash on delivery.
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span>৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <hr className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Items:</span><span>৳{totalPrice}</span></div>
                <div className="flex justify-between"><span>Shipping:</span><span>৳{shipping}</span></div>
                <div className="flex justify-between"><span>VAT (10%):</span><span>৳{vat}</span></div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium text-base">
                  <span>Total:</span><span>৳{grandTotal}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={!selectedPayment || isProcessing}
                className="w-full mt-6"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </div>
                ) : "Place Order"}
              </Button>

              <div className="mt-4 text-xs text-gray-500">
                <div className="flex items-center mb-1">
                  <Lock className="h-4 w-4 mr-1" />
                  SSL encrypted payment
                </div>
                <p>By placing your order, you agree to our Terms and Privacy Policy.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
