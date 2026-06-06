import React, { useState } from "react";
import { UserCircle } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/UserAction";

const UserFollow = ({person}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id));
    const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;

  const handleFollow = () => {
    if (following) {
      dispatch(unFollowUser(person._id, user));
    } else {
      dispatch(followUser(person._id, user));
    }
    setFollowing((prev) => !prev);
  }; 
    return (
    <div className="flex justify-between items-center w-full mt-2">
      <div className="flex gap-3 items-center">
        {person.profilePicture ? (
          <img
            src={serverPublic + person.profilePicture}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover shadow-sm"
          />
        ) : (
          <UserCircle className="w-12 h-12 text-[#4ade80] shadow-sm bg-[#080d0b] rounded-full p-1" strokeWidth={1.5} />
        )}

        <div className="flex flex-col">
          <span className="font-bold text-white">{person.firstname}</span>
          <span className="text-xs text-gray-400">
            @{person.firstname} {person.lastname}
          </span>
        </div>
      </div>

      <button className="btn-primary px-4 py-1 text-sm rounded-lg font-medium" onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default UserFollow;