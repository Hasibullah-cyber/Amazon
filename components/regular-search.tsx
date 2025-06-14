"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function RegularSearch() {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSearch = () => {
    if (!query.trim()) return

    // Enhanced search logic with better keyword matching
    const lowerQuery = query.toLowerCase()

    // Beauty & Personal Care keywords
    if (
      lowerQuery.includes("face") ||
      lowerQuery.includes("skin") ||
      lowerQuery.includes("beauty") ||
      lowerQuery.includes("makeup") ||
      lowerQuery.includes("cosmetic") ||
      lowerQuery.includes("skincare") ||
      lowerQuery.includes("cream") ||
      lowerQuery.includes("lotion") ||
      lowerQuery.includes("serum") ||
      lowerQuery.includes("cleanser") ||
      lowerQuery.includes("moisturizer") ||
      lowerQuery.includes("perfume") ||
      lowerQuery.includes("fragrance") ||
      lowerQuery.includes("lipstick") ||
      lowerQuery.includes("foundation") ||
      lowerQuery.includes("mascara") ||
      lowerQuery.includes("shampoo") ||
      lowerQuery.includes("conditioner") ||
      lowerQuery.includes("hair") ||
      lowerQuery.includes("nail")
    ) {
      toast({
        title: "Beauty & Personal Care",
        description: "Found skincare, makeup, and beauty products for you!",
        duration: 3000,
      })
      router.push("/category/beauty")
      setQuery("")
      return
    }

    // Fashion keywords
    if (
      lowerQuery.includes("fashion") ||
      lowerQuery.includes("clothes") ||
      lowerQuery.includes("clothing") ||
      lowerQuery.includes("shirt") ||
      lowerQuery.includes("dress") ||
      lowerQuery.includes("pants") ||
      lowerQuery.includes("sunglasses") ||
      lowerQuery.includes("glasses") ||
      lowerQuery.includes("wallet") ||
      lowerQuery.includes("belt") ||
      lowerQuery.includes("bag") ||
      lowerQuery.includes("handbag") ||
      lowerQuery.includes("purse") ||
      lowerQuery.includes("watch") ||
      lowerQuery.includes("jewelry") ||
      lowerQuery.includes("accessory") ||
      lowerQuery.includes("tie") ||
      lowerQuery.includes("scarf")
    ) {
      toast({
        title: "Fashion",
        description: "Found stylish clothing and accessories for you!",
        duration: 3000,
      })
      router.push("/category/fashion")
      setQuery("")
      return
    }

    // Home & Living keywords
    if (
      lowerQuery.includes("home") ||
      lowerQuery.includes("house") ||
      lowerQuery.includes("living") ||
      lowerQuery.includes("decor") ||
      lowerQuery.includes("decoration") ||
      lowerQuery.includes("candle") ||
      lowerQuery.includes("pillow") ||
      lowerQuery.includes("cushion") ||
      lowerQuery.includes("bed") ||
      lowerQuery.includes("sheet") ||
      lowerQuery.includes("blanket") ||
      lowerQuery.includes("lamp") ||
      lowerQuery.includes("light") ||
      lowerQuery.includes("clock") ||
      lowerQuery.includes("vase") ||
      lowerQuery.includes("furniture") ||
      lowerQuery.includes("kitchen") ||
      lowerQuery.includes("bathroom")
    ) {
      toast({
        title: "Home & Living",
        description: "Found home decor and living essentials for you!",
        duration: 3000,
      })
      router.push("/category/home-living")
      setQuery("")
      return
    }

    // Electronics keywords
    if (
      lowerQuery.includes("electronic") ||
      lowerQuery.includes("tech") ||
      lowerQuery.includes("gadget") ||
      lowerQuery.includes("phone") ||
      lowerQuery.includes("mobile") ||
      lowerQuery.includes("headphone") ||
      lowerQuery.includes("earphone") ||
      lowerQuery.includes("earbud") ||
      lowerQuery.includes("speaker") ||
      lowerQuery.includes("audio") ||
      lowerQuery.includes("camera") ||
      lowerQuery.includes("watch") ||
      lowerQuery.includes("smartwatch") ||
      lowerQuery.includes("fitness") ||
      lowerQuery.includes("power") ||
      lowerQuery.includes("battery") ||
      lowerQuery.includes("charger") ||
      lowerQuery.includes("computer") ||
      lowerQuery.includes("laptop") ||
      lowerQuery.includes("tablet")
    ) {
      toast({
        title: "Electronics",
        description: "Found tech gadgets and electronic devices for you!",
        duration: 3000,
      })
      router.push("/category/electronics")
      setQuery("")
      return
    }

    // If no specific category matches, show all categories
    toast({
      title: "Search Results",
      description: `Searching for "${query}" - check all our categories below!`,
      duration: 4000,
    })
    router.push("/#categories")
    setQuery("")
  }

  return (
    <div className="relative w-full">
      <Input
        type="search"
        placeholder="Search: face cream, headphones, sunglasses, candles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        className="w-full rounded-l-md rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black placeholder:text-gray-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button onClick={handleSearch} className="h-full rounded-l-none bg-[#febd69] hover:bg-[#f3a847] text-black">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
