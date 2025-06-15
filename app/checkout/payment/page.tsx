const handlePlaceOrder = async () => {
  if (!selectedPayment) {
    toast({
      title: "Payment Method Required",
      description: "Please select a payment method to continue",
      variant: "destructive",
    })
    return
  }

  setIsProcessing(true)

  setTimeout(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")

    const orderDetails = {
      items: cartItems,
      paymentMethod: selectedPayment,
      total: cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
      time: new Date().toISOString(),
    }

    localStorage.setItem("order", JSON.stringify(orderDetails))
    localStorage.removeItem("cart") // Clear cart after order

    setIsProcessing(false)

    toast({
      title: "Order placed successfully!",
      description: "Redirecting to confirmation page...",
    })

    router.push("/order-confirmation")
  }, 1500)
}
