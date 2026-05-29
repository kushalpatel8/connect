import React from 'react'
import ProfileSide from '../Components/ProfileSide/ProfileSide'
import PostSide from '../Components/PostSide/PostSide'
import RightSide from '../Components/RightSide/RightSide'

const Home = () => {
  return (
    <div className="relative grid gap-4 [grid-template-columns:18rem_auto_20rem]">
        <ProfileSide />
        <PostSide />
        <RightSide />
    </div>
  )
}

export default Home;