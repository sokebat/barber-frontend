"use client"

import * as React from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/common/product-card"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/lib/types"

const products: Product[] = [
  {
    id: "1",
    name: "Premium Hair Pomade",
    description:
      "Strong hold, natural finish hair styling pomade for all hair types. Perfect for creating textured, defined styles that last all day.",
    price: 24.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Hair Care",
    stock: 50,
  },
  {
    id: "2",
    name: "Beard Oil",
    description:
      "Nourishing beard oil for soft, manageable facial hair. Enriched with argan and jojoba oils to condition and tame even the most unruly beards.",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Beard Care",
    stock: 35,
  },
  {
    id: "3",
    name: "Luxury Shaving Cream",
    description:
      "Rich, creamy formula that creates a luxurious lather for a smooth, comfortable shave. Helps prevent irritation and razor burn.",
    price: 19.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Grooming",
    stock: 42,
  },
  {
    id: "4",
    name: "Facial Cleanser",
    description:
      "Gentle yet effective facial cleanser that removes dirt and oil without stripping the skin. Perfect for daily use.",
    price: 22.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Skin Care",
    stock: 28,
  },
  {
    id: "5",
    name: "Premium Beard Brush",
    description:
      "Handcrafted boar bristle beard brush that helps distribute oils and style your beard. The perfect tool for daily grooming.",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Tools",
    stock: 15,
  },
  {
    id: "6",
    name: "Aftershave Balm",
    description:
      "Soothing aftershave balm that calms and hydrates the skin after shaving. Alcohol-free formula prevents dryness and irritation.",
    price: 26.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Grooming",
    stock: 8,
  },
]

export default function StorePage() {
  const { addItem } = useCart()
  const [category, setCategory] = React.useState<string>("all")
  const [sortBy, setSortBy] = React.useState<string>("featured")
  const [searchQuery, setSearchQuery] = React.useState<string>("")

  // Filter products based on category and search query
  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category.toLowerCase() === category.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [category, searchQuery])

  // Sort products
  const sortedProducts = React.useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })
  }, [filteredProducts, sortBy])

  const handleAddToCart = (productId: string) => {
    addItem({ id: productId, quantity: 1, type: "product" })
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Shop</h1>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Filter products by category</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <h3 className="mb-2 text-sm font-medium">Categories</h3>
                    <div className="space-y-2">
                      {["all", "hair care", "beard care", "grooming", "skin care", "tools"].map((cat) => (
                        <Button
                          key={cat}
                          variant={category === cat ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setCategory(cat)}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Desktop sidebar */}
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-20 space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">Categories</h3>
                <div className="space-y-1">
                  {["all", "hair care", "beard care", "grooming", "skin care", "tools"].map((cat) => (
                    <Button
                      key={cat}
                      variant={category === cat ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setCategory(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 text-lg font-medium">Price Range</h3>
                {/* Price range slider could go here */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">$0</span>
                  <span className="text-sm text-muted-foreground">$100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="col-span-12 lg:col-span-9">
            {sortedProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-center text-muted-foreground">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

