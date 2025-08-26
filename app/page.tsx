import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />

        {/* Categories Preview */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="group cursor-pointer">
                <div className="aspect-square bg-card rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-2xl font-bold text-primary">👜</span>
                  </div>
                </div>
                <h3 className="font-semibold">Handbags</h3>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-square bg-card rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-2xl font-bold text-primary">👛</span>
                  </div>
                </div>
                <h3 className="font-semibold">Wallets</h3>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-square bg-card rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-2xl font-bold text-primary">👞</span>
                  </div>
                </div>
                <h3 className="font-semibold">Shoes</h3>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-square bg-card rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-2xl font-bold text-primary">🎒</span>
                  </div>
                </div>
                <h3 className="font-semibold">Bags</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
