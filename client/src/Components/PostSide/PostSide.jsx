import React from 'react';
import PostShare from '../PostShare/PostShare';
import Posts from '../Posts/Posts';

const PostSide = () => {
    return (
        <div className = "flex flex-col gap-5 height-100vh overflow-auto">
            <PostShare />
            <Posts />
        </div>
    );

}

export default PostSide;