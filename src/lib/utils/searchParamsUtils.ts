import { SearchParams } from "@/lib/api/types";

// Convert search params object to URLSearchParams
export const searchParamsToUrl = (params: SearchParams): URLSearchParams => {
  const urlParams = new URLSearchParams();
  
  if (params.title && params.title.trim() !== '') {
    urlParams.set('title', params.title);
  }
  
  if (params.categorySlug && params.categorySlug.trim() !== '') {
    urlParams.set('categorySlug', params.categorySlug);
  }
  
  if (params.price_min !== undefined && params.price_min > 0) {
    urlParams.set('price_min', params.price_min.toString());
  }
  
  if (params.price_max !== undefined && params.price_max < 10000) {
    urlParams.set('price_max', params.price_max.toString());
  }
  
  if (params.limit !== undefined && params.limit !== 10) {
    urlParams.set('limit', params.limit.toString());
  }
  
  if (params.offset !== undefined && params.offset > 0) {
    urlParams.set('offset', params.offset.toString());
  }
  
  return urlParams;
};

// Parse URL search params into SearchParams object
export const urlToSearchParams = (urlParams: URLSearchParams): SearchParams => {
  const params: SearchParams = {};
  
  const title = urlParams.get('title');
  if (title) {
    params.title = title;
  }
  
  const categorySlug = urlParams.get('categorySlug');
  if (categorySlug) {
    params.categorySlug = categorySlug;
  }
  
  const priceMin = urlParams.get('price_min');
  if (priceMin) {
    params.price_min = parseInt(priceMin, 10);
  }
  
  const priceMax = urlParams.get('price_max');
  if (priceMax) {
    params.price_max = parseInt(priceMax, 10);
  }
  
  const limit = urlParams.get('limit');
  if (limit) {
    params.limit = parseInt(limit, 10);
  }
  
  const offset = urlParams.get('offset');
  if (offset) {
    params.offset = parseInt(offset, 10);
  }
  
  return params;
};

// Update the URL with search params without causing a page reload
export const updateUrlWithSearchParams = (params: SearchParams) => {
  if (typeof window === 'undefined') return;
  
  const url = new URL(window.location.href);
  const urlParams = searchParamsToUrl(params);
  
  // Clear existing search params
  Array.from(url.searchParams.keys()).forEach(key => {
    url.searchParams.delete(key);
  });
  
  // Add new search params
  urlParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  
  // Update URL without reloading the page
  window.history.pushState({}, '', url.toString());
};
