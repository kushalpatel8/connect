import React from 'react';
import ProfilePageLeft from '../Components/ProfilePageLeft/ProfilePageLeft';
import ProfileCard from '../Components/ProfileCard/ProfileCard';
import PostSide from '../Components/PostSide/PostSide';
import RightSide from '../Components/RightSide/RightSide';

const Profile = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[18rem_auto] lg:grid-cols-[18rem_auto_20rem] gap-6">

      <div className="hidden md:block">
        <ProfilePageLeft />
      </div>

      <div className="flex flex-col gap-6">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>

      <div className="hidden lg:block">
        <RightSide />
      </div>

    </div>
  );
};

export default Profile;