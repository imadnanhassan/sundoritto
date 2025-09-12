"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  UserPlus,
  User,
  Mail,
  Lock,
  Phone,
  Camera,
} from "lucide-react";
import Image from "next/image";

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  profilePic?: File | null; // Optional
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      profilePic: null,
    },
    mode: "onChange",
  });

  const watchedPassword = watch("password");

  // Load saved password from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("generatedPassword");
    if (saved) setValue("password", saved);
  }, [setValue]);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      console.log("Registration data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Profile picture change handler
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePic", file); // set file in form
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Password generator function
  const generatePassword = (length = 12) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setValue("password", result);
    localStorage.setItem("generatedPassword", result);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-3xl bg-white border border-primary/20 rounded-lg overflow-hidden flex transform transition-all duration-300 flex-col p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </h2>

        {/* Profile Picture Upload */}
        
        <div className="flex justify-center mb-6">
          <label className="relative cursor-pointer">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100 hover:border-pink-600 transition-all">
              {previewImage ? (
                <Image
                  width={50}
                  height={50}
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              পূর্ণ নাম *
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("name", {
                  required: "নাম আবশ্যক",
                  minLength: {
                    value: 2,
                    message: "নাম কমপক্ষে ২ অক্ষরের হতে হবে",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message: "শুধুমাত্র বর্ণ এবং স্পেস ব্যবহার করুন",
                  },
                })}
                className={`w-full px-4 py-3 pl-12 border rounded-lg transition-all duration-200 hover:border-primary focus:border-primary ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } bg-gray-50 text-gray-800 placeholder-gray-400`}
                placeholder="আপনার পূর্ণ নাম লিখুন"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ইমেইল ঠিকানা *
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email", {
                  required: "ইমেইল ঠিকানা আবশ্যক",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "সঠিক ইমেইল ঠিকানা লিখুন",
                  },
                })}
                className={`w-full px-4 py-3 pl-12 border rounded-lg transition-all duration-200 hover:border-primary focus:border-primary ${
                  errors.email ? "border-primary" : "border-gray-300"
                } bg-gray-50 text-gray-800 placeholder-gray-400`}
                placeholder="আপনার ইমেইল ঠিকানা লিখুন"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              মোবাইল নম্বর *
            </label>
            <div className="relative">
              <input
                type="tel"
                {...register("phone", {
                  required: "মোবাইল নম্বর আবশ্যক",
                  pattern: {
                    value: /^(\+88)?[0-9]{11}$/,
                    message: "সঠিক বাংলাদেশী মোবাইল নম্বর লিখুন (০১৭XXXXXXXX)",
                  },
                })}
                className={`w-full px-4 py-3 pl-12 border rounded-lg transition-all duration-200 hover:border-primary focus:border-primary ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } bg-gray-50 text-gray-800 placeholder-gray-400`}
                placeholder="০১৭XXXXXXXX"
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              পাসওয়ার্ড *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "পাসওয়ার্ড আবশ্যক",
                  minLength: {
                    value: 8,
                    message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                    message:
                      "পাসওয়ার্ডে ছোট হাতের অক্ষর, বড় হাতের অক্ষর এবং সংখ্যা থাকতে হবে",
                  },
                })}
                className={`w-full px-4 py-3 pl-12 pr-28 border rounded-lg transition-all duration-200 hover:border-primary focus:border-primary ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } bg-gray-50 text-gray-800 placeholder-gray-400`}
                placeholder="একটি শক্তিশালী পাসওয়ার্ড তৈরি করুন"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => generatePassword(12)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
              >
                Generate
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
            <div className="mt-2 text-xs text-gray-600">
              পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে এবং ছোট হাতের অক্ষর, বড়
              হাতের অক্ষর ও সংখ্যা থাকতে হবে
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Generate button click করলে password auto fill হবে এবং browser এ
              save থাকবে
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              পাসওয়ার্ড নিশ্চিত করুন *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "পাসওয়ার্ড নিশ্চিত করুন",
                  validate: (value) =>
                    value === watchedPassword || "পাসওয়ার্ড মিল নেই",
                })}
                className={`w-full px-4 py-3 pl-12 pr-12 border rounded-lg transition-all duration-200 hover:border-primary focus:border-primary ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } bg-gray-50 text-gray-800 placeholder-gray-400`}
                placeholder="পাসওয়ার্ড পুনরায় লিখুন"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div>
            <label className="flex items-start">
              <input
                type="checkbox"
                {...register("agreeToTerms", {
                  required: "নিয়ম ও শর্তাবলী গ্রহণ করুন",
                })}
                className={`h-4 w-4 text-pink-600 border-gray-300 rounded mt-1 focus:ring-0 hover:border-primary focus:border-primary ${
                  errors.agreeToTerms ? "border-red-500" : ""
                }`}
              />
              <span className="ml-3 text-sm text-gray-700">
                আমি{" "}
                <Link
                  href="/terms"
                  className="text-pink-600 hover:text-pink-800 underline"
                >
                  নিয়ম ও শর্তাবলী
                </Link>{" "}
                এবং{" "}
                <Link
                  href="/privacy"
                  className="text-pink-600 hover:text-pink-800 underline"
                >
                  গোপনীয়তা নীতি
                </Link>{" "}
                পড়েছি এবং সম্মত আছি।
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !isValid}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isLoading || !isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                রেজিস্টার করা হচ্ছে...
              </div>
            ) : (
              <>
                <UserPlus className="h-5 w-5 inline-block mr-2" />
                রেজিস্টার করুন
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/login"
                className="font-medium text-pink-600 hover:text-pink-800 transition-colors"
              >
                লগইন করুন
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
