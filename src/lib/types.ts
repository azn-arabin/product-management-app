// API Types
export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface AuthResponse {
  token: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  images: string[];
  price: number;
  categoryId: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  images?: string[];
  price?: number;
  categoryId?: string;
}

export interface ProductsQueryParams {
  offset?: number;
  limit?: number;
  categoryId?: string;
}

export interface SearchQueryParams {
  searchedText: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  images: string[];
}

export type ApiError = {
  data?: {
    message?: string;
  };
};
