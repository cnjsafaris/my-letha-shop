import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-muted to-background">
      <div className="absolute inset-0 bg-[url('/luxury-leather-texture-background.png')] bg-cover bg-center opacity-10" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl font-bold text-primary">LS</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">LETHASHOP</h1>
          <p className="text-xl text-accent font-medium mb-2">Premier Goods</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted leather goods, from luxury handbags to everyday essentials,
            all made with the finest materials.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link href="/category/designer-handbags">Luxury Collection</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
