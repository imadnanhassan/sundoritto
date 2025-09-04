"use client";
import Header from "@/components/shared/Header";

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <footer className="py-10">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Sundoritto. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default FrontendLayout;
