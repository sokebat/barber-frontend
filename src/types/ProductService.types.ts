export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    imageUrl: string;
    categoryName: string;
  } 
  
  export type CreateProductDto = Omit<Product, "id">;
  export type UpdateProductDto = Product;
  