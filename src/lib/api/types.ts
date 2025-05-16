// Product and category types for the Platzi Fake Store API

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface SearchParams {
  title?: string;
  categorySlug?: string;
  price_min?: number;
  price_max?: number;
  limit?: number;
  offset?: number;
}
