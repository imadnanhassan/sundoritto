import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lip/types/product";




const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300 p-4 text-center"
    >
      <div className="relative w-16 h-16 mx-auto mb-3 overflow-hidden rounded-full bg-gray-50 group-hover:bg-primary transition-colors duration-300">
        <Image
          src={category.icon || "/placeholder-icon.png"} // Fallback for missing icon
          alt={category.name}
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          fill
        />
      </div>

      <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-primary transition-colors duration-300">
        {category.name}
      </h3>

      <p className="text-xs text-gray-500">{category.productsCount} পণ্য</p>
    </Link>
  );
};

export default CategoryCard;