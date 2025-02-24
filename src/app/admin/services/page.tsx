"use client"

import * as React from "react"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const services = [
  {
    id: "1",
    name: "Classic Haircut",
    category: "Hair",
    duration: 45,
    price: 35,
    description: "Professional haircut with styling",
    status: "active",
  },
  {
    id: "2",
    name: "Hot Towel Shave",
    category: "Grooming",
    duration: 30,
    price: 45,
    description: "Traditional straight razor shave with hot towel treatment",
    status: "active",
  },
]

export default function ServicesManagement() {
  const [isAddingService, setIsAddingService] = React.useState(false)

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Create a new service offering.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Service Name</Label>
                <Input id="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hair">Hair</SelectItem>
                    <SelectItem value="grooming">Grooming</SelectItem>
                    <SelectItem value="spa">Spa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" min="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" min="0" step="0.01" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>{service.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <p className="font-medium">{service.duration} minutes</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <p className="font-medium">${service.price}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

