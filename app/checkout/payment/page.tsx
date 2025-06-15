"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Truck, MapPin, AlertCircle, CheckCircle } from "lucide-react"

// Import your Supabase client
const createClient = require("@supabase/supabase-js").createClient

// Use environment variables or fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lqbivpzpknvjxjjeogve.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxYml2cHpwa252anhqamVvZ3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDc2ODYsImV4cCI6MjA2NTU4MzY4Nn0.lN_3IBa8-PVi_bs04omZkIYU4nC68RJu92eiUoFchto"

const supabase = createClient(supabaseUrl, supabaseKey)

export default function PaymentPage() {
  const [cart, setCart] = useState<any[]>([])
  const [address, setAddress] = useState<any>({})
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Handle SSR issues
    const loadData = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedCart = localStorage.getItem("cart")
          const storedAddress = localStorage.getItem("address")

          if (storedCart) {
            const parsedCart = JSON.parse(storedCart)
            setCart(Array.isArray(parsedCart) ? parsedCart : [])
          }
          
          if (storedAddress) {
            setAddress(JSON.parse(storedAddress))
          } else {
            // Set default address if none exists
            setAddress({
              name: "Guest User",
              address: "Please update your address",
              phone: "01700000000",
              city: "Dhaka"
            })
          }
        }
      } catch (error) {
        console.error("Error loading data:", error)
        setCart([])
        setAddress({})
      }
      setIsLoading(false)
    }

    loadData()
  }, [])

  const totalAmount = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0
    const quantity = Number(item.quantity) || 0
    return sum + (price * quantity)
  }, 0)

  const shipping = 120
  const vat = Math.round(totalAmount * 0.1)
  const finalTotal = totalAmount + shipping + vat

  const testConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('count', { count: 'exact' })
        .limit(1)
      
      if (error) throw error
      console.log("✅ Database connection successful")
      return true
    } catch (error) {
      console.error("❌ Database connection failed:", error)
      return false
    }
  }

  const handlePlaceOrder = async () => {
    setError("")
    setIsPlacingOrder(true)

    try {
      // Validation
      if (cart.length === 0) {
        throw new Error("Your cart is empty!")
      }

      if (!address.name || address.name === "Guest User") {
        throw new Error("Please provide your name!")
      }

      if (!address.address || address.address === "Please update your address") {
        throw new Error("Please provide a delivery address!")
      }

      console.log("🔄 Testing database connection...")
      const isConnected = await testConnection()
      if (!isConnected) {
        throw new Error("Unable to connect to database. Please try again.")
      }

      // Prepare order data
      const orderData = {
        name: String(address.name).trim(),
        address: String(address.address).trim(),
        phone: String(address.phone || "").trim(),
        city: String(address.city || "Dhaka").trim(),
        total: finalTotal,
        payment_method: paymentMethod,
        status: 'pending',
        items: cart,
        subtotal: totalAmount,
        shipping: shipping,
        vat: vat,
        created_at: new Date().toISOString()
      }

      console.log("📦 Placing order:", orderData)

      // Insert into database
      const { data, error } = await supabase
        .from("orders")
        .insert([orderData])
        .select()

      if (error) {
        console.error("❌ Supabase error:", error)
        throw new Error(`Database error: ${error.message}`)
      }

      if (!data || data.length === 0) {
        throw new Error("Order was not saved properly")
      }

      console.log("✅ Order placed successfully:", data)

      // Store order for confirmation page
      const orderInfo = {
        ...orderData,
        orderId: `#HS-${data[0].id}`,
        id: data[0].id,
        cartItems: cart,
        totalAmount: finalTotal,
        estimatedDelivery: "1-2 business days"
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem("lastOrder", JSON.stringify(orderInfo))
        localStorage.removeItem("cart") // Clear cart after successful order
      }

      // Redirect to confirmation
      window.location.href = "/order-confirmation"

    } catch (err: any) {
      console.error("❌ Order placement failed:", err)
      setError(err.message || "Failed to place order. Please try again.")
    } finally {
      setIsPlacingOrder(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Complete Your Order</h1>
        <p className="text-gray-600">Review and place your order</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Delivery Address */}
      <div className="border p-6 rounded-lg shadow-sm bg-white">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
          <MapPin size={20} className="text-blue-600" /> 
          Delivery Address
        </h2>
        <div className="bg-gray-50 p-4 rounded">
          <p className="font-medium">{address.name || "No name"}</p>
          <p className="text-gray-600">{address.address || "No address"}</p>
          <p className="text-gray-600">{address.phone || "No phone"}</p>
          <p className="text-gray-600">{address.city || "No city"}</p>
        </div>
        {(!address.name || address.name === "Guest User") && (
          <p className="text-red-500 text-sm mt-2">⚠️ Please update your delivery information</p>
        )}
      </div>

      {/* Payment Method */}
      <div className="border p-6 rounded-lg shadow-sm bg-white">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
          <CreditCard size={20} className="text-green-600" /> 
          Payment Method
        </h2>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
            <input 
              type="radio" 
              value="Cash on Delivery" 
              checked={paymentMethod === "Cash on Delivery"} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div>
              <span className="font-medium">Cash on Delivery</span>
              <p className="text-sm text-gray-500">Pay when your order arrives</p>
            </div>
          </label>
          <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
            <input 
              type="radio" 
              value="Online Payment" 
              checked={paymentMethod === "Online Payment"} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div>
              <span className="font-medium">Online Payment</span>
              <p className="text-sm text-gray-500">Pay now with bKash/Nagad</p>
            </div>
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="border p-6 rounded-lg shadow-sm bg-white">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
          <Truck size={20} className="text-purple-600" /> 
          Order Summary
        </h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
            <Button 
              onClick={() => window.location.href = "/"} 
              className="mt-4"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ৳{item.price} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">৳{(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 pt-4 border-t text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items):</span>
                <span>৳{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>৳{shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (10%):</span>
                <span>৳{vat}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span className="text-blue-600">৳{finalTotal}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Place Order Button */}
      <Button 
        disabled={isPlacingOrder || cart.length === 0} 
        onClick={handlePlaceOrder}
        className="w-full h-14 text-lg font-semibold"
      >
        {isPlacingOrder ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Placing
