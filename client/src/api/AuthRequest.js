import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000"});

export const signUp = (formData) => API.post('/auth/register', formData);

export const login = (formData) => API.post('/auth/login', formData);
