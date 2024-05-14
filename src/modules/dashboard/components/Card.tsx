import React from 'react';

interface ICardProps {
  value: string | number;
  title: string;
}

export const Card: React.FC<ICardProps> = ({ value, title }) => {
  return (
    <div className="bg-th-white p-3 md:p-4 rounded-lg col-span-1 border border-solid border-th-border">
      <p className="font-bold text-lg md:text-xl mb-1 md:mb-2 text-th-text-primary">{value}</p>
      <p className="m-0 text-sm md:text-base text-th-text-secondary">{title}</p>
    </div>
  );
};
