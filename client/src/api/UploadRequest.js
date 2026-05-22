import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3000" });

export const uploadImage = (formData) => API.post('/upload', formData);
export const uploadPost = (formData) => API.post('/post', formData);