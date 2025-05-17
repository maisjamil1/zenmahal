import { create } from "zustand";
import { Category, Product, SearchParams } from "@/lib/api/types";
import { productService } from "@/lib/api/productService";
import { updateUrlWithSearchParams } from "@/lib/utils/searchParamsUtils";

interface SearchState {
  // Search parameters
  searchParams: SearchParams;
  // Results
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  // Price range
  minPrice: number;
  maxPrice: number;
  // Actions
  setSearchTerm: (term: string) => void;
  setSearchParamsFromUrl: (params: SearchParams) => void;
  setCategory: (categorySlug: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  resetFilters: () => void;
  searchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const useSearchStore = create<SearchState>()((set, get) => ({
  // Initial state
  searchParams: {
    title: "",
    categorySlug: "",
    price_min: 0,
    price_max: 10000,
    limit: 10,
    offset: 0
  },
  products: [],
  categories: [],
  isLoading: false,
  currentPage: 1,
  itemsPerPage: 10,
  minPrice: 0,
  maxPrice: 10000,

  // Actions
  setSearchTerm: (term: string) => {
    const newParams = {
      ...get().searchParams,
      title: term
    };
    set(state => ({
      searchParams: newParams
    }));
    // Update URL
    if (typeof window !== 'undefined') {
      const { updateUrlWithSearchParams } = require('@/lib/utils/searchParamsUtils');
      updateUrlWithSearchParams(newParams);
    }
  },
  
  // Set search params from URL
  setSearchParamsFromUrl: (params: SearchParams) => {
    const currentPage = params.offset !== undefined && params.limit !== undefined
      ? Math.floor(params.offset / params.limit) + 1
      : 1;
      
    set({
      searchParams: params,
      currentPage,
      minPrice: params.price_min !== undefined ? params.price_min : 0,
      maxPrice: params.price_max !== undefined ? params.price_max : 10000,
      itemsPerPage: params.limit || 10
    });
  },

  setCategory: (categorySlug: string) => {
    const newParams = {
      ...get().searchParams,
      categorySlug
    };
    set(state => ({
      searchParams: newParams
    }));
    // Update URL
    if (typeof window !== 'undefined') {
      const { updateUrlWithSearchParams } = require('@/lib/utils/searchParamsUtils');
      updateUrlWithSearchParams(newParams);
    }
  },

  setPriceRange: (min: number, max: number) => {
    const newParams = {
      ...get().searchParams,
      price_min: min,
      price_max: max
    };
    set(state => ({
      searchParams: newParams,
      minPrice: min,
      maxPrice: max
    }));
    // Update URL
    if (typeof window !== 'undefined') {
      const { updateUrlWithSearchParams } = require('@/lib/utils/searchParamsUtils');
      updateUrlWithSearchParams(newParams);
    }
  },

  setPage: (page: number) => {
    const { itemsPerPage } = get();
    const newOffset = (page - 1) * itemsPerPage;
    const newParams = {
      ...get().searchParams,
      offset: newOffset
    };
    
    set(state => ({
      currentPage: page,
      searchParams: newParams
    }));
    
    // Update URL
    if (typeof window !== 'undefined') {
      const { updateUrlWithSearchParams } = require('@/lib/utils/searchParamsUtils');
      updateUrlWithSearchParams(newParams);
    }
  },

  setItemsPerPage: (items: number) => {
    const { currentPage } = get();
    const newOffset = (currentPage - 1) * items;
    const newParams = {
      ...get().searchParams,
      limit: items,
      offset: newOffset
    };
    
    set(state => ({
      itemsPerPage: items,
      searchParams: newParams
    }));
    
    // Update URL
    if (typeof window !== 'undefined') {
      const { updateUrlWithSearchParams } = require('@/lib/utils/searchParamsUtils');
      updateUrlWithSearchParams(newParams);
    }
  },

  resetFilters: () => {
    const newParams = {
      title: "",
      categorySlug: "",
      price_min: 0,
      price_max: 10000,
      limit: get().itemsPerPage,
      offset: 0
    };
    
    set({
      searchParams: newParams,
      currentPage: 1,
      minPrice: 0,
      maxPrice: 10000
    });
    
    // Update URL
    if (typeof window !== 'undefined') {
      const { updateUrlWithSearchParams } = require('@/lib/utils/searchParamsUtils');
      updateUrlWithSearchParams(newParams);
    }
  },

  searchProducts: async () => {
    set({ isLoading: true });
    try {
      const { searchParams } = get();
      const products = await productService.searchProducts(searchParams);
      
      // If we get no products and have filters applied, try a broader search
      if (products.length === 0 && 
          (searchParams.title || searchParams.categorySlug || 
           searchParams.price_min !== 0 || searchParams.price_max !== 10000)) {
        console.log('No products found with current filters, trying broader search...');
        // Keep the search as is - the user might want to see that there are no results
      }
      
      set({ products, isLoading: false });
    } catch (error) {
      console.error("Error searching products:", error);
      set({ isLoading: false, products: [] });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await productService.getCategories();
      set({ categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
}));
