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
import { CreateServiceDto, UpdateServiceDto, UIService } from "@/types/ServiceService.types";

const ServiceTab = () => {
    const { services, fetchServices } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<UIService | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    price: 0,
    type: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const createDto: CreateServiceDto = {
      id: Math.random(),
      title: formData.title,
      subtitle: formData.subtitle,
      price: formData.price,
      type: formData.type,
      image: formData.image,
      data: [],
    };

    try {
      const response = await ServiceService.createService(createDto);
      if (response.success) {
        await fetchServices(); // Refresh the services list
        setIsModalOpen(false);
        resetForm();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setLoading(true);
    setError(null);

    const updateDto: UpdateServiceDto = {
      id: +editingService.id,
      title: formData.title,
      subtitle: formData.subtitle,  
      price: formData.price,
      type: formData.type,
      image: formData.image,
    };

    try {
      const response = await ServiceService.updateService(
        editingService.id.split("-")[1], // Assuming the actual service ID is after the hyphen
        updateDto
      );
      if (response.success) {
        await fetchServices();
        setIsModalOpen(false);
        resetForm();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    setLoading(true);
    setError(null);

    try {
      const response = await ServiceService.deleteService(id.split("-")[1]);
      if (response.success) {
        await fetchServices();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to delete service");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      price: 0,
      type: "",
      image: "",
    });
    setEditingService(null);
  };

  const openEditModal = (service: UIService) => {
    setEditingService(service);
    setFormData({
      title: service.name,
      subtitle: service.subtitle,
      price: service.price,
      type: service.type,
      image: service.serviceImageUrl,
    });
    setIsModalOpen(true);
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
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingService ? "Edit Service" : "Add New Service"}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details to {editingService ? "update" : "create"}{" "}
                    a service.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={editingService ? handleUpdate : handleCreate}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="title">Name</Label>
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
                      : editingService
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
              {services.map((service) => (
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
                  <TableCell>${service.price?.toFixed(2)}</TableCell>
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