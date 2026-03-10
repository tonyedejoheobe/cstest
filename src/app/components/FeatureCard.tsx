import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
}

export function FeatureCard({ icon, title, description, iconBgColor }: FeatureCardProps) {
  return (
    <div className="flex items-start gap-3 w-full">
      <div className={`${iconBgColor} rounded-full p-3 flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="text-sm text-gray-600 leading-snug">{description}</p>
      </div>
    </div>
  );
}