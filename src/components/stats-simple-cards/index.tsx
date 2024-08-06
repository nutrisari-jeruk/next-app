import React from 'react';

interface StatItem {
  name: string;
  stat: string;
}

interface StatsSimpleCardsProps {
  stats: StatItem[];
}

const StatsSimpleCards: React.FC<StatsSimpleCardsProps> = ({ stats }) => {
  return (
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.name}
          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium text-gray-500">
            {item.name}
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {item.stat}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default StatsSimpleCards;
