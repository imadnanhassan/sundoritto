"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Heart } from "lucide-react";
import { Headphones } from "lucide-react";
import { LogOut } from "lucide-react";
import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomerDashboard from "./account/page";

const navItems = [
  {
    name: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    href: "/user/account",
  },
  {
    name: "Orders",
    icon: <ShoppingCart className="w-5 h-5" />,
    href: "/user/orders",
  },
  {
    name: "Wishlist",
    icon: <Heart className="w-5 h-5" />,
    href: "/user/wishlist",
  },
  {
    name: "Profile",
    icon: <User className="w-5 h-5" />,
    href: "/user/profile",
  },
  {
    name: "Support",
    icon: <Headphones className="w-5 h-5" />,
    href: "/user/support",
  },
];

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    // Simulate logout logic
    router.push("/login");
  };
  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 font-inter  border-b-2 bg-gray-100">
        <div className="flex container mx-auto">
          <div
            className={`fixed inset-y-0 left-0 z-10 w-64 h-[600px] mt-8 rounded bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:static md:shadow-none border-r border-gray-200 flex flex-col justify-between p-6`}
            aria-hidden={!sidebarOpen}
          >
            <div>
              <div className="flex items-center mb-10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 p-0.5 overflow-hidden transition-transform hover:scale-105">
                  <Image
                    src="/profile-placeholder.png"
                    alt="Profile picture of John Doe"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 font-medium">Hello,</p>
                  <p className="text-lg font-semibold text-gray-800">
                    John Doe
                  </p>
                </div>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-all duration-200"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {item.icon}
                    <span className="ml-3 font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            ></div>
          )}

          <div className="flex-1">{children || <CustomerDashboard />}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerLayout;
