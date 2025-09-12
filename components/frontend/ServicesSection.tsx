
import React from "react";
import {
  Truck,
  Shield,
  CreditCard,
  Clock,
  Users,
  Award,
  Headphones,
  RefreshCw,
} from "lucide-react";

// Define Service interface for type safety
interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Services data
const services: Service[] = [
  {
    icon: <Truck className="w-10 h-10" />,
    title: "ফ্রি হোম ডেলিভারি",
    description: "ঢাকার মধ্যে ২৪ ঘন্টায় এবং সারাদেশে ৪৮ ঘন্টায় ফ্রি ডেলিভারি",
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "১০০% অরিজিনাল পণ্য",
    description:
      "সকল পণ্য সরাসরি ব্র্যান্ড থেকে সংগ্রহ করা এবং সত্যতার নিশ্চয়তা",
  },
  {
    icon: <RefreshCw className="w-10 h-10" />,
    title: "৭ দিন রিটার্ন পলিসি",
    description: "কোন সমস্যা হলে ৭ দিনের মধ্যে সহজেই পণ্য ফেরত দিতে পারবেন",
  },
  {
    icon: <CreditCard className="w-10 h-10" />,
    title: "নিরাপদ পেমেন্ট",
    description: "বিকাশ, নগদ, রকেট এবং কার্ড দিয়ে সুরক্ষিত পেমেন্ট সিস্টেম",
  },
  {
    icon: <Headphones className="w-10 h-10" />,
    title: "২৪/৭ কাস্টমার সাপোর্ট",
    description:
      "যেকোনো সময় আমাদের সাথে যোগাযোগ করুন, আমরা আপনার সেবায় প্রস্তুত",
  },
  {
    icon: <Award className="w-10 h-10" />,
    title: "বিউটি এক্সপার্ট পরামর্শ",
    description: "আমাদের বিউটি বিশেষজ্ঞদের কাছ থেকে ফ্রি পরামর্শ নিন",
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "১০,০০০+ খুশি গ্রাহক",
    description: "হাজারো গ্রাহকের ভরসার প্রতিষ্ঠান হিসেবে আমরা গর্বিত",
  },
  {
    icon: <Clock className="w-10 h-10" />,
    title: "দ্রুত সেবা",
    description: "অর্ডার প্রসেসিং থেকে ডেলিভারি পর্যন্ত দ্রুততম সেবা প্রদান",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            আমাদের সেবাসমূহ
          </h2>
          <p className="text-gray-600">কেন আমাদের সাথে কেনাকাটা করবেন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index: number) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group border border-gray-50 hover:border-pink-100"
            >
              <div className="text-pink-500 mb-4 flex justify-center group-hover:text-pink-600 transition-colors duration-300 group-hover:scale-110 transform">
                {service.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg group-hover:text-pink-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
