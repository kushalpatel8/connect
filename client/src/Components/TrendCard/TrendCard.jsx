import React from 'react';
import { TrendData } from '../Data/TrendData';
const TrendCard = () => {
  return (
    <div className="flex flex-col gap-4 glass-card p-4 rounded-2xl pl-8 transition-all hover:shadow-[0_0_20px_rgba(150,21,219,0.1)]">
      <h3 className="font-bold text-lg text-white">Trending for you</h3>

      {TrendData.map((trend) => (
        <div key={trend.name} className="flex flex-col gap-1 mt-2">
          <span className="font-bold text-white text-[15px]">#{trend.name}</span>
          <span className="text-sm text-gray-400">{trend.shares}k Shares</span>
        </div>
      ))}

    </div>
  )
}
export default TrendCard;