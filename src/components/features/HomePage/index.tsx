import BannerWrapper from "@/components/features/HomePage/components/BannerWrapper";
import Container from "@/components/ui/Container";
import Offers from "@/components/features/HomePage/components/Offers";
import ServerCategories from "@/components/features/HomePage/components/ServerCategories";
import Searchbar from "@/components/features/HomePage/components/Searchbar";
import { Category } from "@/lib/api/types";
interface ServerCategoriesProps {
  categories: Category[];
}
export default async function HomeScreen({
  categories,
}: ServerCategoriesProps) {
  return (
    <>
      <Searchbar />
      <BannerWrapper />
      <Container>
        <Offers />
        <ServerCategories categories={categories} />
      </Container>
    </>
  );
}
