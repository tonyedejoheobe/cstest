interface StatisticItemProps {
  percentage: string;
  description: string;
}

export function StatisticItem({ percentage, description }: StatisticItemProps) {
  return (
    <div className="flex items-start gap-4 mb-4">
      <div className="text-5xl font-bold text-[#FF6B4A]">{percentage}</div>
      <p className="text-sm text-gray-700 leading-relaxed pt-2 flex-1">{description}</p>
    </div>
  );
}
