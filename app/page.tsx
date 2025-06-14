import HeroSection from "@/components/hero-section"
import CategoriesSection from "@/components/categories-section"
import ProductsSection from "@/components/products-section"
import SuccessStorySection from "@/components/success-story-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import AISetupGuide from "@/components/ai-setup-guide"

export default function Home() {
  return (
    <div className="bg-gray-100">
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />

      {/* AI Setup Guide Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">🤖 Enable AI Features</h2>
            <p className="text-lg text-gray-600">Unlock smart search and personalized shopping assistance</p>
          </div>
          <AISetupGuide />
        </div>
      </section>

      <SuccessStorySection />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
