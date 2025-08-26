import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  // Check if user is authenticated and is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login?redirect=/admin")
  }

  // Check if user is an admin
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .eq("is_active", true)
    .single()

  if (!adminUser) {
    redirect("/")
  }

  // Get dashboard data
  const [{ data: products }, { data: orders }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }),
    supabase.from("orders").select("*").order("created_at", { ascending: false }),
    supabase.from("categories").select("*").order("name"),
  ])

  return <AdminDashboard products={products || []} orders={orders || []} categories={categories || []} />
}
