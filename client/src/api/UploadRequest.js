import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_BAKEND_URL });

export const uploadImage = (formData) => API.post('/upload', formData);
export const uploadPost = (formData) => API.post('/post', formData);