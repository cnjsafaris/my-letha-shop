"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function CartButton() {
  const { totalItems } = useCart()

  return (
    <Link href="/cart" className="relative">
      <Button variant="ghost" size="sm">
        <ShoppingCart className="h-4 w-4" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            {totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
