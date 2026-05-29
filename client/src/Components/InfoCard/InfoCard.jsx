import React from 'react';

const InfoCard = () => {
  return (
    <div className="flex flex-col gap-3 glass-card p-4 rounded-2xl w-[90%] transition-all hover:shadow-[0_0_20px_rgba(150,21,219,0.1)]">
      
      {/* Info Head */}
      <div className="flex justify-between items-center text-white mb-2">
        <span className="font-bold text-lg">Profile Info</span>
        <div className="cursor-pointer hover:text-[#b578ff] text-sm font-medium transition-colors">Edit</div>
      </div>

      {/* Info Body - add your content here */}
      <div className="flex flex-col gap-3 text-gray-300 text-sm">
        <span className="flex items-center gap-2"><span className="text-xl">📍</span> Location</span>
        <span className="flex items-center gap-2"><span className="text-xl">💼</span> Works at Company</span>
        <span className="flex items-center gap-2"><span className="text-xl">🎓</span> Studied at University</span>
      </div>

      {/* Logout Button */}
      <button className="btn-primary w-28 h-10 mt-16 self-end rounded-lg font-semibold tracking-wide">
        Logout
      </button>

    </div>
  );
};

export default InfoCard;