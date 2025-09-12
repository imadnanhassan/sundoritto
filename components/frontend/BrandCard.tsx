import Link from "next/link";
import Image from "next/image";
import { Brand } from "@/lip/types/brand";

const BrandCard = ({ brand }: { brand: Brand }) => {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group block bg-white p-4 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300"
    >
      <div className="relative w-32 h-16 mx-auto mb-3">
        <Image
          src={brand.logo || "/images/placeholder-logo.png"}
          alt={`${brand.name} লোগো`}
          fill
          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
        />
      </div>

      <div className="text-center">
        <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-primary transition-colors duration-300">
          {brand.name}
        </h3>

        <p className="text-xs text-gray-500 mb-2">{brand.productCount} পণ্য</p>
      </div>
    </Link>
  );
};

export default BrandCard;
