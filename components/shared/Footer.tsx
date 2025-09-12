import Link from "next/link";
import { CreditCard, Mail, MapPin, Phone, Shield, Truck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Sundoritto</h3>
            <p className="text-gray-600 mb-4">
              প্রিমিয়াম বিউটি ও লাইফস্টাইল পণ্যের জন্য আপনার এক স্টপ
              ডেস্টিনেশন।
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {/* Replace with your social icons */}
                <span>FB</span>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>IG</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">দ্রুত লিঙ্ক</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  হোম
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  শপ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  নতুন পণ্য
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  জনপ্রিয় পণ্য
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  অফার
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">গ্রাহক সেবা</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  যোগাযোগ করুন
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  সাধারণ প্রশ্ন
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  শিপিং পলিসি
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  রিটার্ন পলিসি
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-900 transition-colors"
                >
                  অর্ডার ট্র্যাক করুন
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start">
                <span className="mr-3">📍</span>
                123 বিউটি স্ট্রিট, ঢাকা, বাংলাদেশ
              </li>
              <li className="flex items-center">
                <span className="mr-3">📞</span>
                +880 1712-345678
              </li>
              <li className="flex items-center">
                <span className="mr-3">✉️</span>
                support@sundoritto.com
              </li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-content-center">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: "#EE1E7E20" }}
              >
                <Truck className="h-5 w-5" style={{ color: "#EE1E7E" }} />
              </div>
              <div>
                <h5 className="font-medium text-gray-900">Free Shipping</h5>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: "#EE1E7E20" }}
              >
                <Shield className="h-5 w-5" style={{ color: "#EE1E7E" }} />
              </div>
              <div>
                <h5 className="font-medium text-gray-900">Secure Payment</h5>
                <p className="text-sm text-gray-600">
                  100% secure transactions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: "#EE1E7E20" }}
              >
                <CreditCard className="h-5 w-5" style={{ color: "#EE1E7E" }} />
              </div>
              <div>
                <h5 className="font-medium text-gray-900">Easy Returns</h5>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                support@sundoritto.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                123 Commerce St, City, State 12345
              </span>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Payment Methods */}
          <div className="mb-6 md:mb-0">
            <p className="text-gray-600 mb-3">পেমেন্ট পদ্ধতি:</p>
            <div className="flex space-x-3 text-xl">
              <CreditCard className="text-gray-600" />
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Sundoritto. সর্বস্বত্ব সংরক্ষিত।
            </p>
            <div className="mt-2 space-x-4 text-sm text-gray-500">
              <Link href="#" className="hover:text-gray-800 transition-colors">
                প্রাইভেসি পলিসি
              </Link>
              <Link href="#" className="hover:text-gray-800 transition-colors">
                সার্ভিস শর্ত
              </Link>
              <Link href="#" className="hover:text-gray-800 transition-colors">
                কুকি পলিসি
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
