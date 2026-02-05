import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000/api",
  withCredentials: true, // For cookies
});

export default api;
