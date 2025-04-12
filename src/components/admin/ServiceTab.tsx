import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useServices } from "@/contexts/ServiceContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ServiceService from "@/services/service.service";
import { ServiceCategory, UIService } from "@/types/ServiceService.types";
import { UpdateServiceDto } from "@/types/ServiceService.types";

interface FormData {
  id: number; // ServiceItem ID (0 for new items)
  title: string;
  subtitle: string;
  image: string;
  price: number;
  type: string;
  duration: string;
}

const defaultFormData: FormData = {
  id: 0,
  title: "",
  subtitle: "",
  image: "",
  price: 0,
  type: "",
  duration: "30 min",
};

const ServiceTab = () => {
  const { services, serviceCategories, fetchServices } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes for the form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  // Reset form to default state
  const resetForm = () => {
    setFormData(defaultFormData);
    setEditingCategory(null);
  };

  // Open modal to create a new service (new category with one item)
  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open modal to edit an existing service item
  const openEditModal = (uiService: UIService) => {
    const category = serviceCategories.find((cat) => cat.id === uiService.categoryId);
    if (!category) {
      console.error("Category not found for service", uiService);
      setError("Category not found");
      return;
    }
    const [, itemIdStr] = uiService.id.split("-");
    const itemId = Number(itemIdStr);
    const item = category.data.find((i) => i.id === itemId);
    if (!item) {
      console.error("Service item not found in category", uiService);
      setError("Service item not found");
      return;
    }
    setEditingCategory(category);
    setFormData({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      price: item.price,
      type: item.type,
      duration: "30 min",
    });
    setIsModalOpen(true);
  };

  // Create a new service category with one service item
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newCategory: ServiceCategory = {
      id: 0, // Backend will assign ID
      name: formData.title, // Use item title as category name for simplicity
      description: formData.subtitle, // Use item subtitle as category description
      serviceImageUrl: formData.image,
      data: [
        {
          id: 0, // Backend will assign ID
          image: formData.image,
          title: formData.title,
          subtitle: formData.subtitle,
          price: formData.price,
          type: formData.type,
        },
      ],
    };

    try {
      const response = await ServiceService.createService(newCategory);
      if (response.success) {
        await fetchServices();
        setIsModalOpen(false);
        resetForm();
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      console.error("Create Service Error:", err);
      setError("Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing service item within its category
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setLoading(true);
    setError(null);

    const updatedData = editingCategory.data.map((item) =>
      item.id === formData.id
        ? {
            id: item.id,
            image: formData.image,
            title: formData.title,
            subtitle: formData.subtitle,
            price: formData.price,
            type: formData.type,
            duration: formData.duration,
          }
        : item
    );

    const updateDto: UpdateServiceDto = {
      id: editingCategory.id,
      name: editingCategory.name,
      description: editingCategory.description,
      serviceImageUrl: editingCategory.serviceImageUrl,
      data: updatedData,
    };

    try {
      const response = await ServiceService.updateService(
        editingCategory.id.toString(),
        updateDto
      );
      if (response.success) {
        await fetchServices();
        setIsModalOpen(false);
        resetForm();
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      console.error("Update Service Error:", err);
      setError("Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  // Delete a service item by updating the category to remove it
  const handleDelete = async (compositeId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setLoading(true);
    setError(null);

    const [categoryIdStr, itemIdStr] = compositeId.split("-");
    const categoryId = Number(categoryIdStr);
    const itemId = Number(itemIdStr);
    const category = serviceCategories.find((cat) => cat.id === categoryId);
    if (!category) {
      setError("Category not found");
      setLoading(false);
      return;
    }

    const updatedData = category.data.filter((item) => item.id !== itemId);
    if (updatedData.length === category.data.length) {
      setError("Service item not found");
      setLoading(false);
      return;
    }

    const updateDto: UpdateServiceDto = {
      id: category.id,
      name: category.name,
      description: category.description,
      serviceImageUrl: category.serviceImageUrl,
      data: updatedData,
    };

    try {
      const response = await ServiceService.updateService(
        category.id.toString(),
        updateDto
      );
      if (response.success) {
        await fetchServices();
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      console.error("Delete Service Error:", err);
      setError("Failed to delete service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Services Management</CardTitle>
              <CardDescription>View and manage salon services</CardDescription>
            </div>
            <Dialog
              open={isModalOpen}
              onOpenChange={(open) => {
                setIsModalOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button onClick={openCreateModal}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? "Edit Service" : "Add New Service"}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details to{" "}
                    {editingCategory ? "update" : "create"} a service.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={editingCategory ? handleUpdate : handleCreate}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  <Button type="submit" disabled={loading}>
                    {loading
                      ? "Processing..."
                      : editingCategory
                      ? "Update Service"
                      : "Create Service"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service: UIService) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img
                        src={service.serviceImageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>${service.price.toFixed(2)}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(service)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceTab;