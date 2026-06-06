import React, { useState } from 'react';
import { Heart, MessageSquare, Send, UserCircle } from 'lucide-react';
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

  const author = data.author || {};

  const randomNames = [
    'Alex Morgan', 'Jordan Lee', 'Casey Rivera', 'Riley Kim',
    'Sam Patel', 'Taylor Brooks', 'Morgan Chen', 'Jamie Okafor',
  ];
  const fallbackName = randomNames[
    parseInt(data._id?.slice(-4) || '0', 16) % randomNames.length
  ];

  const fullName = author.firstname
    ? `${author.firstname} ${author.lastname || ''}`.trim()
    : fallbackName;
  const avatarUrl = author.profilePicture
    ? import.meta.env.VITE_PUBLIC_FOLDER + author.profilePicture
    : null;

  // Format relative time
  const timeAgo = (dateStr) => {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="flex flex-col glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(74,222,128,0.08)]">

      {/* ── Post Header ─────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#4ade80]/30 shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#0e1a12] border-2 border-[#4ade80]/30 flex items-center justify-center shrink-0">
            <UserCircle className="w-7 h-7 text-[#4ade80]" strokeWidth={1.5} />
          </div>
        )}

        {/* Name + Time */}
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-white text-[15px]">{fullName}</span>
          {data.createdAt && (
            <span className="text-xs text-gray-500">{timeAgo(data.createdAt)}</span>
          )}
        </div>
      </div>

      {/* ── Post Description ─────────────────────────────── */}
      {data.desc && (
        <p className="px-5 pb-3 text-gray-300 text-sm leading-relaxed">{data.desc}</p>
      )}

      {/* ── Post Image ───────────────────────────────────── */}
      {data.image && (
        <img
          src={import.meta.env.VITE_PUBLIC_FOLDER + data.image}
          alt="post"
          className="w-full max-h-[28rem] object-cover"
        />
      )}

      {/* ── Actions ──────────────────────────────────────── */}
      <div className="flex items-center gap-5 px-5 py-4">
        <button
          onClick={handleLike}
          className="flex items-center gap-1.5 group"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 group-hover:scale-110 ${
              liked ? 'text-rose-500 fill-rose-500' : 'text-gray-400 group-hover:text-rose-400'
            }`}
            strokeWidth={2}
          />
          <span className={`text-sm font-medium ${liked ? 'text-rose-400' : 'text-gray-400'}`}>
            {likes}
          </span>
        </button>

        <button className="flex items-center gap-1.5 group">
          <MessageSquare
            className="w-5 h-5 text-gray-400 group-hover:text-[#4ade80] group-hover:scale-110 transition-all duration-200"
            strokeWidth={2}
          />
        </button>

        <button className="flex items-center gap-1.5 group">
          <Send
            className="w-5 h-5 text-gray-400 group-hover:text-[#7c3aed] group-hover:scale-110 transition-all duration-200"
            strokeWidth={2}
          />
        </button>
      </div>

    </div>
  );
};

export default Post;