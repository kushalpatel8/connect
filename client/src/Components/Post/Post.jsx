import React, { useState } from 'react';
import Comment from '../../Img/comment.png';
import Share from '../../Img/share.png';
import Like from '../../Img/like.png';
import Notlike from '../../Img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col p-5 glass-card rounded-2xl gap-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(150,21,219,0.1)]">

      <img
        src={data.image ? import.meta.env.VITE_PUBLIC_FOLDER + data.image : ' '}
        alt=""
        className="w-full max-h-[30rem] object-cover rounded-xl"
      />

      <div className="flex items-start gap-6 mt-2">
        <img
          src={liked ? Like : Notlike}
          alt=""
          className="cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={handleLike}
        />
        <img src={Comment} alt="Comment" className="cursor-pointer hover:scale-110 transition-transform duration-200" />
        <img src={Share} alt="Share" className="cursor-pointer hover:scale-110 transition-transform duration-200" />
      </div>

      <span className="text-gray-400 text-sm font-medium">{likes} likes</span>

      <div className="flex gap-3 items-baseline">
        <span className="font-bold text-white text-[15px]">{data.name}</span>
        <span className="text-gray-300 text-sm leading-relaxed">{data.desc}</span>
      </div>

    </div>
  );
};

export default Post;