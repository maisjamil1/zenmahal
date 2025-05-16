import axios from 'axios';
import { Category, Product, SearchParams } from './types';

const API_URL = 'https://api.escuelajs.co/api/v1';

export const productService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await axios.get<Category[]>(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Get a single product by ID
  getProductById: async (id: string | number): Promise<Product | null> => {
    try {
      const response = await axios.get<Product>(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return null;
    }
  },

  // Search products with filters
  searchProducts: async (params: SearchParams): Promise<Product[]> => {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (params.title) {
        queryParams.append('title', params.title);
      }
      
      if (params.categorySlug) {
        queryParams.append('categorySlug', params.categorySlug);
      }
      
      if (params.price_min !== undefined) {
        queryParams.append('price_min', params.price_min.toString());
      }
      
      if (params.price_max !== undefined) {
        queryParams.append('price_max', params.price_max.toString());
      }
      
      if (params.limit !== undefined) {
        queryParams.append('limit', params.limit.toString());
      }
      
      if (params.offset !== undefined) {
        queryParams.append('offset', params.offset.toString());
      }
      
      const response = await axios.get<Product[]>(`${API_URL}/products/?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },
};
