"use client";

import { useState } from "react";
import { Star, LayoutGrid, List, Grid3X3 } from "lucide-react";
import ProductCard from "@/components/frontend/ProductCard";
import { products } from "@/constant/DummayProduct";

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 py-20">
        {/* Sidebar Filters */}
        <div className="bg-white text-background rounded-lg shadow-sm border border-primary-foreground p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Filters</h2>
            <button className="text-red-500 text-sm font-medium hover:underline">
              Clear All
            </button>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Categories</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> Skin Care
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> Body Care
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> Hair Care
                </label>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Brands</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> Nivea
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> L’Oreal
                </label>
              </li>
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Price Range</h3>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                defaultValue={0}
                className="w-20 border rounded px-2 py-1 text-sm"
              />
              <span>-</span>
              <input
                type="number"
                defaultValue={1000}
                className="w-20 border rounded px-2 py-1 text-sm"
              />
            </div>
            <input type="range" min="0" max="5000" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Minimum Rating</h3>
            <div className="space-y-1">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center text-sm">
                  <input type="radio" name="rating" className="mr-2" />
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2">& Up</span>
                </label>
              ))}
            </div>
          </div>

          {/* In Stock */}
          <div>
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" /> In Stock Only
            </label>
          </div>
        </div>

        {/* Products Area */}
        <div className="lg:col-span-3">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-6 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border rounded-md px-2 py-1 text-sm text-background">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 border rounded  ${
                  viewMode === "list"
                    ? "bg-primary"
                    : " bg-white text-background"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 border rounded ${
                  viewMode === "grid"
                    ? "bg-primary"
                    : " bg-white text-background"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`p-2 border rounded ${
                  viewMode === "compact"
                    ? "bg-primary"
                    : " bg-white text-background"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Products or Empty State */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border rounded-lg">
              <div className="text-5xl text-gray-400 mb-4">🔍</div>
              <p className="text-gray-700 font-medium">No products found</p>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
