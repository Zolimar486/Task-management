import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";

// Retrieve the token from localStorage
const TOKEN =JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.token || "";

console.log("Token", TOKEN)

export const publicRequest = axios.create({

  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}`}

})




