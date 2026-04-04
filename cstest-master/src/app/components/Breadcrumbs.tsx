import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <a href="/" className="text-[#FF7A59] hover:underline font-semibold">
        Home
      </a>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">

          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <a href={item.href} className="text-[#FF7A59] hover:underline font-semibold">
              {item.label}
            </a>
          ) : (
            <span className={item.active ? 'text-gray-900 font-semibold' : 'text-gray-500'}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
