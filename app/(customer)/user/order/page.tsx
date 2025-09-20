import { Bell } from "lucide-react";
import { Menu } from "lucide-react";
import React from "react";

const CustomerOrderPage = () => {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
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
    </div>
  );
};

export default CustomerOrderPage;
