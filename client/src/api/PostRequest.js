import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BAKEND_URL });

export const getTimelinePosts = (id) =>API.get(`/post/timeline/${id}`);

export const likePost = (id, userId) => API.put(`/post/${id}/like_dislike`, {userId : userId});