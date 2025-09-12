"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">{children}</div>
      <Footer />
    </>
  );
};

export default CustomerLayout;
