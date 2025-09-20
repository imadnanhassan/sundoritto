"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { href, label };
  });

  // Title = last segment (or Home if nothing)
  const title = crumbs.length > 0 ? crumbs[crumbs.length - 1].label : "Home";

  return (
    <div className="w-full rounded-2xl p-10 text-center bg-gradient-to-r from-pink-300 via-white to-pink-100 border border-gray-200 shadow-sm container mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <nav className="text-sm text-gray-600">
        <ol className="flex justify-center space-x-2">
          <li>
            <Link href="/" className="text-[#ee1e7e] hover:underline">
              Home
            </Link>
          </li>
          {crumbs.map((crumb, idx) => (
            <li key={crumb.href} className="flex items-center space-x-2">
              <span>-</span>
              {idx === crumbs.length - 1 ? (
                <span className="text-gray-800">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-[#ee1e7e] hover:underline"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
