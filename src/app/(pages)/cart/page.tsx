"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { Minus, Plus, Trash2 } from "lucide-react"

 
const items = {
  products: {
    "1": {
      name: "Premium Hair Pomade",
      price: 24.99,
      image: "/placeholder.svg?height=100&width=100",
    },
  },
  services: {
    "2": {
      name: "Classic Haircut",
      price: 35.0,
      duration: "45 min",
    },
  },
}

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem } = useCart()

  const subtotal = cartItems.reduce((total, item) => {
    const product = items.products[item.id as keyof typeof items.products]
    const service = items.services[item.id as keyof typeof items.services]
    const price = product?.price || service?.price || 0
    return total + price * item.quantity
  }, 0)

  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {cartItems.map((item) => {
                const product = items.products[item.id as keyof typeof items.products]
                const service = items.services[item.id as keyof typeof items.services]
                const itemData = product || service

                if (!itemData) return null

                return (
                  <div key={item.id} className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      {product && (
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{itemData.name}</p>
                        <p className="text-sm text-muted-foreground">${itemData.price}</p>
                        {service && <p className="text-sm text-muted-foreground">Duration: {service.duration}</p>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="h-8 w-16 text-center"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

