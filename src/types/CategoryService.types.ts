export interface Category {
    id: number;
    name: string;
  }
  
  export type CreateCategoryDto = Omit<Category, "id">;
  export type UpdateCategoryDto = Category;
  