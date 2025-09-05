"use client";

import React from "react";
import Banner from "@/components/frontend/Banner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className=" bg-gray-100 text-black">
      <Banner />
      

      {/* Featured Products */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))} */}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors duration-200 inline-flex items-center space-x-2">
                <span>সব পণ্য দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ক্যাটাগরি সমূহ
            </h2>
            <p className="text-gray-600">
              আপনার প্রয়োজনীয় পণ্যের ক্যাটাগরি খুঁজে নিন
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))} */}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              আমাদের সেবাসমূহ
            </h2>
            <p className="text-gray-600">কেন আমাদের সাথে কেনাকাটা করবেন</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))} */}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-white">
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
            {/* {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))} */}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              গ্রাহক মতামত
            </h2>
            <p className="text-gray-600">আমাদের সন্তুষ্ট গ্রাহকদের কথা শুনুন</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))} */}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            নিউজলেটার সাবস্ক্রাইব করুন
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            সর্বশেষ অফার এবং নতুন পণ্যের খবর পেতে আমাদের নিউজলেটার সাবস্ক্রাইব
            করুন
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="আপনার ইমেইল এড্রেস"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              সাবস্ক্রাইব
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
