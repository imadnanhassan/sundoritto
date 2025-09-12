"use client";


import Link from "next/link";
import ProductCard from "@/components/frontend/ProductCard";
import CategoriesWiseProduct from "@/constant/DummyCategoriesWiseProduct";
import Image from "next/image";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { CategoryWiseProduct, Product } from "@/lip/types/product";


interface OfferType {
  OfferName: string;
  tag: string;
  banner: string;
  product?: Partial<Product>;
} 
const offerTypes: OfferType[] = [
  {
    OfferName: "Winter Offer",
    tag: "winter-offer",
    banner: "https://images.unsplash.com/photo-1516719920871-3d3e1e6077ef",
    product: {
      id: "1",
      name: "গ্লো রেডিয়েন্স ভিটামিন সি সেরাম",
      slug: "glow-radiance-vitamin-c-serum",
      description:
        "উন্নত ভিটামিন সি ফর্মুলা যা ত্বককে উজ্জ্বল করে এবং বয়সের ছাপ কমায়। প্রাকৃতিক উপাদান দিয়ে তৈরি।",
      shortDescription: "ভিটামিন সি সেরাম - ত্বকের উজ্জ্বলতার জন্য",
      sku: "GRC-001",
      price: 1200,
      salePrice: 950,
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1000&auto=format&fit=crop",
      ],
      thumbnail:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
      category: {
        id: "sk-1",
        name: "স্কিনকেয়ার",
        slug: "skincare",
        description: "ত্বকের যত্নের পণ্য",
        level: 1,
        isActive: true,
        sort: 1,
        createdAt: new Date("2024-01-01").toISOString(),
        updatedAt: new Date("2024-01-15").toISOString(),
      },
      categoryId: "sk-1",
      tags: ["serum", "vitamin-c", "anti-aging", "brightening", "winter-offer"],
      stock: 50,
      lowStockThreshold: 10,
      trackStock: true,
      manageStock: true,
      stockStatus: "in-stock",
      brand: "GlowCare",
      status: "published",
      isFeatured: true,
      isDigital: false,
      isActive: true,
      rating: 4.8,
      reviewsCount: 124,
      hasVariants: false,
      salesCount: 89,
      viewsCount: 2156,
      wishlistCount: 45,
      createdAt: new Date("2024-01-01").toISOString(),
      updatedAt: new Date("2024-01-15").toISOString(),
    },
  },
  {
    OfferName: "Summer Offer",
    tag: "summer-offer",
    banner: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    OfferName: "Eid Offer",
    tag: "eid-offer",
    banner: "https://images.unsplash.com/photo-1519996529931-28324d5a630e",
  },
];

const OffersPage= () => {
  // Collect all products from CategoriesWiseProduct
  const allProducts = CategoriesWiseProduct.flatMap(
    (cat: CategoryWiseProduct) => cat.products
  );

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Offers", href: "/offers" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl font-bold text-gray-900">Special Offers</h1>
          <p className="mt-2 text-sm text-gray-600">
            Discover our exclusive deals and seasonal promotions!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {offerTypes.map((offer) => {
          // Get products for the offer
          const offerProducts: Product[] = offer.product
            ? [{ ...offer.product } as Product]
            : allProducts.filter(
                (product) =>
                  product.tags.includes(offer.tag) &&
                  product.isActive &&
                  product.status === "published"
              );

          if (offerProducts.length === 0) return null;

          return (
            <section key={offer.tag} className="mb-12">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* Offer Banner */}
                <div className="relative h-48 sm:h-64">
                  <Image
                    src={offer.banner}
                    alt={`${offer.OfferName} Banner`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 1280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center justify-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {offer.OfferName}
                    </h2>
                  </div>
                </div>
                {/* Product Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {offerProducts.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <Link
                      href={`/offers/${offer.tag}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View All {offer.OfferName} Products →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default OffersPage;


