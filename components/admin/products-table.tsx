"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Edit, Trash2 } from "lucide-react"
import { EditProductDialog } from "./edit-product-dialog"
import Image from "next/image"

interface ProductsTableProps {
  products: any[]
  categories: any[]
}

export function ProductsTable({ products: initialProducts, categories }: ProductsTableProps) {
  const [products, setProducts] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const toggleProductStatus = async (productId: string, isActive: boolean) => {
    try {
      const { error } = await supabase.from("products").update({ is_active: isActive }).eq("id", productId)

      if (error) throw error

      setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, is_active: isActive } : p)))

      toast({
        title: "Success",
        description: `Product ${isActive ? "activated" : "deactivated"} successfully`,
      })
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "Failed to update product status",
        variant: "destructive",
      })
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const { error } = await supabase.from("products").delete().eq("id", productId)

      if (error) throw error

      setProducts((prev) => prev.filter((p) => p.id !== productId))

      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.name || "Unknown"
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setShowEditDialog(true)
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="relative w-12 h-12">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{getCategoryName(product.category_id)}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock_quantity}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={product.is_active}
                    onCheckedChange={(checked) => toggleProductStatus(product.id, checked)}
                  />
                  <Badge variant={product.is_active ? "default" : "secondary"}>
                    {product.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>{product.is_featured && <Badge variant="outline">Featured</Badge>}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditProductDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        product={editingProduct}
        categories={categories}
      />
    </div>
  )
}
