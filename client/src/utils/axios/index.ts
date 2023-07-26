import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://simple-chat-app-server-eight.vercel.app/api/v1`,
});

export default axiosInstance;
