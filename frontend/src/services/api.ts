import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-8z1x.onrender.com",
});

export default api;