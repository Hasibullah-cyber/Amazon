import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import TaxInfo from "@/components/tax-info"
import AddToCartButton from "./add-to-cart"
import { Star, StarHalf } from "lucide-react"

// Define the categories with their products
const categories = {
  electronics: {
    name: "Electronics",
    description: "Cutting-edge gadgets and devices for modern living",
    products: [
      {
        id: 101,
        name: "Premium Wireless Headphones",
        description: "Immersive sound quality with noise cancellation technology.",
        price: 199.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 128,
      },
      {
        id: 102,
        name: "Smart Fitness Watch",
        description: "Track your health metrics and stay connected on the go.",
        price: 149.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.2,
        reviews: 95,
      },
      {
        id: 103,
        name: "Ultra HD Camera",
        description: "Capture life's moments with stunning clarity and detail.",
        price: 299.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 203,
      },
      {
        id: 104,
        name: "Portable Power Bank",
        description: "Fast charging solution for all your devices when you're on the move.",
        price: 59.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.0,
        reviews: 156,
      },
      {
        id: 105,
        name: "Wireless Earbuds",
        description: "Crystal clear audio in a compact, comfortable design.",
        price: 89.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.3,
        reviews: 178,
      },
      {
        id: 106,
        name: "Smart Home Speaker",
        description: "Voice-controlled speaker with premium sound quality.",
        price: 129.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.1,
        reviews: 112,
      },
    ],
  },
  fashion: {
    name: "Fashion",
    description: "Stylish apparel and accessories for every occasion",
    products: [
      {
        id: 201,
        name: "Designer Sunglasses",
        description: "Protect your eyes with style and elegance.",
        price: 79.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.0,
        reviews: 85,
      },
      {
        id: 202,
        name: "Premium Leather Wallet",
        description: "Handcrafted genuine leather wallet with multiple compartments.",
        price: 49.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.4,
        reviews: 132,
      },
      {
        id: 203,
        name: "Classic Wristwatch",
        description: "Timeless design with precision movement.",
        price: 159.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 98,
      },
      {
        id: 204,
        name: "Silk Neck Tie",
        description: "100% silk tie with elegant patterns.",
        price: 39.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.2,
        reviews: 67,
      },
      {
        id: 205,
        name: "Leather Belt",
        description: "Premium quality leather belt with stylish buckle.",
        price: 45.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.3,
        reviews: 104,
      },
      {
        id: 206,
        name: "Designer Handbag",
        description: "Elegant handbag with spacious compartments.",
        price: 199.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 143,
      },
    ],
  },
  "home-living": {
    name: "Home & Living",
    description: "Beautiful furnishings and decor for your space",
    products: [
      {
        id: 301,
        name: "Scented Candle Set",
        description: "Set of 3 premium scented candles for a relaxing atmosphere.",
        price: 34.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 203,
      },
      {
        id: 302,
        name: "Decorative Throw Pillows",
        description: "Set of 2 stylish throw pillows to accent your living space.",
        price: 29.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 187,
      },
      {
        id: 303,
        name: "Modern Wall Clock",
        description: "Sleek design wall clock for contemporary homes.",
        price: 49.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.2,
        reviews: 95,
      },
      {
        id: 304,
        name: "Ceramic Vase Set",
        description: "Set of 3 ceramic vases in varying sizes.",
        price: 59.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.4,
        reviews: 126,
      },
      {
        id: 305,
        name: "Luxury Bed Sheets",
        description: "100% Egyptian cotton sheets for ultimate comfort.",
        price: 89.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 215,
      },
      {
        id: 306,
        name: "Table Lamp",
        description: "Modern design table lamp with adjustable brightness.",
        price: 69.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.3,
        reviews: 108,
      },
    ],
  },
  beauty: {
    name: "Beauty & Personal Care",
    description: "Premium products for your self-care routine",
    products: [
      {
        id: 401,
        name: "Luxury Skincare Set",
        description: "Complete skincare routine with premium ingredients.",
        price: 129.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 178,
      },
      {
        id: 402,
        name: "Premium Hair Dryer",
        description: "Professional-grade hair dryer with multiple settings.",
        price: 89.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.3,
        reviews: 142,
      },
      {
        id: 403,
        name: "Electric Shaver",
        description: "Precision electric shaver for a smooth experience.",
        price: 79.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.2,
        reviews: 97,
      },
      {
        id: 404,
        name: "Makeup Brush Set",
        description: "Set of 12 professional makeup brushes.",
        price: 49.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 163,
      },
      {
        id: 405,
        name: "Perfume Collection",
        description: "Set of 3 luxury fragrances for any occasion.",
        price: 119.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 189,
      },
      {
        id: 406,
        name: "Facial Massager",
        description: "Electric facial massager for skin rejuvenation.",
        price: 59.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.1,
        reviews: 86,
      },
    ],
  },
}

