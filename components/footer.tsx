import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">LS</span>
              <div className="ml-2">
                <div className="text-sm font-semibold">LETHASHOP</div>
                <div className="text-xs text-muted-foreground">Premier Goods</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Crafting premium leather goods with exceptional quality and timeless design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/designer-handbags" className="hover:text-primary transition-colors">
                  Luxury Collection
                </Link>
              </li>
              <li>
                <Link href="/category/everyday" className="hover:text-primary transition-colors">
                  Everyday Items
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/designer-handbags" className="hover:text-primary transition-colors">
                  Designer Handbags
                </Link>
              </li>
              <li>
                <Link href="/category/luxury-wallets" className="hover:text-primary transition-colors">
                  Luxury Wallets
                </Link>
              </li>
              <li>
                <Link href="/category/premium-belts" className="hover:text-primary transition-colors">
                  Premium Belts
                </Link>
              </li>
              <li>
                <Link href="/category/designer-shoes" className="hover:text-primary transition-colors">
                  Designer Shoes
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 LS LETHASHOP. All rights reserved. | Pay on Delivery Available</p>
        </div>
      </div>
    </footer>
  )
}
