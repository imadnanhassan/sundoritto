import ProductCard from "@/components/frontend/ProductCard";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CategoriesWiseProduct from "@/constant/DummyCategoriesWiseProduct";
import { Product } from "@/lip/types/product";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Dynamic Metadata Generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const category = CategoriesWiseProduct.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    // Page Title
    title: `${category.category} - Your Store Name`,

    // Meta Description
    description: `Discover our premium ${category.category.toLowerCase()} collection. Shop from ${
      category.products.length
    } high-quality products at competitive prices.`,

    // Keywords for SEO
    keywords: [
      category.category.toLowerCase(),
      "online shopping",
      "premium products",
      "best deals",
      ...category.products.slice(0, 5).map((p) => p.name.toLowerCase()),
    ],

    // Open Graph Tags (for social media sharing)
    openGraph: {
      title: `${category.category} - Your Store Name`,
      description: `Explore our ${category.category.toLowerCase()} collection with ${
        category.products.length
      } amazing products`,
      url: `https://yourstore.com/categories/${slug}`,
      siteName: "Your Store Name",
      images: category.banner
        ? [
            {
              url: category.banner,
              width: 1200,
              height: 630,
              alt: `${category.category} collection banner`,
            },
          ]
        : [],
      locale: "en_US",
      type: "website",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: `${category.category} - Your Store Name`,
      description: `Shop ${category.category.toLowerCase()} products - ${
        category.products.length
      } items available`,
      images: category.banner ? [category.banner] : [],
      creator: "@yourtwitterhandle",
    },

    // Additional meta tags
    other: {
      "og:price:amount":
        category.products.length > 0
          ? category.products[0].price.toString()
          : "",
      "og:price:currency": "BDT",
      "product:category": category.category,
      "product:availability": "in stock",
    },

    // Robots meta
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Canonical URL
    alternates: {
      canonical: `https://yourstore.com/categories/${slug}`,
    },
  };
}

// Page Component
export default async function SingleCategories({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = CategoriesWiseProduct.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: category.category, href: `/categories/${category.slug}` },
  ];

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.category,
    description: `Browse our ${category.category.toLowerCase()} collection`,
    url: `https://yourstore.com/categories/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: category.products.length,
      itemListElement: category.products.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.description || `Quality ${product.name}`,
          image: product.thumbnail,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "BDT",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-3xl font-bold text-gray-900">
              {category.category}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Explore our range of {category.category.toLowerCase()} products
            </p>
            <Link
              href="/categories"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to All Categories
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <section>
            {category.banner && (
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6">
                <Image
                  src={category.banner}
                  alt={`${category.category} banner`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </div>
            )}

            <div className="mb-6">
              <p className="text-gray-600">
                {category.products.length} products available
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.products.map((product: Product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
