"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchStore } from "../store/searchStore";
import { urlToSearchParams } from "@/lib/utils/searchParamsUtils";

export default function SearchParamsInitializer() {
  const searchParams = useSearchParams();
  const { setSearchParamsFromUrl, searchProducts } = useSearchStore();
  
  // Initialize search params from URL on page load
  useEffect(() => {
    if (searchParams) {
      const params = urlToSearchParams(searchParams);
      if (Object.keys(params).length > 0) {
        setSearchParamsFromUrl(params);
        searchProducts();
      }
    }
  }, [searchParams, setSearchParamsFromUrl, searchProducts]);
  
  return null; // This component doesn't render anything
}
