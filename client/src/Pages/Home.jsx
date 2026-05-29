import React from 'react'
import ProfileSide from '../Components/ProfileSide/ProfileSide'
import PostSide from '../Components/PostSide/PostSide'
import RightSide from '../Components/RightSide/RightSide'

const Home = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[18rem_auto] lg:grid-cols-[18rem_auto_20rem] gap-6">
        <ProfileSide />
        <PostSide />
        <div className="hidden lg:block">
          <RightSide />
        </div>
    </div>
  )
}

export default Home;