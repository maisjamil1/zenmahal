"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/lib/api/types";
import { productService } from "@/lib/api/productService";
import ImageGallery from "@/components/features/ProductDetails/components/ImageGallery";
import ProductInfo from "@/components/features/ProductDetails/components/ProductInfo";
import Link from "next/link";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productData = await productService.getProductById(productId);
        
        if (!productData) {
          setError("Product not found");
          return;
        }
        
        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lama mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-bold text-red-500 mb-4">{error || "Product not found"}</h1>
          <p className="text-gray-600 mb-6">We couldn't find the product you're looking for.</p>
          <Link href="/search" className="bg-lama text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-lama">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/search" className="text-gray-700 hover:text-lama">
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.title}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Image Gallery */}
        <div>
          <ImageGallery images={product.images} productName={product.title} />
        </div>

        {/* Right Column - Product Info */}
        <div>
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related Products Section - Could be added in the future */}
    </div>
  );
}
