"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  const pathname = usePathname();

  // Split pathname -> remove empty values
  const segments = pathname
    .split("/")
    .filter((segment) => segment.trim() !== "");

  // Capitalize each segment
  const formatSegment = (segment) => {
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <nav className="flex items-center text-sm text-gray-600 mb-4">
      {/* Always start from Home */}
      <Link href="/" className="hover:text-blue-600 font-medium">
        Home
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
          <span key={href} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            {isLast ? (
              <span className="text-gray-800 font-semibold">
                {formatSegment(segment)}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-blue-600 font-medium transition"
              >
                {formatSegment(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
