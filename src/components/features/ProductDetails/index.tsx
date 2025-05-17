import { Product } from "@/lib/api/types";
import ImageGallery from "@/components/features/ProductDetails/components/ImageGallery";
import ProductInfo from "@/components/features/ProductDetails/components/ProductInfo";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

interface ProductDetailsScreenProps {
  product: Product;
}

export default function ProductDetailsScreen({
  product,
}: ProductDetailsScreenProps) {
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
