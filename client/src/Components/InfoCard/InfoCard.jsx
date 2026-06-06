import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/AuthAction';
import ProfileModal from '../ProfileModel/ProfileModel';

const InfoCard = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col gap-3 glass-card p-4 rounded-2xl w-[90%] transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.08)]">
      
      {/* Info Head */}
      <div className="flex justify-between items-center text-white mb-2">
        <span className="font-bold text-lg">Profile Info</span>
        <div 
          className="cursor-pointer hover:text-[#4ade80] text-sm font-medium transition-colors"
          onClick={() => setModalOpened(true)}
        >
          Edit
        </div>
      </div>

      <ProfileModal 
        modalOpened={modalOpened} 
        setModalOpened={setModalOpened} 
        data={user} 
      />

      {/* Info Body */}
      <div className="flex flex-col gap-3 text-gray-300 text-sm">
        <span className="flex items-center gap-2"><span className="text-xl">📍</span> {user.livesin || "Location"}</span>
        <span className="flex items-center gap-2"><span className="text-xl">💼</span> {user.worksAt || "Works at Company"}</span>
        <span className="flex items-center gap-2"><span className="text-xl">🎓</span> {user.country || "Country"}</span>
      </div>

      {/* Logout Button */}
      <button 
        className="btn-primary w-28 h-10 mt-16 self-end rounded-lg font-semibold tracking-wide"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
};

export default InfoCard;