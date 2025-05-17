"use client";

import { Product } from "@/lib/api/types";
import AddToCartHandler from "@/components/features/ShoppingCart/components/AddToCartHandler";
import {Button} from "@/components/ui/button";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="w-full">
      {/* Category */}
      <div className="mb-2">
        <span className="text-sm text-gray-500 uppercase">{product.category.name}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>

      {/* Price */}
      <div className="text-xl md:text-2xl font-semibold mb-4">${product.price}</div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Add to Cart Button */}
      <div className="mb-6">
        <AddToCartHandler
          data={{
            id: product.id.toString(),
            slug: product.slug,
            name: product.title,
            price: product.price,
            mainImageUrl: product.images && product.images.length > 0 ? product.images[0] : "/product-placeholder.png",
            hoverImageUrl: product.images && product.images.length > 1 ? product.images[1] : undefined,
            description: product.description
          }}
          TriggerBtn={({ onClick }) => (
            <Button
              onClick={onClick}
              className={"w-full md:w-auto py-3 px-6 rounded-md cursor-pointer transition-colors"}
              // className="hover:bg-opacity-90 transition-colors"
            >
              Add to Cart

            </Button>
          )}
        />
      </div>

      {/* Product Details */}
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-medium mb-4">Product Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">SKU</h3>
            <p>{product.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Category</h3>
            <p>{product.category.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Added</h3>
            <p>{new Date(product.creationAt).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
            <p>{new Date(product.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
