export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  is_luxury: boolean
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  stock_quantity?: number
  is_featured: boolean
  is_active: boolean
  category_id: string
  category?: {
    name: string
    slug: string
    is_luxury: boolean
  }
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
}

export interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
}

export interface Profile {
  id: string
  full_name?: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  order_number: string
  total_amount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: string
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  shipping_address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  customer_info: {
    name: string
    email: string
    phone: string
  }
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}