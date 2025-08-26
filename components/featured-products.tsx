"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ProductCard } from "./product-card"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        console.log("[v0] Fetching featured products...")
        const supabase = createClient()

        const { data, error } = await supabase
          .from("products")
          .select(`
            id,
            name,
            description,
            price,
            image_url,
            is_featured,
            category:categories(name, is_luxury)
          `)
          .eq("is_featured", true)
          .eq("is_active", true)
          .limit(6)

        if (error) {
          console.error("[v0] Supabase error:", error)
          throw error
        }

        console.log("[v0] Featured products data:", data)

        if (!data || data.length === 0) {
          console.log("[v0] No featured products found, fetching any active products...")
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("products")
            .select(`
              id,
              name,
              description,
              price,
              image_url,
              is_featured,
              category:categories(name, is_luxury)
            `)
            .eq("is_active", true)
            .limit(6)

          if (fallbackError) throw fallbackError
          setProducts(fallbackData || [])
        } else {
          setProducts(data)
        }
      } catch (error) {
        console.error("[v0] Error fetching featured products:", error)
        toast({
          title: "Error",
          description: "Failed to load featured products. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [toast])

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId)
  }

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-square mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}
