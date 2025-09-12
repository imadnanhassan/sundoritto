import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  Home,
  Zap,
  Monitor,
  UserCircle,
} from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "হোম", href: "/" },
    { label: "পণ্য", href: "/products" },
    { label: "ক্যাটাগরি", href: "/categories" },
    { label: "অফার", href: "/offers" },
    { label: "যোগাযোগ", href: "/contact" },
  ];

  const bottomNavItems = [
    { id: "পণ্য", label: "পণ্য", icon: Zap, href: "/products" },
    { id: "ক্যাটাগরি", label: "ক্যাটাগরি", icon: Monitor, href: "/categories" },
    { id: "হোম", label: "হোম", icon: Home, href: "/" },
    { id: "যোগাযোগ", label: "যোগাযোগ", icon: UserCircle, href: "/contact" },
    { id: "account", label: "অ্যাকাউন্ট", icon: UserCircle, href: "/login" },
  ];

  const cartItemCount = 3;

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-30 h-16 border-b transition-all duration-700 ease-in-out ${
          isScrolled
            ? "bg-black/30 backdrop-blur-md border-white/10"
            : "bg-gradient-to-r from-primary to-primary-hover border-transparent"
        }`}
      >
        <div className="relative w-full">
          {/* Header Content */}
          <div className="relative container mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link href="/" className="inline-block">
                <div className="text-2xl font-bold">
                  <span className="text-white hover:text-primary-hover transition-colors duration-200">
                    সুন্দরিত্ত
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation Menu - Hidden on mobile */}
            <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium px-3 py-2 rounded hover:bg-white/10 hover:border-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2">
              {/* Search Icon */}
              <button
                className="text-white/90 hover:text-white p-2 hover:bg-white/10 rounded transition-colors duration-200"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Icon with Badge */}
              <Link
                href="/cart"
                className="relative text-white/90 hover:text-white p-2 hover:bg-white/10 rounded transition-colors duration-200"
                aria-label="View cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Account Icon */}
              <Link
                href="/login"
                className="text-white/90 hover:text-white p-2 hover:bg-white/10 rounded transition-colors duration-200"
                aria-label="User account"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-[#1a2332] py-4 px-4 border-t border-gray-700">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors duration-200 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobile E-commerce Actions */}
              <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                <Link
                  href="/cart"
                  className="flex items-center space-x-3 py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors duration-200 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>কার্ট ({cartItemCount})</span>
                </Link>
                <Link
                  href="/login"
                  className="flex items-center space-x-3 py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors duration-200 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>অ্যাকাউন্ট</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation - Star Tech Style */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a2332] border-t border-gray-700">
        <div className="grid grid-cols-5">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-gray-800"
                    : "text-white/70 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium text-center leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Header;
