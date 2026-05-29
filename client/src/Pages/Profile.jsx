import React from 'react';
import ProfilePageLeft from '../../Components/ProfilePageLeft/ProfilePageLeft';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import PostSide from '../../Components/PostSide/PostSide';
import RightSide from '../../Components/RightSide/RightSide';

const Profile = () => {
  return (
    <div className="relative grid grid-cols-[18rem_auto_20rem] gap-4">

      <ProfilePageLeft />

      <div className="flex flex-col gap-4">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>

      <RightSide />

    </div>
  );
};

export default Profile;