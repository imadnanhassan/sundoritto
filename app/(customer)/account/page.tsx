"use client";

import React, { useState } from "react";
import { Home, ShoppingCart, User, Settings, LogOut, Bell } from "lucide-react";
import Image from "next/image";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: <Home className="w-5 h-5" />, href: "#" },
  { name: "Orders", icon: <ShoppingCart className="w-5 h-5" />, href: "#" },
  { name: "Profile", icon: <User className="w-5 h-5" />, href: "#" },
  { name: "Settings", icon: <Settings className="w-5 h-5" />, href: "#" },
];

export default function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex gap-10 bg-gray-100 lg:py-20  max-w-7xl mx-auto">
      {/* Sidebar */}
      <div
        className={`bg-white w-64 border-r border-gray-200 p-4 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64 md:translate-x-0"
        } fixed md:static h-full `}
      >
        <div>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden">
              <Image
                src="/profile-placeholder.png"
                alt="Profile"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Welcome,</p>
              <p className="font-semibold text-gray-800">John Doe</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition-colors"
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>

        <button className="flex items-center p-2 mt-4 rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="ml-3">Logout</span>
        </button>
      </div>

      {/* Main content */}
      <div className="w-full flex flex-col transition-all duration-300">
        {/* Header */}

        <div className="flex justify-between items-center bg-white shadow-md px-6 py-4 border-b border-gray-200 sticky top-0 z-20">
          <button
            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="relative">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
          </div>
        </div>

        {/* Dashboard cards */}
        <div className="overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <p className="text-sm opacity-80">Total Orders</p>
              <p className="text-3xl font-bold mt-2">128</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <p className="text-sm opacity-80">Pending Orders</p>
              <p className="text-3xl font-bold mt-2">12</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <p className="text-sm opacity-80">Messages</p>
              <p className="text-3xl font-bold mt-2">5</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <p className="text-sm opacity-80">Balance</p>
              <p className="text-3xl font-bold mt-2">৳ 8,540</p>
            </div>
          </div>

          {/* Example content section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-gray-600">Order ID</th>
                    <th className="px-4 py-2 text-gray-600">Date</th>
                    <th className="px-4 py-2 text-gray-600">Status</th>
                    <th className="px-4 py-2 text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2">#00123</td>
                    <td className="px-4 py-2">2025-09-12</td>
                    <td className="px-4 py-2 text-yellow-500 font-semibold">
                      Pending
                    </td>
                    <td className="px-4 py-2">৳ 1,200</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2">#00122</td>
                    <td className="px-4 py-2">2025-09-11</td>
                    <td className="px-4 py-2 text-green-500 font-semibold">
                      Completed
                    </td>
                    <td className="px-4 py-2">৳ 2,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
