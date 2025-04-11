import { useStore } from "@/contexts/storeContext";
import ProductService from "@/services/product.service";
import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "@/types/ProductService.types";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const ProductsTab = () => {
  const { products, fetchProducts } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<CreateProductDto>({
    name: "",
    description: "",
    price: 0,
    discountPrice: undefined,
    categoryName: "",

    imageUrl: "",
  });

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching products...");
        await fetchProducts();
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [ ]);

  // Handle adding a new product
  const handleAddProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductService.createProduct(newProduct);
      console.log(response, "response from create product");
      if (response.success && response.data) {
        await fetchProducts(); 
        setIsAddDialogOpen(false);
        setNewProduct({
          name: "",
          description: "",
          price: 0,
          discountPrice: undefined,
          categoryName: "",
          imageUrl: "",
        });
      } else {
        setError(response.message || "Failed to add product");
      }
    } catch (err) {
      setError("Failed to add product");
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a product
  const handleEditProduct = async () => {
    if (!selectedProduct) return;
    setLoading(true);
    setError(null);
    try {
      const updateData: UpdateProductDto = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        discountPrice: selectedProduct.discountPrice,
        categoryName: selectedProduct.categoryName,
        imageUrl: selectedProduct.imageUrl,
      };
      const response = await ProductService.updateProduct(
        selectedProduct.id,
        updateData
      );
      if (response.success) {
        setIsEditDialogOpen(false);
        await fetchProducts(); // Refresh product list
        setSelectedProduct(null);
      } else {
        setError(response.error || "Failed to update product");
      }
    } catch (err) {
      setError("Failed to update product");
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    setError(null);
    try {
      const response = await ProductService.deleteProduct(id);
      if (response.success) {
        await fetchProducts(); // Refresh product list
      } else {
        setError(response.message || "Failed to delete product");
      }
    } catch (err) {
      setError("Failed to delete product");
      console.error("Error deleting product:", err);
    } finally {
      setLoading(false);
    }
  };

  // Open edit dialog with selected product data
  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>View and manage inventory</CardDescription>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: parseFloat(e.target.value) || 0,
                          })
                        }
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discountPrice">Discount Price</Label>
                      <Input
                        id="discountPrice"
                        type="number"
                        value={newProduct.discountPrice || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            discountPrice: e.target.value
                              ? parseFloat(e.target.value)
                              : undefined,
                          })
                        }
                        placeholder="Enter discount price (optional)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoryName">Category Name</Label>
                      <Input
                        id="categoryName"
                        type="text"
                        value={newProduct.categoryName}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            categoryName: e.target.value,
                          })
                        }
                        placeholder="Enter category Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        value={newProduct.imageUrl}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            imageUrl: e.target.value,
                          })
                        }
                        placeholder="Enter image URL"
                      />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button onClick={handleAddProduct} disabled={loading}>
                      {loading ? "Adding..." : "Add Product"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-gray-500">Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && products.length === 0 && (
            <p className="text-gray-500">No products found.</p>
          )}
          {!loading && !error && products.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={
                            product.imageUrl || "https://via.placeholder.com/50"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.categoryName || "Unknown"}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {product.discountPrice ? (
                        <Badge variant="secondary">
                          ${product.discountPrice.toFixed(2)}
                        </Badge>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteProduct(product.id)}
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

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter description"
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Label htmlFor="edit-discountPrice">Discount Price</Label>
                <Input
                  id="edit-discountPrice"
                  type="number"
                  value={selectedProduct.discountPrice || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      discountPrice: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  placeholder="Enter discount price (optional)"
                />
              </div>
              <div>
                <Label htmlFor="edit-categoryName">Category Name</Label>
                <Input
                  id="edit-categoryName"
                  type="text"
                  value={selectedProduct.categoryName}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      categoryName: e.target.value,
                    })
                  }
                  placeholder="Enter category Name"
                />
              </div>
              <div>
                <Label htmlFor="edit-imageUrl">Image URL</Label>
                <Input
                  id="edit-imageUrl"
                  value={selectedProduct.imageUrl || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="Enter image URL"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button onClick={handleEditProduct} disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsTab;
