import { Category } from "@/lib/api/types";
import CategoryCard from "./CategoryCard";

interface ServerCategoriesProps {
  categories: Category[];
}

export default function ServerCategories({
  categories,
}: ServerCategoriesProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
