import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { PlusCircle, Trash2, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useStore } from "@/contexts/storeContext";
import CategoryService from "@/services/category.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/CategoryService.types";

const CategoriesTab = () => {
  const { categories, fetchCategories } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [newCategory, setNewCategory] = useState<CreateCategoryDto>({
    name: "",
  });

  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching categories...");
        await fetchCategories();
      } catch (err) {
        setError("Failed to fetch categories");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Handle adding a new category
  const handleAddCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await CategoryService.createCategory(newCategory);
      if (response.success && response.data) {
        await fetchCategories(); // Refresh category list
        setIsAddDialogOpen(false);
        setNewCategory({ name: "" });
      } else {
        setError(response.message || "Failed to add category");
      }
    } catch (err) {
      setError("Failed to add category");
      console.error("Error adding category:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a category
  const handleEditCategory = async () => {
    if (!selectedCategory) return;
    setLoading(true);
    setError(null);
    try {
      const updateData: UpdateCategoryDto = {
        id: selectedCategory.id,
        name: selectedCategory.name,
      };
      const response = await CategoryService.updateCategory(
        selectedCategory.id,
        updateData
      );
      if (response.success && response.data) {
        await fetchCategories(); // Refresh category list
        setIsEditDialogOpen(false);
        setSelectedCategory(null);
      } else {
        setError(response.message || "Failed to update category");
      }
    } catch (err) {
      setError("Failed to update category");
      console.error("Error updating category:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setLoading(true);
    setError(null);
    try {
      const response = await CategoryService.deleteCategory(id);
      if (response.success) {
        await fetchCategories(); // Refresh category list
      } else {
        setError(response.error || "Failed to delete category");
      }
    } catch (err) {
      setError("Failed to delete category");
      console.error("Error deleting category:", err);
    } finally {
      setLoading(false);
    }
  };

  // Open edit dialog with selected category data
  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Category Management</CardTitle>
              <CardDescription>View and manage categories</CardDescription>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newCategory.name}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter category name"
                      />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                    <Button onClick={handleAddCategory} disabled={loading}>
                      {loading ? "Adding..." : "Add Category"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-gray-500">Loading categories...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && categories.length === 0 && (
            <p className="text-gray-500">No categories found.</p>
          )}
          {!loading && !error && categories.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedCategory.name}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter category name"
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}
              <Button onClick={handleEditCategory} disabled={loading}>
                {loading ? "Updating..." : "Update Category"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesTab;
