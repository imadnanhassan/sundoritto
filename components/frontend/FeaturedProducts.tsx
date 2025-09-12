import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ProductCard from './ProductCard';
import { products } from '@/constant/DummayProduct';


const FeaturedProducts = () => {


    const featuredProducts = products
      .filter((product) => product.isFeatured === true)
      .slice(0, 8);

  return (

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ফিচারড পণ্যসমূহ
            </h2>
            <p className="text-gray-600">
              আমাদের সেরা এবং জনপ্রিয় পণ্যগুলো দেখুন
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Show button only if there are featured products */}
          {featuredProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/products">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors duration-200 inline-flex items-center space-x-2">
                  <span>সব পণ্য দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          )}

          {/* Show message if no featured products */}
          {featuredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">কোন ফিচারড পণ্য পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      </section>
  );
};

export default FeaturedProducts;