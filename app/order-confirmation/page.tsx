import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Truck, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <Card className="p-8 text-center mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-green-700 mb-4">Thank you for shopping with Hasib Shop</p>
          <div className="bg-white p-4 rounded-md inline-block">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-xl font-bold text-black">#HS-2025-001234</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card className="p-6">
              <h2 className="text-xl font-medium text-black mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Delivery Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Hasibullah Khan</p>
                    <p className="text-sm text-gray-600">House 123, Road 15, Block C</p>
                    <p className="text-sm text-gray-600">Dhanmondi, Dhaka</p>
                    <p className="text-sm text-gray-600">+880 1712345678</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Estimated Delivery:</strong> January 17-18, 2025 (1-2 business days)
                  </p>
                </div>
              </div>
            </Card>

            {/* Payment Information */}
            <Card className="p-6">
              <h2 className="text-xl font-medium text-black mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">bKash Mobile Wallet</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="font-medium">BK123456789</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className="text-green-600 font-medium">Confirmed</span>
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6">
              <h2 className="text-xl font-medium text-black mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Order Items
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <h3 className="font-medium">Premium Wireless Headphones</h3>
                    <p className="text-sm text-gray-600">Immersive sound quality with noise cancellation</p>
                    <p className="text-sm">Qty: 1</p>
                  </div>
                  <span className="font-medium">৳22,000</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <h3 className="font-medium">Designer Sunglasses</h3>
                    <p className="text-sm text-gray-600">Protect your eyes with style and elegance</p>
                    <p className="text-sm">Qty: 1</p>
                  </div>
                  <span className="font-medium">৳8,800</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-medium text-black mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal (2 items):</span>
                  <span>৳30,800</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>৳120</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (10%):</span>
                  <span>৳3,092</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total Paid:</span>
                  <span className="amazon-price">৳34,012</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="amazon-button w-full" asChild>
                  <Link href="/orders">Track Your Order</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                <p>You will receive an email confirmation shortly with your order details and tracking information.</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-medium text-black mb-4">What happens next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Order Processing</h3>
              <p className="text-sm text-gray-600">We'll prepare your items for shipment within 24 hours</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-medium mb-2">Shipped</h3>
              <p className="text-sm text-gray-600">Your order will be shipped and you'll receive tracking details</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">Delivered</h3>
              <p className="text-sm text-gray-600">Your order will arrive at your doorstep within 1-2 business days</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
