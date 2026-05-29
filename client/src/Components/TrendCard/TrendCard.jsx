import React from 'react';
import { TrendData } from '../Data/TrendData';
const TrendCard = () => {
  return (
    <div className="flex flex-col gap-4 bg-[var(--cardColor)] p-4 rounded-2xl pl-8">
      <h3>Trending for you</h3>

      {TrendData.map((trend) => (
        <div key={trend.name} className="flex flex-col gap-2">
          <span className="font-bold">#{trend.name}</span>
          <span className="text-[15px]">{trend.shares}k Shares</span>
        </div>
      ))}

    </div>
  )
}
export default TrendCard;