import React from 'react';

const InfoCard = () => {
  return (
    <div className="flex flex-col gap-3 bg-[var(--cardColor)] p-4 rounded-2xl w-[90%]">
      
      {/* Info Head */}
      <div className="flex justify-between items-center">
        <span>Profile Info</span>
        <div className="cursor-pointer hover:opacity-80">Edit</div>
      </div>

      {/* Info Body - add your content here */}
      <div className="flex flex-col gap-2">
        <span>📍 Location</span>
        <span>💼 Works at Company</span>
        <span>🎓 Studied at University</span>
      </div>

      {/* Logout Button */}
      <button className="w-28 h-8 mt-24 self-end bg-gradient-to-r from-[#6674cc] to-[#b578ff] text-white rounded-lg">
        Logout
      </button>

    </div>
  );
};

export default InfoCard;