"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [category, setCategory] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data: product } = await supabase
        .from("products")
        .select(`
          *,
          categories (*)
        `)
        .eq("id", params.id)
        .eq("is_active", true)
        .single()

      if (product) {
        setProduct(product)
        setCategory(product.categories)
      }
      setIsLoading(false)
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id, supabase])

  const handleAddToCart = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to cart",
        variant: "destructive",
      })
      return
    }

    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .single()

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id)

        if (error) throw error
      } else {
        // Add new item
        const { error } = await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity,
        })

        if (error) throw error
      }

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist or is no longer available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src={product.image_url || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.is_featured && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-orange-700">Featured</Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              {category && (
                <Badge variant="outline" className="mb-2">
                  {category.name}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-amber-600">${product.price}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              {product.material && (
                <div>
                  <h4 className="font-medium text-gray-900">Material</h4>
                  <p className="text-gray-600">{product.material}</p>
                </div>
              )}
              {product.color && (
                <div>
                  <h4 className="font-medium text-gray-900">Color</h4>
                  <p className="text-gray-600">{product.color}</p>
                </div>
              )}
              {product.sku && (
                <div>
                  <h4 className="font-medium text-gray-900">SKU</h4>
                  <p className="text-gray-600">{product.sku}</p>
                </div>
              )}
              <div>
                <h4 className="font-medium text-gray-900">Stock</h4>
                <p className="text-gray-600">
                  {product.stock_quantity > 0 ? `${product.stock_quantity} available` : "Out of stock"}
                </p>
              </div>
            </div>

            <Separator />

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="font-medium text-gray-900">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  disabled={product.stock_quantity === 0}
                >
                  {Array.from({ length: Math.min(10, product.stock_quantity) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <Truck className="w-6 h-6 text-amber-600" />
                  <div>
                    <h4 className="font-medium">Free Delivery</h4>
                    <p className="text-sm text-gray-600">On orders over $100</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <Shield className="w-6 h-6 text-amber-600" />
                  <div>
                    <h4 className="font-medium">Quality Guarantee</h4>
                    <p className="text-sm text-gray-600">Premium materials</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <RotateCcw className="w-6 h-6 text-amber-600" />
                  <div>
                    <h4 className="font-medium">Easy Returns</h4>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
