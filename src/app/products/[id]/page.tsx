"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/lib/api/types";
import { productService } from "@/lib/api/productService";
import ImageGallery from "@/components/features/ProductDetails/components/ImageGallery";
import ProductInfo from "@/components/features/ProductDetails/components/ProductInfo";
import ImageGallerySkeleton from "@/components/features/ProductDetails/components/ImageGallerySkeleton";
import ProductInfoSkeleton from "@/components/features/ProductDetails/components/ProductInfoSkeleton";
import BreadcrumbsSkeleton from "@/components/features/ProductDetails/components/BreadcrumbsSkeleton";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

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
        <BreadcrumbsSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ImageGallerySkeleton />
          </div>
          <div>
            <ProductInfoSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {error || "Product not found"}
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find the product you&apos;re looking for.
          </p>
          <Link
            href="/search"
            className="bg-lama text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Products", href: "/search" },
            { name: product.title },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ImageGallery images={product.images} productName={product.title} />
        </div>

        <div>
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
