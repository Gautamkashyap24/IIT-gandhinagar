import React from 'react';

interface DemoDataBadgeProps {
  label?: string;
  className?: string;
}

export const DemoDataBadge: React.FC<DemoDataBadgeProps> = ({
  label = 'Demo Data',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-teal-50 text-teal-800 border border-teal-200 rounded-md ${className}`}
      title="This metric or reward is simulated for community prototyping demonstration"
    >
      <span className="w-1.5 h-1.5 bg-teal-600 rounded-xs shrink-0" />
      {label}
    </span>
  );
};
