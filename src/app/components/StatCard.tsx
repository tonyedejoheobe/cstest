interface StatCardProps {
  percentage: string;
  description: string;
}

export function StatCard({ percentage, description }: StatCardProps) {
  return (
    <div className="flex items-start gap-2 md:gap-3">
      <div className="text-4xl md:text-5xl font-bold text-[#FF7A59] flex-shrink-0">{percentage}</div>
      <p className="text-sm text-gray-700 leading-relaxed flex-1 pt-1 md:pt-2">{description}</p>
    </div>
  );
}