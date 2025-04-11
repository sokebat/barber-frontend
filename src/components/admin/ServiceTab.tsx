// ServiceTab.tsx
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
import {
  ServiceCategory,
  ServiceItem,
  UIService,
} from "@/types/AppointmentService.types";
import { Service } from "@/types";
import { UpdateServiceDto } from "@/types/ServiceService.types";

interface FormData {
  id: number;
  name: string;
  description: string;
  serviceImageUrl: string;
  price: number;
  type: string;
  // Note: data is only used when updating the full category.
  data: ServiceItem[];
}

const defaultFormData: FormData = {
  id: 0,
  name: "",
  description: "",
  serviceImageUrl: "",
  price: 0,
  type: "",
  data: [],
};

const ServiceTab = () => {
  const { services, serviceCategories, fetchServices } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // editingCategory stores the complete category which owns the service item being edited.
  const [editingCategory, setEditingCategory] =
    useState<ServiceCategory | null>(null);
  // The formData holds the details for the service item being created/updated.
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to generate temporary IDs
  const generateTempId = (): number => {
    // Use crypto API if available, otherwise fallback to Date.now()
    return typeof crypto !== "undefined" && crypto.randomUUID
      ? parseInt(crypto.randomUUID().split("-").join("").substring(0, 8), 16)
      : Date.now();
  };

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

  // Open modal to create a new service.
  // For create, we are not editing an existing category so editingCategory remains null.
  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open the modal in edit mode by extracting the proper category and service item using the UIService info.
  const openEditModal = (uiService: UIService) => {
    // Find the corresponding category using categoryId
    const category = serviceCategories.find(
      (cat) => cat.id === uiService.categoryId
    );
    if (!category) {
      console.error("Category not found for service", uiService);
      return;
    }
    // Extract the service item id (assuming the format is `${categoryId}-${itemId}`)
    const [, itemIdStr] = uiService.id.split("-");
    const itemId = Number(itemIdStr);
    const item = category.data.find((i) => i.id === itemId);
    if (!item) {
      console.error("Service item not found in category", uiService);
      return;
    }
    setEditingCategory(category);
    setFormData({
      id: item.id,
      name: item.title,
      description: item.subtitle,
      serviceImageUrl: item.image,
      price: item.price,
      type: item.type,
      data: category.data, // keep the full list from the category
    });
    setIsModalOpen(true);
  };

  // Create a new service category with one service item
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Build a new ServiceCategory. The backend should assign proper IDs.
    const newCategory: ServiceCategory = {
      id: generateTempId(), // temporary id
      name: formData.name,
      description: formData.description,
      serviceImageUrl: formData.serviceImageUrl,
      data: [
        {
          id: generateTempId(), // temporary id for the service item
          image: formData.serviceImageUrl,
          title: formData.name,
          subtitle: formData.description,
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

  // Update an existing service item inside its category.
  // This updates the entire category data array.
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setLoading(true);
    setError(null);

    // Map through the existing data array and update the matching service item.
    const updatedData = editingCategory.data.map((item) =>
      item.id === formData.id
        ? {
            ...item,
            image: formData.serviceImageUrl,
            title: formData.name,
            subtitle: formData.description,
            price: formData.price,
            type: formData.type,
          }
        : item
    );

    // Build the update DTO. You may choose to update the category properties as needed.
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

  // Delete a service. The id passed here is the composite id from UIService.
  const handleDelete = async (compositeId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setLoading(true);
    setError(null);

    try {
      // The id parameter for deletion might be the unique category or service item id.
      // Depending on your backend implementation, you may need to adjust this.
      // Here we assume the composite id's second part (itemId) is used.
      const [, itemIdStr] = compositeId.split("-");
      const itemId = itemIdStr;
      const response = await ServiceService.deleteService(itemId);
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
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
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
                    <Label htmlFor="serviceImageUrl">Image URL</Label>
                    <Input
                      id="serviceImageUrl"
                      name="serviceImageUrl"
                      value={formData.serviceImageUrl}
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
