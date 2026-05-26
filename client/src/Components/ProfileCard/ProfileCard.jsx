import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = ({ location }) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="rounded-3xl flex flex-col relative gap-4 bg-[var(--cardColor)] overflow-x-clip">

            {/* Cover + Profile Images */}
            <div className="relative flex flex-col items-center justify-center">
                <img
                    src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"}
                    alt="cover"
                    className="w-full"
                />
                <img
                    src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
                    alt="profile"
                    className="w-24 h-24 rounded-full absolute -bottom-12 object-cover shadow-[var(--profileShadow)]"
                />
            </div>

            {/* Name & Bio */}
            <div className="flex flex-col items-center mt-12 gap-2">
                <span className="font-bold text-base">
                    {user.firstname} {user.lastname}
                </span>
                <span className="text-sm text-gray-500">
                    {user.worksAt ? user.worksAt : "write about yourself..."}
                </span>
            </div>

            {/* Follow Status */}
            <div className="flex flex-col items-center justify-center gap-3">
                <hr className="w-[85%] border border-gray-400" />

                <div className="flex gap-4 w-4/5 justify-around items-center">

                    <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-bold">{user.followers.length}</span>
                        <span className="text-black text-[15px]">Followers</span>
                    </div>

                    <div className="border-l border-gray-400 h-[50px]" />

                    <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-bold">{user.following.length}</span>
                        <span className="text-black text-[15px]">Following</span>
                    </div>

                    {location === "profilePage" && (
                        <>
                            <div className="border-l border-gray-400 h-[50px]" />
                            <div className="flex flex-col items-center justify-center gap-1">
                                <span className="font-bold">
                                    {posts.filter((post) => post.userId === user._id).length}
                                </span>
                                <span className="text-black text-[15px]">Posts</span>
                            </div>
                        </>
                    )}
                </div>

                <hr className="w-[85%] border border-gray-400" />
            </div>

            {/* My Profile Link */}
            {location !== "profilePage" && (
                <span className="font-bold text-[var(--purplePain)] self-center mb-4 cursor-pointer">
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>
                        My Profile
                    </Link>
                </span>
            )}

        </div>
    );
};
export default ProfileCard;