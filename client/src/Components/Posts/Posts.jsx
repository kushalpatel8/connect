import React, { useEffect } from 'react'
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';

const Posts = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  let {posts, loading} = useSelector((state) => state.PostReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if(params.id) {
    posts = posts.filter((post) => post.userId === params.id);
  }

  return (
    <div className="flex flex-col gap-4">

      {loading ? "Fetching Posts..." :
        posts.map((post, id) => (
          <Post data={post} id={id} key={id} />
        ))}

    </div>
  );
}

export default Posts;