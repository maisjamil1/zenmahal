import { Category } from './types';

const API_URL = 'https://api.escuelajs.co/api/v1';

export const categoryService = {
  /**
   * Fetch all categories
   */
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_URL}/categories`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
  
  /**
   * Fetch a category by ID
   */
  async getCategoryById(id: number): Promise<Category | null> {
    try {
      const response = await fetch(`${API_URL}/categories/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch category: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      return null;
    }
  }
};
