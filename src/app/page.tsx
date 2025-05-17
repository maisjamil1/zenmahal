import Container from "@/components/ui/Container";
import HomePage from "@/components/features/HomePage";
import Offers from "@/components/features/HomePage/components/Offers";
export default function Home() {
  return (
    <>
      <HomePage />
      <Offers />
      <Container>
        <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
          {/*{products.map((product) => (*/}
          {/*  <ProductCard*/}
          {/*    key={product.id}*/}
          {/*    id={product.id}*/}
          {/*    slug={product.slug}*/}
          {/*    name={product.name}*/}
          {/*    price={product.price}*/}
          {/*    mainImageUrl={product.mainImageUrl}*/}
          {/*    hoverImageUrl={product.mainImageUrl}*/}
          {/*    description={product.description}*/}
          {/*  />*/}
          {/*))}*/}
        </div>
      </Container>
    </>
  );
}
