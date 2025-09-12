"use client";

import Banner from "@/components/frontend/Banner";
import BrandCard from "@/components/frontend/BrandCard";
import CategoryCard from "@/components/frontend/CategoryCard";
import FeaturedProducts from "@/components/frontend/FeaturedProducts";
import ServicesSection from "@/components/frontend/ServicesSection";
import TestimonialsSection from "@/components/frontend/TestimonialsSection";
import { brands } from "@/constant/DummayBrand";
import { categories } from "@/constant/DummyCategory";
import Button from "@/lip/ui/Button";
import Image from "next/image";

// Define BackgroundStyle type for valid background classes
type BackgroundStyle =
  | "bg-white"
  | "bg-gray-100"
  | "bg-gradient-to-r from-pink-50 to-blue-50";

// Utility function to cycle through background styles
const getSectionBackground = (index: number): BackgroundStyle => {
  const backgrounds: BackgroundStyle[] = [
    "bg-white",
    "bg-gray-100",
    "bg-gradient-to-r from-pink-50 to-blue-50",
  ];
  return backgrounds[index % backgrounds.length];
};

const Home = () => {
  // Define sections with their components and props
  const sections = [
    { component: <Banner />, props: {} },
    { component: <FeaturedProducts />, props: {} },
    {
      component: (
        <section className="container mx-auto px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ক্যাটাগরি সমূহ
            </h2>
            <p className="text-gray-600">
              আপনার প্রয়োজনীয় পণ্যের ক্যাটাগরি খুঁজে নিন
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      ),
      props: {},
    },
    { component: <ServicesSection />, props: {} },
    {
      component: (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                জনপ্রিয় ব্র্যান্ড
              </h2>
              <p className="text-gray-600">
                আমাদের সাথে যুক্ত নামী ব্র্যান্ডসমূহ
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {brands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </section>
      ),
      props: {},
    },
    {
      component: <TestimonialsSection />,
      props: {},
    },
    {
      component: (
        <section className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 opacity-30">
            <Image
              src="https://picsum.photos/seed/beauty-newsletter/1920/1080.jpg"
              alt="Beauty Newsletter Background"
              className="w-full h-full object-cover"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              {/* Icon Container */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-8 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                এক্সক্লুসিভ অফারের জন্য সাবস্ক্রাইব করুন
              </h2>

              {/* Subheading */}
              <p className="text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                আমাদের নিউজলেটার সাবস্ক্রাইব করে প্রথমে জানুন নতুন পণ্য, বিশেষ
                ছাড় এবং অনন্য অফারের খবর।
              </p>

              {/* Form */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল এড্রেস"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none  bg-white/90 backdrop-blur-sm shadow-lg"
                />

                <Button
                  variant="outline"
                  className="px-6 py-4 rounded-lg bg-primary hover:bg-pink-700 text-white border-none font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  সাবস্ক্রাইব করুন
                </Button>
              </div>

              {/* Trust Badge */}
              <p className="text-sm text-white/70 mt-4">
                আমরা আপনার গোপনীয়তা সম্মান করি • কখনও স্প্যাম পাঠাবো না
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-10 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
          </div>
        </section>
      ),
      propos: {},
    },
  ];

  return (
    // <div className="bg-gray-100 text-black">
    //   <Banner />
    //   <FeaturedProducts />

    //   <section className="container mx-auto px-6 lg:px-8 py-12">
    //     <div className="text-center mb-12">
    //       <h2 className="text-3xl font-bold text-gray-900 mb-4">
    //         ক্যাটাগরি সমূহ
    //       </h2>
    //       <p className="text-gray-600">
    //         আপনার প্রয়োজনীয় পণ্যের ক্যাটাগরি খুঁজে নিন
    //       </p>
    //     </div>
    //     <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-6 gap-6">
    //       {categories.map((category) => (
    //         <CategoryCard key={category.id} category={category} />
    //       ))}
    //     </div>
    //   </section>

    //   <ServicesSection />

    //   <section className="py-16 bg-white">
    //     <div className="container mx-auto px-6">
    //       <div className="text-center mb-12">
    //         <h2 className="text-3xl font-bold text-gray-900 mb-4">
    //           জনপ্রিয় ব্র্যান্ড
    //         </h2>
    //         <p className="text-gray-600">
    //           আমাদের সাথে যুক্ত নামী ব্র্যান্ডসমূহ
    //         </p>
    //       </div>

    //       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    //         {brands.map((brand) => (
    //           <BrandCard key={brand.id} brand={brand} />
    //         ))}
    //       </div>
    //     </div>
    //   </section>
    // </div>

    <div className="text-black">
      {sections.map((section, index) => (
        <div key={index} className={getSectionBackground(index)}>
          {section.component}
        </div>
      ))}
    </div>
  );
};

export default Home;
