import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BAKEND_URL });

export const signUp = (formData) => API.post('/auth/register', formData);

export const login = (formData) => API.post('/auth/login', formData);
