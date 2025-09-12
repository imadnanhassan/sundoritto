"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import ScrollToTop from "@/lip/ui/ScrollToTop";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ReactNode, useEffect, useState } from "react";

const FrontendLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  // Configure NProgress
  NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

  useEffect(() => {
    if (pathname !== currentPath) {
      NProgress.start();

      const spinnerDelay = setTimeout(() => setLoading(true), 100);

      const minLoadingTime = setTimeout(() => {
        setLoading(false);
        NProgress.done();
        setCurrentPath(pathname);
      }, 400);

      return () => {
        clearTimeout(spinnerDelay);
        clearTimeout(minLoadingTime);
      };
    }
  }, [pathname, currentPath]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      <Header />
      <main className="min-h-screen">
        {children}
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
};

export default FrontendLayout;
