"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { Check, Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({
  product,

  onAddToCart,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product.id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="overflow-hidden border-0  bg-transparent shadow-none transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <div className="relative  overflow-hidden rounded-xl bg-muted/30">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            width={400}
            height={400}
            className={`object-cover transition-transform duration-500 h-96  `}
          />

          {/* Action buttons */}
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-red-500" : ""}`}
              />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Low stock badge */}
          {product.stock < 10 && (
            <Badge
              variant="destructive"
              className="absolute left-3 top-3 bg-red-500/90"
            >
              Low Stock
            </Badge>
          )}

          {/* Add to cart overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300  `}
          >
            <Button
              className="translate-y-4 bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Product info */}
        <CardContent className="px-1 pt-4 text-zinc-900">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 line-clamp-1 text-base font-semibold">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-1 flex items-center">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < 4 ? "fill-amber-400" : "text-muted"
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">(24)</span>
          </div>

          <CardDescription className="mt-2 line-clamp-2 text-xs">
            {product.description}
          </CardDescription>
        </CardContent>

        {/* Price and stock */}
        <CardFooter className="flex items-center justify-between px-1 pt-0">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">${product.price}</span>
            {product.price > 20 && (
              <span className="text-sm text-muted-foreground line-through">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
