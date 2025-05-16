import ProductCard from "@/components/shared/ProductCard";
import { Chair } from "@/components/shared/product";
import Container from "@/components/ui/Container";
export default function Home() {
  const products = [
    {
      id: 1,
      slug: "test",
      name: "test",
      price: 100,
      description: "test test test",
      mainImageUrl: Chair,
      hoverImageUrl: Chair,
    },
    {
      id: 2,
      slug: "test2",
      name: "test2",
      price: 500,
      description: "test test test22",
      mainImageUrl: Chair,
      hoverImageUrl: Chair,
    },
    {
      id: 3,
      slug: "test3",
      name: "test3",
      price: 40,
      description: "test 333",
      mainImageUrl: Chair,
      hoverImageUrl: Chair,
    },
    {
      id: 4,
      slug: "test4",
      name: "test4",
      price: 90,
      description: "test 444",
      mainImageUrl: Chair,
      hoverImageUrl: Chair,
    },
  ];
  return (
      <Container>
        <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              mainImageUrl={product.mainImageUrl}
              hoverImageUrl={product.mainImageUrl}
              description={product.description}
            />
          ))}
        </div>
      </Container>
  );
}
