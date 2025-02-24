"use client"

import * as React from "react"
import Image from "next/image"
// import { ShoppingCart } from "lucide-react"

// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/lib/types"

const products: Product[] = [
  {
    id: "1",
    name: "Premium Hair Pomade",
    description: "Strong hold, natural finish hair styling pomade",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Hair Care",
    stock: 50,
  },
  {
    id: "2",
    name: "Beard Oil",
    description: "Nourishing beard oil for soft, manageable facial hair",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Beard Care",
    stock: 35,
  },
  // Add more products...
]

export default function StorePage() {
  // const { addItem } = useCart()
  const [category, setCategory] = React.useState<string>("all")

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category.toLowerCase() === category.toLowerCase())

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Shop</h1>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="hair care">Hair Care</SelectItem>
              <SelectItem value="beard care">Beard Care</SelectItem>
              <SelectItem value="skin care">Skin Care</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <div className="aspect-square relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${product.price}</div>
              </CardContent>
              <CardFooter>
                {/* <Button className="w-full" onClick={() => addItem({ id: product.id, quantity: 1, type: "product" })}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

