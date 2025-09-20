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
      <main className=" max-h-screen">
        <div className="max-h-screen w-full h-full  py-20 px-4 ">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
