"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Dummy data for products
const productData = [
  {
    id: "1",
    name: "Hair Gel",
    category: "Hair Care",
    price: "$15.00",
    stock: 20,
    status: "in stock", // in stock or out of stock
  },
  {
    id: "2",
    name: "Shampoo",
    category: "Hair Care",
    price: "$10.00",
    stock: 0,
    status: "out of stock", // in stock or out of stock
  },
  {
    id: "3",
    name: "Face Cream",
    category: "Skin Care",
    price: "$25.00",
    stock: 5,
    status: "in stock", // in stock or out of stock
  },
];

export default function ProductManagement() {
  const [products] = useState(productData);

  return (
    <div className="container py-10">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8 lg:col-span-9">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Products</CardTitle>
                </div>
                <Button>Add Product</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{product.name}</span>
                          <Badge
                            variant={product.status === "in stock" ? "default" : "secondary"}
                          >
                            {product.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Category: {product.category}
                        </div>
                        <div className="text-sm">{product.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground">
                    No products available.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
