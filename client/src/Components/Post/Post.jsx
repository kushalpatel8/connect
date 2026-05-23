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
    <div className="flex flex-col p-4 bg-[var(--cardColor)] rounded-2xl gap-4">

      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ' '}
        alt=""
        className="w-full max-h-80 object-cover rounded-lg"
      />

      <div className="flex items-start gap-6">
        <img
          src={liked ? Like : Notlike}
          alt=""
          className="cursor-pointer"
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span className="text-[var(--gray)] text-sm">{likes} likes</span>

      <div className="flex gap-2">
        <span className="font-bold">{data.name}</span>
        <span>{data.desc}</span>
      </div>

    </div>
  );
};

export default Post;