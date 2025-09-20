"use client";

import { Bell, Menu } from "lucide-react";

import { useRouter } from "next/navigation";

export default function CustomerDashboard() {
  const router = useRouter();

  return (
    <div className=" ">

      {/* Main content */}
      <div className=" p-6 lg:p-8  w-full">
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-teal-600 to-teal-800 text-white px-6 py-4 rounded-lg shadow-lg sticky top-0 z-20 mb-6">
          <button className="p-2 rounded-lg bg-teal-700 hover:bg-teal-900 transition">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Customer Dashboard</h1>
          <div className="relative">
            <button
              className="p-2 rounded-full bg-teal-700 hover:bg-teal-900 transition"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6" />
            </button>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </div>
        </div>

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Orders",
              value: "128",
              gradient: "from-teal-500 to-teal-400",
            },
            {
              title: "Pending Orders",
              value: "12",
              gradient: "from-amber-500 to-amber-400",
            },
            {
              title: "Wishlist Items",
              value: "8",
              gradient: "from-pink-500 to-pink-400",
            },
            {
              title: "Wallet Balance",
              value: "৳ 8,540",
              gradient: "from-emerald-500 to-emerald-400",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${card.gradient} text-white p-6 rounded-xl shadow-lg backdrop-blur-md bg-opacity-80 hover:shadow-xl hover:scale-105 transition-all duration-300`}
            >
              <p className="text-sm opacity-90 font-medium">{card.title}</p>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Explore More Products
            </h2>
            <p className="text-gray-600 mt-1">
              Discover new items and add to your wishlist!
            </p>
          </div>
          <button
            onClick={() => router.push("/shop")}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200"
            aria-label="Shop now"
          >
            Shop Now
          </button>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-gray-600 font-medium">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-gray-600 font-medium">Date</th>
                  <th className="px-4 py-3 text-gray-600 font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-gray-600 font-medium">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-gray-600 font-medium">
                    Delivery
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "#00123",
                    date: "2025-09-12",
                    status: "Pending",
                    statusColor: "text-amber-500",
                    amount: "৳ 1,200",
                    delivery: "2025-09-15",
                  },
                  {
                    id: "#00122",
                    date: "2025-09-11",
                    status: "Delivered",
                    statusColor: "text-emerald-500",
                    amount: "৳ 2,500",
                    delivery: "2025-09-13",
                  },
                ].map((order, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${order.statusColor}`}
                    >
                      {order.status}
                    </td>
                    <td className="px-4 py-3">{order.amount}</td>
                    <td className="px-4 py-3">{order.delivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
