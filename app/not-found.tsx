"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center ">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-4">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
