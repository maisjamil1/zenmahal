import { productService } from "@/lib/api/productService";
import ProductDetailsScreen from "@/components/features/ProductDetails";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
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
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;
  const product = await productService.getProductById(productId);

  if (!product) {
    notFound();
  }

  return (

      <ProductDetailsScreen product={product} />
  );
}
