import { productService } from "@/lib/api/productService";
import ProductDetailsScreen from "@/components/features/ProductDetails";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const product = await productService.getProductById(params.id);

    if (!product) {
      return {
        title: "Product Not Found - ZenMahal",
        description: "The requested product could not be found.",
      };
    }

    return {
      title: `${product.title} - ZenMahal`,
      description: product.description.substring(0, 160),
      openGraph: {
        images: [product.images[0]],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found - ZenMahal",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductPage({ params }) {
  const product = await productService.getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsScreen product={product} />;
}
