"üse client"

import { useState } from "react";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems = [
    { label: "হোম", href: "/" },
    { label: "পণ্য", href: "/products" },
    { label: "ক্যাটাগরি", href: "/categories" },
    { label: "অফার", href: "/offers" },
    { label: "যোগাযোগ", href: "/contact" },
  ];

  // Placeholder for cart item count (can be replaced with dynamic state)
  const cartItemCount = 3;

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="relative w-full">
        {/* Header Content */}
        <div className="relative container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <Link href="/" className="flex items-center space-x-2">
              <span>ই-শপ</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* E-commerce Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
              className="text-white/90 hover:text-white p-2 transition-colors duration-200"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon with Badge */}
            <a
              href="/cart"
              className="relative text-white/90 hover:text-white p-2 transition-colors duration-200"
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </a>

            {/* User Account Icon */}
            <a
              href="/account"
              className="text-white/90 hover:text-white p-2 transition-colors duration-200"
              aria-label="User account"
            >
              <User className="w-5 h-5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu9"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md py-4 px-6 border-t border-white/10">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block py-2 text-white/90 hover:text-white transition-colors duration-200 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {/* Mobile E-commerce Actions */}
            <div className="mt-4 space-y-2">
              <a
                href="/cart"
                className="flex items-center space-x-2 py-2 text-white/90 hover:text-white transition-colors duration-200 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>কার্ট ({cartItemCount})</span>
              </a>
              <a
                href="/account"
                className="flex items-center space-x-2 py-2 text-white/90 hover:text-white transition-colors duration-200 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>অ্যাকাউন্ট</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        header {
          height: 80px;
        }
        @supports (backdrop-filter: blur(10px)) {
          header {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
