"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" auth-gradient">
      <Header />
      <main className="flex flex-col items-center justify-center py-20 px-4 relative">
        <div className="w-full h-full">{children}</div>
      </main>
      <Footer/>
    </div>
  );
}
