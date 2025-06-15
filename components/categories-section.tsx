import Link from "next/link"
import Image from "next/image"

// Define the categories
const categories = [
  { name: "Electronics", slug: "electronics", image: "/placeholder.svg?height=150&width=150" },
  { name: "Clothing", slug: "clothing", image: "/placeholder.svg?height=150&width=150" },
  { name: "Home & Garden", slug: "home-garden", image: "/placeholder.svg?height=150&width=150" },
  { name: "Sports", slug: "sports", image: "/placeholder.svg?height=150&width=150" },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/category/${category.slug}`}
              className="group text-center"
            >
              <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-transform group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={150}
                  height={150}
                  priority
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}