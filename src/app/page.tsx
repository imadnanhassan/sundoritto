"use client";

import React from "react";
import Banner from "@/components/ui/Banner";
import Header from "@/components/shared/Header";

const Home = () => {
  return (
    <div className=" bg-gray-100">
      <Header />
      <Banner />



     
      <footer className="py-10">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Sundoritto. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
