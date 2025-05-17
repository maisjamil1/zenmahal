import { categoryService } from "@/lib/api/categoryService";
import HomeScreen from "@/components/features/HomePage";

export const metadata = {
  title: "ZenMahal - Home",
  description: "Discover our collection of products",
};

export default async function Home() {
  const categories = await categoryService.getAllCategories();

  return <HomeScreen categories={categories} />;
}
