import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 w-full">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center group">
            {index < items.length - 1 ? (
              <>
                <Link
                  href={item.href}
                  className="relative px-2 py-1 rounded-md text-gray-600 
                             transition-all duration-200 ease-in-out
                             group-hover:text-blue-600 group-hover:bg-blue-50
                             hover:shadow-sm"
                >
                  {item.label}
                </Link>
                <span className="mx-2 text-gray-400">›</span>
              </>
            ) : (
              <span
                className="px-2 py-1 rounded-md font-semibold text-gray-900 
                           bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                           "
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
