import ProductCard from "@/components/frontend/ProductCard";
import CategoriesWiseProduct from "@/constant/DummyCategoriesWiseProduct";
import { Product } from "@/lip/types/product";
import Image from "next/image";
import Link from "next/link";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Beauty Care Categories
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Explore our range of beauty care products
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {CategoriesWiseProduct.map((category) => (
          <section key={category.slug} className="mb-12">
            {/* Category Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {category.category}
              </h2>
              {category.banner && (
                <div className="relative w-full h-48 mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={category.banner}
                    alt={`${category.category} banner`}
                    className="object-cover "
                    sizes="(max-width: 768px) 100vw, 1200px"
                    objectFit="cover"
                    width={1351}
                    height={500}
                    unoptimized
                  />
                </div>
              )}
              <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-600">
                  {category.products.length} products available
                </p>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </Link>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.products.map((product: Product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
