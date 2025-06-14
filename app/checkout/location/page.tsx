"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Plus, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface Address {
  id: string
  name: string
  phone: string
  address: string
  city: string
  area: string
  isDefault: boolean
}

export default function LocationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<string | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Hasibullah Khan",
      phone: "+880 1712345678",
      address: "House 123, Road 15, Block C",
      city: "Dhaka",
      area: "Dhanmondi",
      isDefault: true,
    },
    {
      id: "2",
      name: "Office Address",
      phone: "+880 1798765432",
      address: "Level 5, Building 45, Gulshan Avenue",
      city: "Dhaka",
      area: "Gulshan",
      isDefault: false,
    },
  ])

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Dhaka",
    area: "",
  })

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.area) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0,
    }

    setAddresses([...addresses, address])
    setNewAddress({ name: "", phone: "", address: "", city: "Dhaka", area: "" })
    setShowAddForm(false)

    toast({
      title: "Address Added",
      description: "Your new address has been saved successfully",
    })
  }

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map((addr) => ({ ...addr, isDefault: addr.id === id })))
    toast({
      title: "Default Address Updated",
      description: "Your default delivery address has been changed",
    })
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
    toast({
      title: "Address Deleted",
      description: "The address has been removed from your account",
    })
  }

  const handleContinue = () => {
    const defaultAddress = addresses.find((addr) => addr.isDefault)
    if (!defaultAddress) {
      toast({
        title: "No Address Selected",
        description: "Please select a delivery address to continue",
        variant: "destructive",
      })
      return
    }

    router.push("/checkout/payment")
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white p-4 mb-4 border-b">
          <h1 className="text-2xl font-medium text-black">Select a delivery address</h1>
          <p className="text-sm text-gray-600 mt-1">Choose where you want your order delivered</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Address Selection */}
          <div className="lg:col-span-2 space-y-4">
            {/* Existing Addresses */}
            {addresses.map((address) => (
              <Card
                key={address.id}
                className={`p-4 cursor-pointer transition-all ${
                  address.isDefault ? "ring-2 ring-[#ff9900] bg-orange-50" : "hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="address"
                        checked={address.isDefault}
                        onChange={() => handleSetDefault(address.id)}
                        className="mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-black">{address.name}</h3>
                        {address.isDefault && (
                          <span className="text-xs bg-[#ff9900] text-white px-2 py-1 rounded">Default</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-6 text-sm text-gray-700">
                      <p>{address.address}</p>
                      <p>
                        {address.area}, {address.city}
                      </p>
                      <p className="mt-1 font-medium">{address.phone}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setEditingAddress(address.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAddress(address.id)}
                      disabled={addresses.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Add New Address */}
            {!showAddForm ? (
              <Card className="p-4 border-dashed border-2 border-gray-300">
                <Button
                  variant="ghost"
                  className="w-full h-20 text-gray-600 hover:text-black"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus className="h-6 w-6 mr-2" />
                  Add a new address
                </Button>
              </Card>
            ) : (
              <Card className="p-6">
                <h3 className="text-lg font-medium text-black mb-4">Add a new address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <Input
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <Input
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      placeholder="+880 1XXXXXXXXX"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <Input
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      placeholder="House/Flat number, Road, Block"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <select
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barisal">Barisal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area *</label>
                    <Input
                      value={newAddress.area}
                      onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                      placeholder="e.g., Dhanmondi, Gulshan, Uttara"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <Button onClick={handleAddAddress} className="amazon-button">
                    Add Address
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false)
                      setNewAddress({ name: "", phone: "", address: "", city: "Dhaka", area: "" })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4">
              <h3 className="text-lg font-medium text-black mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Items (3):</span>
                  <span>৳12,450</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>৳120</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT:</span>
                  <span>৳1,257</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium text-base">
                  <span>Order Total:</span>
                  <span className="amazon-price">৳13,827</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleContinue}
                  className="amazon-button w-full"
                  disabled={!addresses.find((addr) => addr.isDefault)}
                >
                  Continue to Payment
                </Button>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Delivery within 1-2 business days in Dhaka</span>
                </div>
                <p>By continuing, you agree to Hasib Shop's Terms of Service and Privacy Policy.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
