import axios from 'axios';

const BASE_URL = "https://tired-worm-windbreaker.cyclic.app/api/";

// Retrieve the token from localStorage
const persistedRoot = JSON.parse(localStorage.getItem("persist:root"));
const currentUser = JSON.parse(persistedRoot?.user || "{}").currentUser;
const TOKEN = currentUser ? currentUser.token : "";

console.log("Token", TOKEN);

export const publicRequest = axios.create({

  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN ? { token: `Bearer ${TOKEN}` } : {},
});




