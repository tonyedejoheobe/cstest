import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

export function TestimonialCard({ quote, author, title, rating }: TestimonialProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-[#FF7A59] text-[#FF7A59]' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-700 italic mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
}
