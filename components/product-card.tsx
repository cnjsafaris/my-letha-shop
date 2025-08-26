"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: {
    name: string
    is_luxury: boolean
  }
  is_featured: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.is_featured && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Featured</Badge>
        )}
        {product.category.is_luxury && (
          <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">Luxury</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground">{product.category.name}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="flex gap-2 w-full">
          <Button asChild className="flex-1">
            <Link href={`/products/${product.id}`}>View Details</Link>
          </Button>
          <Button variant="outline" onClick={() => onAddToCart?.(product.id)} className="flex-1">
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
