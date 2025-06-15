import { supabase } from "@/lib/supabase" // 👈 Make sure this import is at the top

const handlePlaceOrder = async () => {
  const order = {
    order_id: "#HS-" + Date.now(),
    name,
    address,
    city,
    phone,
    payment_method: selectedPayment,
    subtotal,
    vat,
    shipping,
    total_amount: totalAmount,
  }

  // Save to Supabase
  const { error } = await supabase.from("orders").insert([order])
  if (error) {
    alert("Failed to place order: " + error.message)
    return
  }

  localStorage.setItem("order", JSON.stringify(order))
  localStorage.removeItem("cart")
  router.push("/order-confirmation")
}
