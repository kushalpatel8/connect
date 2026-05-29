import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = ({ location }) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts);
    const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;

    return (
        <div className="glass-card rounded-3xl flex flex-col relative gap-4 overflow-x-clip pb-4 transition-all hover:shadow-[0_0_20px_rgba(150,21,219,0.1)]">

            {/* Cover + Profile Images */}
            <div className="relative flex flex-col items-center justify-center">
                <img
                    src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"}
                    alt="cover"
                    className="w-full h-[150px] object-cover opacity-80"
                />
                <img
                    src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
                    alt="profile"
                    className="w-24 h-24 rounded-full absolute -bottom-12 object-cover border-4 border-[#0f111a] shadow-lg"
                />
            </div>

            {/* Name & Bio */}
            <div className="flex flex-col items-center mt-12 gap-1">
                <span className="font-bold text-lg text-white">
                    {user.firstname} {user.lastname}
                </span>
                <span className="text-sm text-gray-400 font-medium">
                    {user.worksAt ? user.worksAt : "write about yourself..."}
                </span>
            </div>

            {/* Follow Status */}
            <div className="flex flex-col items-center justify-center gap-4 mt-2">
                <hr className="w-[85%] border border-white/10" />

                <div className="flex gap-4 w-4/5 justify-around items-center">

                    <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-bold text-white text-lg">{user.followers.length}</span>
                        <span className="text-gray-400 text-sm tracking-wide">Followers</span>
                    </div>

                    <div className="border-l border-white/10 h-[40px]" />

                    <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-bold text-white text-lg">{user.following.length}</span>
                        <span className="text-gray-400 text-sm tracking-wide">Following</span>
                    </div>

                    {location === "profilePage" && (
                        <>
                            <div className="border-l border-white/10 h-[40px]" />
                            <div className="flex flex-col items-center justify-center gap-1">
                                <span className="font-bold text-white text-lg">
                                    {posts.filter((post) => post.userId === user._id).length}
                                </span>
                                <span className="text-gray-400 text-sm tracking-wide">Posts</span>
                            </div>
                        </>
                    )}
                </div>

                <hr className="w-[85%] border border-white/10" />
            </div>

            {/* My Profile Link */}
            {location !== "profilePage" && (
                <span className="font-bold text-[#b578ff] self-center my-2 cursor-pointer hover:text-[#9615db] transition-colors">
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>
                        My Profile
                    </Link>
                </span>
            )}

        </div>
    );
};
export default ProfileCard;