// Function to render star ratings
const renderRating = (rating: number) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#FFA41C] text-[#FFA41C]" />
      ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-[#FFA41C] text-[#FFA41C]" />}
    </div>
  )
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const category = categories[slug as keyof typeof categories]

  if (!category) {
    notFound()
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm mb-4">
          <Link href="/" className="text-[#565959] hover:text-[#C7511F] hover:underline">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="font-medium">{category.name}</span>
        </div>

        <div className="bg-white p-4 mb-4">
          <h1 className="text-2xl font-medium text-black mb-2">{category.name}</h1>
          <p className="text-sm text-gray-700">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filters sidebar */}
          <div className="hidden md:block">
            <div className="bg-white p-4 mb-4">
              <h2 className="text-lg font-medium text-black mb-3">Department</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/category/electronics" className="amazon-link">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/category/fashion" className="amazon-link">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/category/home-living" className="amazon-link">
                    Home & Living
                  </Link>
                </li>
                <li>
                  <Link href="/category/beauty" className="amazon-link">
                    Beauty & Personal Care
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4">
              <h2 className="text-lg font-medium text-black mb-3">Customer Reviews</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  {renderRating(4)}
                  <span className="ml-2 text-sm amazon-link">& Up</span>
                </li>
                <li className="flex items-center">
                  {renderRating(3)}
                  <span className="ml-2 text-sm amazon-link">& Up</span>
                </li>
                <li className="flex items-center">
                  {renderRating(2)}
                  <span className="ml-2 text-sm amazon-link">& Up</span>
                </li>
                <li className="flex items-center">
                  {renderRating(1)}
                  <span className="ml-2 text-sm amazon-link">& Up</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Products grid */}
          <div className="md:col-span-3">
            <div className="bg-white p-4 mb-4 flex justify-between items-center">
              <span className="text-sm">
                {category.products.length} results for <span className="font-medium">{category.name}</span>
              </span>
              <select className="text-sm border border-gray-300 rounded-md p-1">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Reviews</option>
                <option>Newest Arrivals</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.products.map((product) => (
                <div key={product.id} className="bg-white p-4 border border-gray-200">
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="aspect-square relative mb-3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-base line-clamp-2 mb-1 hover:text-[#C7511F]">{product.name}</h3>
                  </Link>

                  <div className="flex items-center">
                    {renderRating(product.rating)}
                    <span className="ml-1 text-sm amazon-link">{product.reviews}</span>
                  </div>

                  <div className="mt-2">
                    <span className="amazon-price text-lg">৳{(product.price * 110).toFixed(2)}</span>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <span>Includes 10% VAT</span>
                      <span className="mx-1">•</span>
                      <TaxInfo />
                    </div>
                  </div>

                  <div className="mt-3">
                    <AddToCartButton product={product} />
                  </div>

                  <div className="mt-2 text-xs">
                    <span className="text-[#007600]">In Stock</span>
                    <div className="mt-1">
                      <span>Ships to Bangladesh</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
