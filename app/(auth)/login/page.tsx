"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      console.log("Login data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Login successful", {
        description: "Welcome back to Sundoritto",
        duration: 3000,
        richColors: true,
      });
      // router.push('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed", {
        description: "Please try again",
        duration: 3000,
        richColors: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-4xl bg-white border border-primary/20 rounded-lg overflow-hidden flex transform transition-all duration-300 ">
        {/* Image Side */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="h-full w-full bg-gradient-to-b from-transparent to-black/30 flex items-end p-8">
            <h2 className="text-white text-2xl font-bold">
              সৌন্দর্য যত্নের জগতে স্বাগতম
            </h2>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            লগইন করুন
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ইমেইল ঠিকানা
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "ইমেইল ঠিকানা আবশ্যক",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "সঠিক ইমেইল ঠিকানা লিখুন",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 hover:border-primary focus:border-primary ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } bg-gray-50 text-gray-800 placeholder-gray-400`}
                placeholder="আপনার ইমেইল ঠিকানা লিখুন"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "পাসওয়ার্ড আবশ্যক",
                    minLength: {
                      value: 6,
                      message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                    },
                  })}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200 hover:border-primary focus:border-primary ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 text-gray-800 placeholder-gray-400`}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-0 hover:border-primary focus:border-primary"
                />
                <span className="ml-2 text-sm text-gray-700">
                  আমাকে মনে রাখুন
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-pink-600 hover:text-pink-800 transition-colors"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
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
                  লগইন করা হচ্ছে...
                </div>
              ) : (
                <>
                  <Lock className="h-5 w-5 inline-block mr-2" />
                  লগইন করুন
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              নতুন ব্যবহারকারী?{" "}
              <Link
                href="/register"
                className="font-medium text-pink-600 hover:text-pink-800 transition-colors"
              >
                এখনই রেজিস্টার করুন
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              ডেমো অ্যাকাউন্ট:
            </h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>
                <strong>গ্রাহক:</strong> customer@demo.com / password123
                <button
                  type="button"
                  onClick={() => {
                    setValue("email", "customer@demo.com");
                    setValue("password", "password123");
                  }}
                  className="ml-2 text-pink-600 hover:text-pink-800 underline"
                >
                  ব্যবহার করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
