"use client";

import PageHeader from "@/components/shared/PageHeader";
import {
  ArrowRight,
  Minus,
  Plus,
  Shield,
  ShoppingBag,
  Tag,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "ময়শ্চারাইজিং ক্রিম",
      price: 1200,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1170&auto=format&fit=crop",
      variant: "50ml",
      category: "স্কিন কেয়ার",
    },
    {
      id: 2,
      name: "ফেসিয়াল সিরাম",
      price: 2500,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1170&auto=format&fit=crop",
      variant: "30ml",
      category: "স্কিন কেয়ার",
    },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleIncreaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setPromoApplied(false);
    setPromoCode("");
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save20") {
      setPromoApplied(true);
    }
  };

  const calculateSummary = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shipping = subtotal > 500 ? 0 : 29.99;
    const discount = promoApplied ? subtotal * 0.2 : 0;
    const tax = 0;
    const shippingCharge = 20;
    const total = subtotal - discount + shipping + tax + shippingCharge;

    return { subtotal, shipping, tax, discount, total };
  };

  const summary = calculateSummary();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-10 shadow-lg">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              আপনার কার্ট খালি আছে
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              আপনার কার্টে কোনো পণ্য যোগ করা হয়নি। শপিং শুরু করুন!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-5 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors"
            >
              পণ্য দেখুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 py-10 sm:py-16 lg:py-20">
      <PageHeader />

      <div className="container mx-auto pt-6 sm:pt-8 lg:pt-10">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">
              🛍️ আপনার কার্ট
            </h1>
            <p className="text-gray-500 mt-2">
              {cartItems.length} টি পণ্য আপনার কার্টে
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 font-medium text-sm"
            >
              সব পণ্য মুছুন
            </button>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white/70 backdrop-blur-lg border border-pink-100 rounded-2xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-pink-100">
                <h2 className="text-lg font-semibold text-gray-800">
                  কার্টের পণ্য
                </h2>
              </div>
              <div className="divide-y divide-pink-100 flex flex-col gap-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex items-center hover:shadow-xl transition"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg border border-pink-100"
                      />
                    </div>
                    {/* Product Details */}
                    <div className="flex-1 ml-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.name}
                          </h3>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                            {item.variant && (
                              <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                                {item.variant}
                              </span>
                            )}
                            {item.category && (
                              <span>বিভাগ: {item.category}</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-primary hover:text-primary-foreground"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-gray-200 rounded-full">
                            <button
                              onClick={() => handleDecreaseQuantity(item.id)}
                              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-4 py-2 font-medium min-w-[3rem] text-center text-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.id)}
                              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-md font-bold text-gray-900">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            ৳{item.price.toLocaleString()} প্রতিটি
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6 bg-white/70 backdrop-blur-lg border border-pink-100 rounded-2xl p-6 shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  প্রোমো কোড
                </h3>
              </div>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="প্রোমো কোড লিখুন (যেমন: SAVE20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                  className="flex-1 px-4 text-black py-3 border border-gray-200 rounded-lg  focus:border-transparent disabled:bg-gray-100"
                />
                <button
                  onClick={applyPromoCode}
                  disabled={promoApplied || !promoCode}
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {promoApplied ? "প্রয়োগ হয়েছে" : "প্রয়োগ করুন"}
                </button>
              </div>
              {promoApplied && (
                <div className="mt-3 text-green-600 text-sm font-medium">
                  ✓ প্রোমো কোড &quot;SAVE20&quot; প্রয়োগ হয়েছে - ২০% ছাড়!
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 shadow-xl text-white sticky top-8">
              <h2 className="text-lg font-semibold mb-6">অর্ডার সারাংশ</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg font-medium">
                  <span>মোট পণ্য ({cartItems.length} টি)</span>
                  <span>৳{summary.subtotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-200">
                    <span>ছাড় (২০%)</span>
                    <span>-৳{summary.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-200">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    শিপিং
                  </span>
                  <span>
                    {summary.shipping === 0
                      ? "ফ্রি"
                      : `৳${summary.shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="border-t border-pink-200 pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>মোট মূল্য</span>
                    <span>৳{summary.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50/20 rounded-lg p-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-100">
                    <Shield className="w-4 h-4 mr-2 text-green-300" />
                    SSL এনক্রিপশন সহ নিরাপদ চেকআউট
                  </div>
                  <div className="flex items-center text-sm text-gray-100">
                    <Truck className="w-4 h-4 mr-2 text-blue-300" />
                    ৳৫০০ এর বেশি অর্ডারে ফ্রি শিপিং
                  </div>
                </div>
              </div>
              <button className="w-full bg-white text-pink-600 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 group">
                <span>চেকআউট করুন</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#"
                className="w-full mt-3 text-sm font-medium text-pink-100 hover:text-pink-300 flex items-center justify-center"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                শপিং চালিয়ে যান
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
