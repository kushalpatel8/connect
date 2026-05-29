import React from 'react';
import LogoSearch from '../LogoSearch/LogoSearch';
import InfoCard from '../InfoCard/InfoCard';
import FollowersCard from '../FollowersCard/FollowersCard';

const ProfilePageLeft = () => {
  return (
    <div className="flex flex-col gap-4 items-center overflow-auto">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfilePageLeft;