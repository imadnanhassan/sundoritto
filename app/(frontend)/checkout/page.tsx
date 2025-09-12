"use client";

import type React from "react";
import { useState } from "react";
import { ArrowRight, MapPin, User, Truck } from "lucide-react";
import Image from "next/image";
import Input from "@/lip/ui/Input";
import Textarea from "@/lip/ui/Textarea";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant: string;
  category: string;
  location: string;
  shippingCharge: number;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  address: string;
  orderNotes: string;
  deliveryLocation: "Inside Dhaka" | "Outside Dhaka";
}

const CheckoutPage = () => {
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "ময়শ্চারাইজিং ক্রিম",
      price: 1200,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1170&auto=format&fit=crop",
      variant: "50ml",
      category: "স্কিন কেয়ার",
      location: "Inside Dhaka",
      shippingCharge: 60,
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
      location: "Outside Dhaka",
      shippingCharge: 120,
    },
  ]);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    address: "",
    orderNotes: "",
    deliveryLocation: "Inside Dhaka", // default
  });

  const [promoApplied] = useState(true);
  const [promoCode] = useState("SAVE20");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateSummary = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shipping = cartItems.reduce(
      (total, item) => total + item.shippingCharge * item.quantity,
      0
    );
    const discount = promoApplied ? subtotal * 0.2 : 0;
    const total = subtotal - discount + shipping;
    return { subtotal, shipping, discount, total };
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber || !formData.address) {
      alert("দয়া করে সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন।");
      return;
    }
    console.log("Order Submitted:", {
      ...formData,
      cartItems,
      summary: calculateSummary(),
    });
    alert("অর্ডার সফলভাবে জমা দেওয়া হয়েছে!");
  };

  const summary = calculateSummary();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-2">চেকআউট</h1>
          <p className="text-gray-600 font-light">
            আপনার অর্ডার সম্পূর্ণ করতে নিচের তথ্য পূরণ করুন
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Left Side: Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-medium text-gray-900">
                  শিপিং তথ্য
                </h2>
              </div>

              <div className="space-y-6">
                <Input
                  type="text"
                  name="fullName"
                  placeholder="আপনার পুরো নাম লিখুন"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  icon={<User size={18} />}
                  required
                  label="পুরো নাম"
                />

                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="যেমন: +8801234567890"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  label="ফোন নম্বর"
                />

                <Textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                  rows={4}
                  required
                  label="ঠিকানা"
                />

                <Textarea
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  placeholder="বিশেষ কোনো নির্দেশনা থাকলে এখানে লিখুন (ঐচ্ছিক)"
                  rows={4}
                  label="অতিরিক্ত নির্দেশনা"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 shadow-xl text-white sticky top-8">
              <h2 className="text-lg font-semibold mb-6">অর্ডার সারাংশ</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 pb-4 border-b border-pink-200 last:border-b-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-12 h-12 object-cover rounded-lg border border-pink-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {item.name} ({item.variant})
                      </p>
                      <p className="text-xs text-gray-200">
                        {item.quantity} টি
                      </p>
                      <p className="text-xs text-gray-200">
                        শিপিং: ৳
                        {(item.shippingCharge * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm font-bold">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}

                <div className="border-t border-pink-200 pt-4 space-y-2">
                  <div className="flex justify-between text-lg font-medium">
                    <span>সাবটোটাল</span>
                    <span>৳{summary.subtotal.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-200">
                      <span>ছাড় ({promoCode})</span>
                      <span>-৳{summary.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-200">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      শিপিং
                    </span>
                    <span>৳{summary.shipping.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-pink-200 pt-4 flex justify-between text-2xl font-bold">
                    <span>মোট মূল্য</span>
                    <span>৳{summary.total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  className="w-full mt-6 bg-white text-pink-600 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>অর্ডার নিশ্চিত করুন</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-200">
                    ক্যাশ অন ডেলিভারি • নিরাপদ পেমেন্ট
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
